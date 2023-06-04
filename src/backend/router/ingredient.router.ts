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
      });
    },
  })
  .query('search', {
    input: z.object({
      query: z.string(),
      exclude: z.array(z.string()).nullish(),
    }),
    resolve: async ({ input }) => {
      console.log('Query to search ingredients:', input);
      if (!input.query || input.query.length < 3) {
        return [];
      }

      return prisma.ingredient.findMany({
        where: {
          name: { contains: input.query },
          id: input.exclude && input.exclude?.length > 0 ? { notIn: input.exclude } : undefined,
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
          kcal: true,
        },
      });
    },
  })
  .query('seach-by-barcode', {
    input: z.object({
      barcode: z.string(),
    }),
    resolve: async ({ input }) => {
      return [];
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string()?.min(1).max(100),
      unitRef: z.nativeEnum(IngredientUnit),
      kcal: z.number().int().min(0).nullable(),
      fat: z.number().min(0).nullable(),
      fatSaturated: z.number().min(0).nullable(),
      carb: z.number().min(0).nullable(),
      sugar: z.number().min(0).nullable(),
      fiber: z.number().min(0).nullable(),
      protein: z.number().min(0).nullable(),
      salt: z.number().min(0).nullable(),
    }),
    resolve: async ({ input }) => {
      return await prisma.ingredient.create({
        select: {
          id: true,
        },
        data: {
          ...input,
          quantityRef: getDefaultQuantity(input.unitRef),
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
