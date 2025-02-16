// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        interface Locals {
            user: import('$lib/server/auth').Session['user'] | null;
            session: import('$lib/server/auth').Session['session'] | null;
        }
        interface Error {
            message: string;
            zodError?: import('zod').ZodFormattedError;
        }
    }
}

export {};
