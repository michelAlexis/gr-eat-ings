DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ingredients_name_unaccent" ON "ingredients" USING gin ("name" gin_trgm_ops);