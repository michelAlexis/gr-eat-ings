import { z } from 'zod';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/schema';

const createIngredientSchema = z.object({
    name: z.string().min(5).max(100).trim(),
});

export const actions: Actions = {
    createIngredient: async ({ request }) => {
        const formValue = Object.fromEntries(await request.formData());
        const parsed = createIngredientSchema.safeParse(formValue);

        if (parsed.success) {
            const data = parsed.data;
            console.log('Create ingredient', data);
            const created = await db.insert(ingredients).values(data).execute();
            console.log('Created ingredient', created);
            return { status: 201, created };
        } else {
            const { fieldErrors: errors } = parsed.error.flatten();
            console.warn('Failed to parse', errors);
            return fail(400, {
                formValue,
                errors,
            });
        }
    },
};
