import { fail } from '@sveltejs/kit';
import { fail as failForm } from 'sveltekit-superforms';

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const FORBIDDEN = 405;
export const SERVER_ERROR = 500;

export function unauthenticated<T>(body?: T) {
    return fail(UNAUTHORIZED, { message: 'Unauthenticated', ...body });
}

export function unauthenticatedForm<T>(body?: T) {
    return failForm(UNAUTHORIZED, { message: 'Unauthenticated', ...body });
}

export function unauthorized<T>(body?: T) {
    return fail(UNAUTHORIZED, { message: 'Unauthorized', ...body });
}
