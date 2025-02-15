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
    default: async ({ request }) => {
        const form = await superValidate(request, zod(createIngredientSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await db.transaction(async (tr) => {
            const created = await tr
                .insert(ingredients)
                .values(form.data)
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
