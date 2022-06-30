import { Nutrition, Quantity } from '@/models/ingredient.model';
import { mapQuantity, multifyNutrition, simplify } from './ingredient.utils';

describe('simplify function', () => {
  test('simplify kilo', () => {
    expect(simplify(0, 'kg')).toStrictEqual({ quantity: 0, unit: 'kg' });
    expect(simplify(1, 'kg')).toStrictEqual({ quantity: 1, unit: 'kg' });
    expect(simplify(10, 'kg')).toStrictEqual({ quantity: 10, unit: 'kg' });
    expect(simplify(0.5, 'kg')).toStrictEqual({ quantity: 500, unit: 'gr' });
    expect(simplify(0.25, 'kg')).toStrictEqual({ quantity: 250, unit: 'gr' });
  });

  test('simplify gramm', () => {
    expect(simplify(0, 'gr')).toStrictEqual({ quantity: 0, unit: 'gr' });
    expect(simplify(1, 'gr')).toStrictEqual({ quantity: 1, unit: 'gr' });
    expect(simplify(10, 'gr')).toStrictEqual({ quantity: 10, unit: 'gr' });
    expect(simplify(100, 'gr')).toStrictEqual({ quantity: 100, unit: 'gr' });
    expect(simplify(500, 'gr')).toStrictEqual({ quantity: 500, unit: 'gr' });
    expect(simplify(750, 'gr')).toStrictEqual({ quantity: 750, unit: 'gr' });
    expect(simplify(999, 'gr')).toStrictEqual({ quantity: 999, unit: 'gr' });
    expect(simplify(1000, 'gr')).toStrictEqual({ quantity: 1, unit: 'kg' });
    expect(simplify(1500, 'gr')).toStrictEqual({ quantity: 1.5, unit: 'kg' });
  });
});

describe('multiply nutrition function', () => {
  const refNutrition: Nutrition = {
    kcal: 100,
  };

  test('Should multiply nutrition', () => {
    expect(multifyNutrition(refNutrition, 1)).toStrictEqual<Nutrition>({ kcal: 100 });
    expect(multifyNutrition(refNutrition, 2)).toStrictEqual<Nutrition>({ kcal: 200 });
    expect(multifyNutrition(refNutrition, 0)).toStrictEqual<Nutrition>({ kcal: 0 });
    expect(multifyNutrition(refNutrition, 0.5)).toStrictEqual<Nutrition>({ kcal: 50 });
  });
});

describe('mapQuantity function', () => {
  const refQuantity: Quantity = {
    quantity: 100,
    unit: 'gr',
  };

  test('Should multiply from single size', () => {
    // The sintax is ex:
    // A receipe for 1 person need 100gr of something, how much does it need of it for x person ?
    expect(mapQuantity(1, refQuantity, 1)).toStrictEqual<Quantity>({ quantity: 100, unit: 'gr' });
    expect(mapQuantity(1, refQuantity, 2)).toStrictEqual<Quantity>({ quantity: 200, unit: 'gr' });
    expect(mapQuantity(1, refQuantity, 0)).toStrictEqual<Quantity>({ quantity: 0, unit: 'gr' });
    expect(mapQuantity(1, refQuantity, 0.5)).toStrictEqual<Quantity>({ quantity: 50, unit: 'gr' });
  });

  test('Should multiply from any size', () => {
    expect(mapQuantity(2, refQuantity, 0)).toStrictEqual<Quantity>({ quantity: 0, unit: 'gr' });
    expect(mapQuantity(2, refQuantity, 1)).toStrictEqual<Quantity>({ quantity: 50, unit: 'gr' });
    expect(mapQuantity(2, refQuantity, 4)).toStrictEqual<Quantity>({ quantity: 200, unit: 'gr' });
    expect(mapQuantity(4, refQuantity, 10)).toStrictEqual<Quantity>({ quantity: 250, unit: 'gr' });
  });
});
