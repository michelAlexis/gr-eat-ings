import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const { user } = await safeGetSession();

    if (!user) {
        console.log('No user found');
        throw redirect(303, '/auth');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('username, full_name, website, avatar_url')
        .eq('id', user.id)
        .single();

    return { user, profile };
};

export const actions: Actions = {
    update: async ({ request, locals: { supabase, safeGetSession } }) => {
        const formData = await request.formData();
        const fullName = formData.get('fullName') as string;
        const username = formData.get('username') as string;
        const website = formData.get('website') as string;
        const avatarUrl = formData.get('avatarUrl') as string;

        const { user } = await safeGetSession();

        const { error } = await supabase.from('profiles').upsert({
            id: user?.id,
            full_name: fullName,
            username,
            website,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        });

        if (error) {
            console.error('Failed to update profile', error);
            return fail(500, {
                fullName,
                username,
                website,
                avatarUrl,
            });
        }

        return {
            fullName,
            username,
            website,
            avatarUrl,
        };
    },
    signout: async ({ locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession();
        if (session) {
            await supabase.auth.signOut();
            throw redirect(303, '/');
        }
    },
};
