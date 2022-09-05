import { getDefaultQuantity } from '@/utils/ingredient.utils';
import { IngredientUnit } from '@prisma/client';
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
          quantityRef: true,
          nutritionRef: {
            select: {
              id: true,
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
          quantityRef: true,
          nutritionRef: {
            select: {
              id: true,
              kcal: true,
            },
          },
        },
      });

      return results.map((r) => ({ id: r.id, name: r.name, unitRef: r.unitRef, kcal: r.nutritionRef?.kcal }));
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string()?.min(1).max(100),
      unitRef: z.nativeEnum(IngredientUnit),
      nutritionRef: z.object({
        kcal: z.number().int().min(0).nullable(),
      }),
    }),
    resolve: async ({ input }) => {
      return await prisma.ingredient.create({
        data: {
          name: input.name,
          unitRef: input.unitRef,
          quantityRef: getDefaultQuantity(input.unitRef),
          nutritionRef: {
            create: input.nutritionRef,
          },
        },
      });
    },
  })
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
