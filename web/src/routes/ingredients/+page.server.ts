import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/schema';
import { getPageParams } from '$lib/utils/page.utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const { first, size } = getPageParams(url, { maxSize: 20 });
    const ingredientsPage = db
        .select({
            id: ingredients.id,
            name: ingredients.name,
        })
        .from(ingredients)
        .limit(size)
        .offset(first);
    return {
        ingredients: ingredientsPage,
    };
};
