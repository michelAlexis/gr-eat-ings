import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/schema';
import { superValidate } from 'sveltekit-superforms/server';

const createIngredientSchema = z.object({
    name: z.string().min(5).max(100).trim(),
    description: z.string().max(1000).trim().default(''),
    refUnit: z.enum(['gr', 'ml']).default('gr'),
    refQuantity: z.number().int().positive().default(100),
    kcal: z.number().int().positive().default(0),
    fat: z.number().nonnegative().nullable(),
    fatSaturated: z.number().nonnegative().nullable(),
    carbs: z.number().nonnegative().nullable(),
    sugar: z.number().nonnegative().nullable(),
    fiber: z.number().nonnegative().nullable(),
    protein: z.number().nonnegative().nullable(),
    salt: z.number().nonnegative().nullable(),
});

export const load: PageServerLoad = async (event) => {
    const form = await superValidate(event, createIngredientSchema);

    // Unless you throw, always return { form } in load and form actions.
    return { form };
};

export const actions: Actions = {
    createIngredient: async ({ request }) => {
        const form = await superValidate(request, createIngredientSchema);

        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }

        const created = await db.insert(ingredients).values(form.data).execute();
        console.log('Created ingredient', created.insertId);
        return { form };
    },
};
