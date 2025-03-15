import * as auth from '$lib/server/auth.js';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const handleAuth: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get(auth.sessionCookieName);
    if (!sessionToken) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await auth.validateSessionToken(sessionToken);
    if (session) {
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } else {
        auth.deleteSessionTokenCookie(event);
    }

    event.locals.user = user;
    event.locals.session = session;

    return resolve(event);
};

const handleBetterAuth: Handle = async ({ event, resolve }) => {
    return svelteKitHandler({ event, resolve, auth: auth.auth });
};

const setSessionToLocals: Handle = async ({ event, resolve }) => {
    const session = await auth.auth.api.getSession({
        headers: event.request.headers,
    });
    event.locals.session = session?.session ?? null;
    event.locals.user = session?.user ?? null;

    return resolve(event);
};

export const handle: Handle = sequence(handleBetterAuth, setSessionToLocals);
