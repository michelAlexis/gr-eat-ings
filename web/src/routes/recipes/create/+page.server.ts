import { db } from '$lib/server/db/index.js';
import { recipeIngredients, recipes } from '$lib/server/db/schema.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { createRecipeSchema } from './schema.js';
import { BAD_REQUEST, SERVER_ERROR, unauthenticatedForm } from '$lib/server/response.utils.js';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(createRecipeSchema)),
    };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, zod(createRecipeSchema));
        const user = locals.user;
        if (!user) {
            return unauthenticatedForm({ form });
        }

        if (!form.valid) {
            return fail(BAD_REQUEST, { form });
        }

        try {
            await db.transaction(async (tr) => {
                const created = await tr
                    .insert(recipes)
                    .values({
                        label: form.data.label,
                        refPortions: form.data.refPortions,
                        steps: form.data.steps,
                        createBy: user.id,
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
        } catch (err) {
            console.error(err);
            return fail(SERVER_ERROR, { message: 'Failed to create ingredient' });
        }

        return { form };
    },
};
