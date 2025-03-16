import { searchIngredientsBarcode } from '$lib/client/api/ingredients';
import { BAD_REQUEST, NOT_FOUND, SERVER_ERROR, UNAUTHORIZED } from '$lib/server/response.utils';
import { type RequestHandler, error, json } from '@sveltejs/kit';
import { z } from 'zod';

const ingredientSearchBarcodeSchema = z.object({
    barcode: z.string(),
});
export type IngredientSearchBarcode = z.infer<typeof ingredientSearchBarcodeSchema>;

export type IngredientSearchBarcodeResponse = {
    result: any;
};

export const POST: RequestHandler = async ({ request, locals: { user }, fetch }) => {
    if (!user) {
        return error(UNAUTHORIZED, 'Unauthenticated');
    }
    const parse = ingredientSearchBarcodeSchema.safeParse(await request.json());
    if (!parse.success) {
        return error(BAD_REQUEST, `Failled to parse the search object: ${parse.error.toString()}`);
    }
    const search = parse.data;
    try {
        const result = await searchProductByBarcode(search.barcode, fetch, request);
        return json(result);
    } catch (err) {
        console.error('Error fetching product:', err);
        return error(SERVER_ERROR, 'Error while fetching product info');
    }
};
