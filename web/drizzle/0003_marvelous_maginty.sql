CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS "idx_ingredients_name_unaccent" ON "ingredients" USING gin ("name" gin_trgm_ops);
