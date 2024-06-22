import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    console.log('Loading layout', user?.id);

    return {
        session,
        user,
    };
};
