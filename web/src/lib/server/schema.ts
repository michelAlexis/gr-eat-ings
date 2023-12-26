import { int, varchar, mysqlTable, bigint, mysqlEnum } from 'drizzle-orm/mysql-core';

export const ingredients = mysqlTable('ingredients', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 100 }).notNull(),
    refUnit: mysqlEnum('ref_unit', ['gr', 'ml']).notNull().default('gr'),
    refQuantity: int('ref_quantity').notNull().default(100),
    kcal: int('kcal').notNull().default(0),
    fat: int('fat'),
    fatSaturated: int('fat_saturated'),
    carbs: int('carbs'),
    sugar: int('sugar'),
    fiber: int('fiber'),
    protein: int('protein'),
    sodium: int('sodium'),
});

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
