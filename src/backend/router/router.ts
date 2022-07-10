import * as trpc from '@trpc/server';
import { ingredientRouter } from './ingredient.router';

export const appRouter = trpc.router().merge('ingredients.', ingredientRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
