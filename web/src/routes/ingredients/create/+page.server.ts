import { db } from '$lib/server/db/index.js';
import { ingredients, servings } from '$lib/server/db/schema.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { createIngredientSchema } from './schema.js';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(createIngredientSchema)),
    };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, zod(createIngredientSchema));
        const user = locals.user;
        if (!user) {
            return fail(401, { form, message: 'Unauthorized' });
        }

        if (!form.valid) {
            return fail(400, { form, message: 'Invalid form' });
        }

        await db.transaction(async (tr) => {
            const created = await tr
                .insert(ingredients)
                .values({ ...form.data, createBy: user.id })
                .returning({ ingredientId: ingredients.id });
            const ingredientId = created[0].ingredientId;
            if (form.data.servings.length > 0) {
                await tr
                    .insert(servings)
                    .values(
                        form.data.servings.map((serving) => ({
                            ...serving,
                            ingredientId,
                        })),
                    )
                    .execute();
            }
        });

        return { form };
    },
};
