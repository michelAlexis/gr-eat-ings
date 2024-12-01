import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = ({ params }) => {
    console.log('Delete', params.id);
    return new Response();
};
