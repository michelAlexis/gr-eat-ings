import { InferQueryOutput } from '@/utils/trpc';
import type { Ingredient, IngredientUnit } from '@prisma/client';

export type IngredientDetail = InferQueryOutput<'ingredients.by-id'>;

export interface Quantity<U extends IngredientUnit = IngredientUnit> {
  quantity: number;
  unit: U;
}

export type NutritionData = Partial<Pick<Ingredient, 'kcal' | 'fat' | 'fatSaturated' | 'carb' | 'sugar' | 'fiber' | 'protein' | 'salt'>>;
