import { relations } from 'drizzle-orm';
import {
    boolean,
    index,
    integer,
    pgEnum,
    pgTable,
    real,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';
export const user = pgTable('user', {
    id: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
});

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp('expires_at', {
        withTimezone: true,
        mode: 'date',
    }).notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export const ingredientUnitColumn = pgEnum('ingredient_unit', ['gr', 'ml']);
export const ingredients = pgTable(
    'ingredients',
    {
        id: serial('id').primaryKey(),
        label: varchar('label', { length: 100 }).notNull(),
        description: text('description').default(''),
        refUnit: ingredientUnitColumn('ref_unit').notNull().default('gr'),
        refQuantity: integer('ref_quantity').notNull().default(100),
        kcal: integer('kcal').notNull().default(0),
        fat: real('fat'),
        fatSaturated: real('fat_saturated'),
        carbs: real('carbs'),
        sugar: real('sugar'),
        fiber: real('fiber'),
        protein: real('protein'),
        salt: real('salt'),
    },
    (table) => {
        return {
            labelIdx: index('idx_ingredients_label_unaccent').using(
                'gin',
                table.label.op('gin_trgm_ops'),
            ),
        };
    },
);
export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
export type IngredientUnit = Ingredient['refUnit'];

export const servings = pgTable('servings', {
    id: serial('id').primaryKey(),
    label: varchar('label', { length: 50 }).notNull(),
    quantity: integer('quantity').notNull().default(1),
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

export const recipes = pgTable('recipes', {
    id: serial('id').primaryKey(),
    label: varchar('label', { length: 200 }).notNull(),
    refPortions: real('ref_portions'),
});

export const recipeStep = pgTable('recipe_steps', {
    id: serial('id').primaryKey(),
    order: real('order'),
    content: text('content').notNull().default(''),
    recipeId: serial('recipe_id')
        .notNull()
        .references(() => recipes.id, { onDelete: 'cascade' }),
});

export const recipeIngredients = pgTable('recipe_ingredients', {
    id: serial('id').primaryKey(),
    recipeId: serial('recipe_id')
        .notNull()
        .references(() => recipes.id, { onDelete: 'cascade' }),
    ingredientId: serial('ingredient_id')
        .notNull()
        .references(() => ingredients.id, { onDelete: 'cascade' }),
    quantity: real('quantity'),
    comment: varchar('comment', { length: 200 }),
});
