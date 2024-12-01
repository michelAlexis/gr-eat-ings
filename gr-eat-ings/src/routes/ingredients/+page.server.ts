import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const data = await db
        .select({
            id: ingredients.id,
            name: ingredients.name,
            kcal: ingredients.kcal,
        })
        .from(ingredients)
        .limit(100)
        .orderBy(ingredients.name);
    return { ingredients: data };
};

export const actions: Actions = {
    deleteIngredient: async ({ url }) => {
        const id = Number(url.searchParams.get('id'));
        if (!id || Number.isNaN(id)) {
            return fail(400, { message: 'No valid id provided' });
        }
        try {
            console.log('Deleting ingredient', id);
            await db.delete(ingredients).where(eq(ingredients.id, id));
            console.log('Deleted ingredient');
            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Error while deleting ingredient' });
        }
    },
};
