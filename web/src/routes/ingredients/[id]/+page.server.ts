import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { number as zNumber } from 'zod';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const id = zNumber().parse(+params.id);

    const ingredient = await db
        .select()
        .from(ingredients)
        .where(eq(ingredients.id, id))
        .then((r) => r[0]);

    if (!ingredient) {
        console.log('No ingredient found for id', id);
        error(404, { message: 'Not found' });
    }

    return {
        ingredient,
    };
};
