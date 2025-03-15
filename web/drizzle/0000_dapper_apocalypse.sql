DO $$ BEGIN
 CREATE TYPE "public"."ingredient_unit" AS ENUM('gr', 'ml');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text DEFAULT '',
	"ref_unit" "ingredient_unit" DEFAULT 'gr' NOT NULL,
	"ref_quantity" integer DEFAULT 100 NOT NULL,
	"kcal" integer DEFAULT 0 NOT NULL,
	"fat" real,
	"fat_saturated" real,
	"carbs" real,
	"sugar" real,
	"fiber" real,
	"protein" real,
	"salt" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "servings" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(50) NOT NULL,
	"quantity" integer NOT NULL,
	"is_default" boolean DEFAULT false,
	"ingredient_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"age" integer,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "servings" ADD CONSTRAINT "servings_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
