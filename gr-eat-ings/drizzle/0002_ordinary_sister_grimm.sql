CREATE TABLE IF NOT EXISTS "recipe_ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" serial NOT NULL,
	"ingredient_id" serial NOT NULL,
	"quantity" real,
	"comment" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" real,
	"content" text DEFAULT '' NOT NULL,
	"recipe_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(200) NOT NULL,
	"ref_portions" real
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_steps" ADD CONSTRAINT "recipe_steps_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
