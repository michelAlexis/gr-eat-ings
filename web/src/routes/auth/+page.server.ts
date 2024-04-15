import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession();

    // if the user is already logged in return them to the account page
    if (session) {
        console.log('User already logged in, go to account');
        throw redirect(303, '/account');
    }

    return { url: url.origin };
};
