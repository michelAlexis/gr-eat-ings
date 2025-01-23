DROP TABLE "recipe_steps";--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ALTER COLUMN "quantity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "steps" text[] DEFAULT '{}'::text[] NOT NULL;