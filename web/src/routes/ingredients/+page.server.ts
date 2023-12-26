import { db } from '$lib/server/db';
import { ingredients } from '$lib/server/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        ingredients: await db.select().from(ingredients).then(v => {

      console.log('loaded from db', v);
      return v;
    }),
    };
};
