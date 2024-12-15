ALTER TABLE "ingredients" RENAME COLUMN "name" TO "label";--> statement-breakpoint
DROP INDEX IF EXISTS "idx_ingredients_name_unaccent";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ingredients_label_unaccent" ON "ingredients" USING gin ("label" gin_trgm_ops);