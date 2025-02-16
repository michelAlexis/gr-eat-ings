import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/db/schema';
import { fuzzySearchIngoreCase, likeIgnoreCase } from '$lib/server/db/utils';
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from '$lib/server/response.utils';
import { findErrorMesssage, wait } from '$lib/utils';
import { type RequestHandler, error } from '@sveltejs/kit';
import type { User } from 'better-auth';
import { and, eq, or } from 'drizzle-orm';
import { z } from 'zod';

const ingredientSearchSchema = z.object({
    query: z.string().min(3),
    limit: z.preprocess(
        (v) => (typeof v === 'string' ? Number(v) : undefined),
        z.number().int().max(100).positive().default(10),
    ),
});
export type IngredientSearch = z.infer<typeof ingredientSearchSchema>;

export type IngredientSearchResult = { id: number; name: string; kcal: number };
type SearchDbStart = { type: 'search-db-start' };
type SearchDbNameResult = {
    type: 'search-db-name-result';
    results: IngredientSearchResult[];
};
type SearchDbBarcodeResult = {
    type: 'search-db-barcode-result';
    barcode: string;
    result: IngredientSearchResult;
};
type SearchApiBarcodeStart = { type: 'search-api-barcode-start' };
type SearchApiBarcodeFound = { type: 'search-api-barcode-found' };
type SearchApiBarcodeResult = {
    barcode: string;
    type: 'search-api-barcode-result';
    result: IngredientSearchResult;
};
type SearchApiBarcodeNotFound = {
    type: 'search-api-barcode-not-found';
    barcode: string;
};
type SearchError = { type: 'search-error'; error: unknown };

export type IngredientSearchEvents =
    | SearchDbStart
    | SearchDbNameResult
    | SearchDbBarcodeResult
    | SearchApiBarcodeStart
    | SearchApiBarcodeFound
    | SearchApiBarcodeResult
    | SearchApiBarcodeNotFound
    | SearchError;

export const GET: RequestHandler = async ({ request, url, locals: { user } }) => {
    if (!user) {
        return error(UNAUTHORIZED, 'Unauthenticated');
    }
    const parse = ingredientSearchSchema.safeParse({
        query: url.searchParams.get('query'),
        limit: url.searchParams.get('limit'),
    });
    if (!parse.success) {
        return error(BAD_REQUEST, {
            message: 'Failled to parse the search parameters',
            zodError: parse.error.flatten(),
        });
    }
    const search = parse.data;
    let closed = false;
    const stream = new ReadableStream({
        async start(controller) {
            function sendEvent(event: IngredientSearchEvents) {
                if (!closed) {
                    controller.enqueue(JSON.stringify(event));
                }
            }
            try {
                const barcode = toBarcode(search.query);

                // Search in db
                sendEvent({ type: 'search-db-start' });
                if (barcode) {
                    const dbResult = await searchIngredientDbBarcode(barcode);
                    await wait(1000);
                    if (dbResult) {
                        sendEvent({
                            type: 'search-db-barcode-result',
                            result: dbResult,
                            barcode,
                        });
                        return;
                    }
                } else {
                    const dbResults = await searchIngredientDbName(search.query, search.limit);
                    await wait(1000);
                    if (dbResults.length > 0) {
                        sendEvent({ type: 'search-db-name-result', results: dbResults });
                        return;
                    }
                }

                // Search in API
                if (barcode) {
                    sendEvent({ type: 'search-api-barcode-start' });
                    const apiResult = await searchApiByBarcode({
                        barcode,
                        fetch,
                        request,
                    });
                    await wait(1000);
                    if (apiResult) {
                        sendEvent({ type: 'search-api-barcode-found' });
                        await wait(1000);
                        // TODO Create in db
                        sendEvent({
                            type: 'search-api-barcode-result',
                            result: apiResult,
                            barcode,
                        });
                        return;
                    }
                    sendEvent({ type: 'search-api-barcode-not-found', barcode });
                    return;
                }
                throw new Error('Search API by name not implemented yet');
            } catch (err) {
                console.error('Error while searching ingredient', err);
                sendEvent({
                    type: 'search-error',
                    error: findErrorMesssage(err),
                });
            } finally {
                controller.close();
            }
        },
        cancel() {
            closed = true;
        },
    });
    const response = new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
    return response;
};

function toBarcode(query: string): string | null {
    // Barcode can be at least 12 length (UPC-A in US and Canada)
    if (query.length < 12) {
        return null;
    }
    // Parse to number to filter only numbers and remove '0' prefixes
    const parse = Number(query);
    if (Number.isNaN(parse)) {
        return null;
    }
    return parse.toString();
}

async function searchIngredientDbName(
    name: string,
    limit: number,
): Promise<IngredientSearchResult[]> {
    return await db
        .select({
            id: ingredients.id,
            name: ingredients.label,
            kcal: ingredients.kcal,
        })
        .from(ingredients)
        .where(
            or(
                likeIgnoreCase(ingredients.label, name),
                fuzzySearchIngoreCase({
                    column: ingredients.label,
                    search: name,
                }),
            ),
        )
        .limit(limit);
}

async function searchIngredientDbBarcode(barcode: string): Promise<IngredientSearchResult | null> {
    return await db
        .select({
            id: ingredients.id,
            name: ingredients.label,
            kcal: ingredients.kcal,
        })
        .from(ingredients)
        .where(eq(ingredients.barcode, barcode))
        .limit(1)
        .then((l) => l[0] ?? null);
}

export type FoodfactProduct = any;
type SearchApiBarcodeProps = {
    barcode: string;
    fetch: typeof globalThis.fetch;
    request: Request;
};
async function searchApiByBarcode({ barcode, fetch, request }: SearchApiBarcodeProps) {
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
    const userAgent = request.headers.get('user-agent') ?? 'Chrome';
    // User-agent header according to api documentation
    const response = await fetch(url, {
        headers: {
            'user-agent': `Gr-eat-ings - ${userAgent} - Version 0.1 - www.gr-eat-ings.com`,
        },
        signal: request.signal,
    });
    if (!response.ok) {
        if (response.status === NOT_FOUND) {
            return null;
        }
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.product as FoodfactProduct;
}
