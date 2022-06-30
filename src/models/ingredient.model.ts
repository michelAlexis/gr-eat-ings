export type UnitType = 'unique' | 'solid' | 'liquid';
export type Unit = 'unique' | 'gr' | 'kg' | 'ml' | 'l';

export interface Ingredient {
  name: string;
  unitRef: UnitType;
  nutritions: Nutrition[];
}

export interface Nutrition {
  denomination: 'ref' | string;
  kcal: number;
}

export interface Recipe {
  name: string;
  sizeReference: number;
  ingredients: IngredientQuantity[];
}

export interface Quantity {
  quantity: number;
  unit: Unit;
}

export interface IngredientQuantity extends Quantity {
  ingredient: Ingredient;
}
