import { relations } from 'drizzle-orm';
import {
    integer,
    real,
    varchar,
    pgTable,
    serial,
    pgEnum,
    text,
    boolean,
} from 'drizzle-orm/pg-core';
export const ingredientUnitColumn = pgEnum('ingredient_unit', ['gr', 'ml']);
export const ingredients = pgTable('ingredients', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description').default(''),
    refUnit: ingredientUnitColumn('ref_unit'),
    refQuantity: integer('ref_quantity').notNull().default(100),
    kcal: integer('kcal').notNull().default(0),
    fat: real('fat'),
    fatSaturated: real('fat_saturated'),
    carbs: real('carbs'),
    sugar: real('sugar'),
    fiber: real('fiber'),
    protein: real('protein'),
    salt: real('salt'),
});
export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
export type IngredientUnit = Ingredient['refUnit'];

export const servings = pgTable('servings', {
    id: serial('id').primaryKey(),
    label: varchar('label', { length: 50 }).notNull(),
    quantity: integer('quantity').notNull(),
    isDefault: boolean('is_default').default(false),
    ingredientId: serial('ingredient_id')
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

export interface RecipeIngredient {
    ingredient: Ingredient;
    quantity: number;
    unit: IngredientUnit; 
}
export interface Recipe {
    ingredients: RecipeIngredient[];
}
