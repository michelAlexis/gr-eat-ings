import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    console.warn('Callback from auth');
    const code = url.searchParams.get('code');

    if (code) {
        console.log('Found a code');
        await supabase.auth.exchangeCodeForSession(code);
    }
    console.log('No code found, go to account');

    throw redirect(303, '/account');
};
