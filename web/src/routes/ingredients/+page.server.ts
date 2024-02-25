import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/schema';
import { getPageParams } from '$lib/utils/page.utils';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
    const { first, size } = getPageParams(url, { maxSize: 20 });
    const ingredientsPage = db
        .select({
            id: ingredients.id,
            name: ingredients.name,
        })
        .from(ingredients)
        .limit(size)
        .offset(first);
    return {
        ingredients: await ingredientsPage,
    };
};

export const actions: Actions = {
    deleteIngredient: async ({ url }) => {
        const id = Number(url.searchParams.get('id'));
        if (!id || isNaN(id)) {
            return fail(400, { message: 'No valid id provided' });
        }
        try {
            console.log('Deleting ingredient with id', id);
            await db.delete(ingredients).where(eq(ingredients.id, id));
            console.log('Deleted successfully');
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Error while deleting ingredient' });
        }

        return { status: 200 };
    },
};
