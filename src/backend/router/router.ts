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
          nutritions: {
            select: {
              id: true,
              denomination: true,
              kcal: true,
            },
          },
        },
      });
    },
  })
  .query('search-ingredient', {
    input: z.object({
      query: z.string(),
    }),
    resolve: async ({ input }) => {
      console.log('Query to search ingredients:', input);
      if (!input.query || input.query.length < 3) {
        return [];
      }

      return prisma.ingredient.findMany({
        where: {
          name: {
            contains: input.query,
          },
        },
        take: 50,
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          name: true,
        },
      });
    },
  })
  // .mutation('create-ingredient', {
  //   input: z.object({
  //     name: z.string()?.min(1).max(100),
  //     nutritions: z
  //       .array(
  //         z.object({
  //           kcal: z.number().min(0),
  //         })
  //       )
  //       .min(1),
  //   }),
  //   resolve: async ({ input }) => {
  //     return await prisma.ingredient.create({
  //       data: {
  //         name: input.name,
  //         nutritions: {
  //           createMany: {
  //             data: input.nutritions,
  //           },
  //         },
  //       },
  //     });
  //   },
  // })
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
