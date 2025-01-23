import { z } from 'zod';

export const createRecipeSchema = z.object({
    label: z.string().min(5).max(200).trim(),
    refPortions: z.number().int().nonnegative().default(1),
    steps: z.array(z.string().trim()).default(['']),

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
