import { z } from 'zod';

export const createRecipeSchema = z.object({
    label: z.string().min(5).max(200).trim(),
    description: z.string().max(2000).trim().nullable(),
    refPortions: z.number().int().nonnegative().default(1),
    steps: z.array(z.string().trim().nullable()).default(['']),

    ingredients: z
        .array(
            z.object({
                ingredientId: z.number(),
                quantity: z.number().nonnegative(),
                comment: z.string().max(200).trim().nullable(),
            }),
        )
        .default([]),
});
