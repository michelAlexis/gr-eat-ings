import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

export const ingredientRouter = trpc
  .router()
  .query('all', {
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
  .query('by-id', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input }) => {
      return prisma.ingredient.findUnique({
        rejectOnNotFound: true,
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          unitRef: true,
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
  .query('search', {
    input: z.object({
      query: z.string(),
    }),
    resolve: async ({ input }) => {
      console.log('Query to search ingredients:', input);
      if (!input.query || input.query.length < 3) {
        return [];
      }

      const results = await prisma.ingredient.findMany({
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
          unitRef: true,
          nutritions: {
            take: 1,
            where: {
              denomination: 'ref',
            },
            select: {
              id: true,
              kcal: true,
            },
          },
        },
      });

      return results.map((r) => ({ id: r.id, name: r.name, unitRef: r.unitRef, kcal: r.nutritions?.[0].kcal }));
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
  .mutation('delete', {
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
