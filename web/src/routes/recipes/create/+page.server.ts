import { db } from '$lib/server/db/index.js';
import type { PageServerLoad, Actions } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createRecipeSchema } from './schema.js';
import { recipeIngredients, recipes } from '$lib/server/db/schema.js';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(createRecipeSchema)),
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(createRecipeSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await db.transaction(async (tr) => {
            const created = await tr
                .insert(recipes)
                .values({
                    label: form.data.label,
                    refPortions: form.data.refPortions,
                    steps: form.data.steps,
                })
                .returning({ recipeId: recipes.id });
            const recipeId = created[0].recipeId;

            if (form.data.ingredients.length > 0) {
                await tr
                    .insert(recipeIngredients)
                    .values(
                        form.data.ingredients.map((i) => ({
                            recipeId,
                            ...i,
                        })),
                    )
                    .execute();
            }
        });

        return { form };
    },
};
