import { db } from '$lib/server/db';
import { ingredients, recipeIngredients, recipes } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { BAD_REQUEST, SERVER_ERROR, unauthenticated } from '$lib/server/response.utils';

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;
    if (!user) {
        return unauthenticated();
    }

    const data = await db
        .select({
            id: recipes.id,
            label: recipes.label,
            kcal: sql`sum(${ingredients.kcal} / ${ingredients.refQuantity} * ${recipeIngredients.quantity})`,
        })
        .from(recipes)
        .leftJoin(recipeIngredients, eq(recipeIngredients.recipeId, recipes.id))
        .leftJoin(ingredients, eq(recipeIngredients.ingredientId, ingredients.id))
        .where(eq(recipes.createBy, user.id))
        .groupBy(recipes.id)
        .orderBy(recipes.id)
        .limit(100);
    return { recipes: data };
};

export const actions: Actions = {
    deleteRecipe: async ({ url, locals }) => {
        const user = locals.user;
        if (!user) {
            return unauthenticated();
        }
        const id = Number(url.searchParams.get('id'));
        if (!id || Number.isNaN(id)) {
            return fail(BAD_REQUEST, { message: 'No valid id provided' });
        }
        try {
            console.log('Deleting recipe', id);
            await db.delete(recipes).where(eq(recipes.id, id), eq(recipes.createBy, user.id));
            console.log('Deleted recipe');
            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(SERVER_ERROR, { message: 'Error while deleting recipes' });
        }
    },
};
