import { relations, sql } from 'drizzle-orm';
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
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at', {
        withTimezone: true,
        mode: 'date',
    }).notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
});

export const account = pgTable('account', {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Account = typeof account.$inferSelect;

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
        barcode: varchar('barcode', { length: 14 }),
        createBy: text('create_by')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
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
    steps: text('steps').array().notNull().default(sql`'{}'::text[]`),
    createBy: text('create_by')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
});

export const recipeIngredients = pgTable('recipe_ingredients', {
    id: serial('id').primaryKey(),
    recipeId: serial('recipe_id')
        .notNull()
        .references(() => recipes.id, { onDelete: 'cascade' }),
    ingredientId: serial('ingredient_id')
        .notNull()
        .references(() => ingredients.id, { onDelete: 'cascade' }),
    quantity: real('quantity').notNull(),
    // FIXME: Add servings links
    // (2 boites -> 2 x 100 gr + label from serving)
    // (2 gousses -> 2x 15 gr + label from serving)
    // unitLabel: varchar('unit_label', { length: 50 }),
    comment: varchar('comment', { length: 200 }),
});
