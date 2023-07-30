import { z } from "zod";

export const ingredientCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(1000),
  unit: z.enum(['gr', 'ml']),
  quantiy: z.number().int().min(0),
  kcal: z.number().int().min(0),
  fat: z.number().int().min(0),
  fatSaturated: z.number().int().min(0),
  carb: z.number().int().min(0),
  sugar: z.number().int().min(0),
  fiber: z.number().int().min(0),
  protein: z.number().int().min(0),
  salt: z.number().int().min(0),
});
export type IngredientCreateAction = z.infer<typeof ingredientCreateSchema>;
