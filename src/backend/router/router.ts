import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

export const appRouter = trpc
  .router()
  .query('get-ingredients', {
    resolve: async () => {
      return prisma.ingredient.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    },
  })
  .query('get-ingredient-by-id', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input }) => {
      return prisma.ingredient.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
        },
      });
    },
  })
  .query('search-ingredient', {
    input: z.object({
      query: z.string(),
    }),
    resolve: async ({ input }) => {
      return prisma.ingredient.findMany({
        where: {
          name: {
            search: input.query,
          },
        },
      });
    },
  })
  .mutation('create-ingredient', {
    input: z.object({
      name: z.string()?.min(1).max(100),
    }),
    resolve: async ({ input }) => {
      return await prisma.ingredient.create({
        data: input,
      });
    },
  })
  .mutation('delete-ingredient', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input }) => {
      await prisma.ingredient.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
