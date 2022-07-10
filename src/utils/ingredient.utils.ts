import { NutritionData, Quantity } from '@/models/ingredient.model';
import { IngredientUnit } from '@prisma/client';

export function simplify(quantity: number, unit: IngredientUnit) {
  if (quantity !== 0) {
    switch (unit) {
      case 'gr': {
        if (quantity >= 1000) {
          quantity /= 1000;
          unit = 'kg';
        }
        break;
      }
      case 'kg': {
        if (quantity < 1) {
          quantity *= 1000;
          unit = 'gr';
        }
        break;
      }
    }
  }

  return { quantity, unit };
}

export function mapQuantity<From extends IngredientUnit, To extends IngredientUnit>(
  refQuantity: Quantity<From>,
  quantity: Quantity<To>,
  toSize: number
): Quantity<To> {
  if (refQuantity.quantity === 0) {
    refQuantity.quantity = 1;
  }

  const toRefUnit = toUnit(refQuantity, quantity.unit);

  return {
    quantity: (toRefUnit.quantity / refQuantity.quantity) * toSize,
    unit: toRefUnit.unit,
  };
}

export function multifyNutrition(nutritionRef: NutritionData, multiplier: number): NutritionData {
  return {
    kcal: (nutritionRef.kcal ?? 0) * multiplier,
  };
}

export function computeMultiplier<From extends IngredientUnit, To extends IngredientUnit>(
  refQuantity: Quantity<From>,
  target: Quantity<To>
): number {
  if (refQuantity.quantity === 0) {
    return 1;
  }
  const toRefUnit = toUnit(refQuantity, target.unit);
  return target.quantity / toRefUnit.quantity;
}

export function toUnit<From extends IngredientUnit, To extends IngredientUnit>(source: Quantity<From>, to: To): Quantity<To> {
  const from = source.unit;
  switch (from) {
    case 'gr': {
      switch (to) {
        case 'gr':
          return { unit: to, quantity: source.quantity }; // No multiplication
        case 'kg':
          return { unit: to, quantity: source.quantity / 1000 };
      }
      break;
    }

    case 'kg': {
      switch (to) {
        case 'kg':
          return { unit: to, quantity: source.quantity }; // No multiplication
        case 'gr':
          return { unit: to, quantity: source.quantity * 1000 };
      }
      break;
    }

    case 'ml': {
      switch (to) {
        case 'ml':
          return { unit: to, quantity: source.quantity }; // No multiplication
        case 'l':
          return { unit: to, quantity: source.quantity / 1000 };
      }
      break;
    }

    case 'l': {
      switch (to) {
        case 'l':
          return { unit: to, quantity: source.quantity }; // No multiplication
        case 'ml':
          return { unit: to, quantity: source.quantity * 1000 };
      }
      break;
    }

    case 'unique': {
      return { unit: to, quantity: source.quantity }; // No multiplication
    }
  }

  throw Error(`Cannot transform unit from ${from} to ${to}`);
}

export function getDefaultQuantity(unitRef: IngredientUnit) {
  switch (unitRef) {
    case 'gr':
      return 100;
    case 'kg':
      return 1;
    case 'ml':
      return 100;
    case 'l':
      return 1;
    case 'unique':
      return 1;
    default:
      return 1;
  }
}