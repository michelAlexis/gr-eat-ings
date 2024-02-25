import { relations } from 'drizzle-orm';
import {
    int,
    float,
    varchar,
    mysqlTable,
    bigint,
    mysqlEnum,
    boolean,
} from 'drizzle-orm/mysql-core';

export const ingredients = mysqlTable('ingredients', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 100 }).notNull(),
    description: varchar('description', { length: 1000 }).default(''),
    refUnit: mysqlEnum('ref_unit', ['gr', 'ml']).notNull().default('gr'),
    refQuantity: int('ref_quantity').notNull().default(100),
    kcal: int('kcal').notNull().default(0),
    fat: float('fat'),
    fatSaturated: float('fat_saturated'),
    carbs: float('carbs'),
    sugar: float('sugar'),
    fiber: float('fiber'),
    protein: float('protein'),
    salt: float('salt'),
});
export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;

export const servings = mysqlTable('servings', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    label: varchar('label', { length: 50 }).notNull(),
    quantity: int('quantity').notNull(),
    isDefault: boolean('is_default').default(false),
    ingredientId: bigint('ingredient_id', { mode: 'number' })
        .notNull()
        .references(() => ingredients.id, { onDelete: 'cascade' }),
});
export type Serving = typeof servings.$inferSelect;
export type NewServing = typeof servings.$inferInsert;

export const servingsRelations = relations(servings, ({ one }) => ({
    ingredient: one(ingredients, {
        fields: [servings.ingredientId],
        references: [ingredients.id],
    }),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
    servings: many(servings),
}));

