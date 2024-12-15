import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/db/schema';
import { fuzzySearchIngoreCase, likeIgnoreCase } from '$lib/server/db/utils';
import { type RequestHandler, error, json } from '@sveltejs/kit';
import { or } from 'drizzle-orm';
import { z } from 'zod';

const ingredientSearchSchema = z.object({
    name: z.string().min(3),
});
export type IngredientSearch = z.infer<typeof ingredientSearchSchema>;

export type IngredientSearchResponse = {
    results: {
        id: number;
        name: string;
        kcal: number;
    }[];
};

export const POST: RequestHandler = async ({ request, locals: { user } }) => {
    if (!user) {
        return error(403, { message: 'Not connected' });
    }
    const parse = ingredientSearchSchema.safeParse(await request.json());
    if (!parse.success) {
        return error(400, {
            message: `Failled to parse the search object: ${parse.error.toString()}`,
        });
    }
    const search = parse.data;
    const results = await db
        .select({
            id: ingredients.id,
            name: ingredients.name,
            kcal: ingredients.kcal,
        })
        .from(ingredients)
        .where(
            or(
                likeIgnoreCase(ingredients.name, search.name),
                fuzzySearchIngoreCase({
                    column: ingredients.name,
                    search: search.name,
                }),
            ),
        )
        .limit(100);
    const response: IngredientSearchResponse = {
        results,
    };
    return json(response);
};
