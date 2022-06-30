import { Nutrition, Quantity, Unit } from '@/models/ingredient.model';

export function simplify(quantity: number, unit: Unit) {
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

export function mapQuantity(sizeReference: number, quantity: Quantity, toSize: number): Quantity {
  if (sizeReference === 0) {
    sizeReference = 1;
  }
  return {
    quantity: (quantity.quantity / sizeReference) * toSize,
    unit: quantity.unit,
  };
}

export function multifyNutrition(nutritionRef: Nutrition, multiplier: number): Nutrition {
  return {
    kcal: nutritionRef.kcal * multiplier,
  };
}
