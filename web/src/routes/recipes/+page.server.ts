import { db } from '$lib/server/db';
import { ingredients, recipeIngredients, recipes } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const data = await db
        .select({
            id: recipes.id,
            label: recipes.label,
            kcal: sql`sum(${ingredients.kcal} / ${ingredients.refQuantity} * ${recipeIngredients.quantity})`,
        })
        .from(recipes)
        .leftJoin(recipeIngredients, eq(recipeIngredients.recipeId, recipes.id))
        .leftJoin(ingredients, eq(recipeIngredients.ingredientId, ingredients.id))
        .groupBy(recipes.id)
        .orderBy(recipes.id)
        .limit(100);
    return { recipes: data };
};

export const actions: Actions = {
    deleteRecipe: async ({ url }) => {
        const id = Number(url.searchParams.get('id'));
        if (!id || Number.isNaN(id)) {
            return fail(400, { message: 'No valid id provided' });
        }
        try {
            console.log('Deleting recipe', id);
            await db.delete(recipes).where(eq(recipes.id, id));
            console.log('Deleted recipe');
            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Error while deleting recipes' });
        }
    },
};
