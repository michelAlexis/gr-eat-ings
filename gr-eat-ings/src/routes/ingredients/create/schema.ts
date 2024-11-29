import { z } from "zod";

export const createServingSchema = z.object({
  label: z.string().min(1).max(50).trim(),
  quantity: z.number().int().positive().default(1),
  isDefault: z.boolean(),
});

export const createIngredientSchema = z.object({
  name: z.string().min(5).max(100).trim(),
  description: z.string().max(1000).trim().default(""),
  refUnit: z.enum(["gr", "ml"]).default("gr"),
  refQuantity: z.number().int().positive().default(100),
  kcal: z.number().int().nonnegative().default(0),
  fat: z.number().nonnegative().nullable(),
  fatSaturated: z.number().nonnegative().nullable(),
  carbs: z.number().nonnegative().nullable(),
  sugar: z.number().nonnegative().nullable(),
  fiber: z.number().nonnegative().nullable(),
  portein: z.number().nonnegative().nullable(),
  salt: z.number().nonnegative().nullable(),

  servings: z
    .array(createServingSchema)
    .min(1)
    .refine((arr) => arr.filter((s) => s.isDefault).length === 1, {
      message: "Ingredient must have one default serving",
    })
    .default([{ isDefault: true, label: "Portion", quantity: 100 }]),
});
