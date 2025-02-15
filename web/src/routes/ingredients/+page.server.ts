import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { BAD_REQUEST, SERVER_ERROR, unauthenticated } from '$lib/server/response.utils';

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;
    if (!user) {
        return unauthenticated();
    }

    const data = await db
        .select({
            id: ingredients.id,
            label: ingredients.label,
            kcal: ingredients.kcal,
        })
        .from(ingredients)
        .where(eq(ingredients.createBy, user.id))
        .limit(100)
        .orderBy(ingredients.label);
    return { ingredients: data };
};

export const actions: Actions = {
    deleteIngredient: async ({ url, locals }) => {
        const user = locals.user;
        if (!user) {
            return unauthenticated();
        }
        const id = Number(url.searchParams.get('id'));
        if (!id || Number.isNaN(id)) {
            return fail(BAD_REQUEST, { message: 'No valid id provided' });
        }
        try {
            console.log('Deleting ingredient', id);
            await db
                .delete(ingredients)
                .where(and(eq(ingredients.id, id), eq(ingredients.createBy, user.id)));
            console.log('Deleted ingredient');
            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(SERVER_ERROR, { message: 'Error while deleting ingredient' });
        }
    },
};
