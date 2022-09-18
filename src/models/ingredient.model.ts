import { InferQueryOutput } from '@/utils/trpc';
import type { Ingredient, IngredientUnit, Nutrition } from '@prisma/client';

export type IngredientSearchResult = InferQueryOutput<'ingredients.search'>[number];
export type IngredientDetail = InferQueryOutput<'ingredients.by-id'>;

export interface Recipe {
  name: string;
  sizeReference: number;
  ingredients: IngredientQuantity[];
}

export interface Quantity<U extends IngredientUnit = IngredientUnit> {
  quantity: number;
  unit: U;
}

export type NutritionData = Pick<Nutrition, 'kcal'>;

export interface IngredientQuantity<U extends IngredientUnit = IngredientUnit> extends Quantity<U> {
  ingredient: Ingredient;
}
