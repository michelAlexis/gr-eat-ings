ALTER TABLE "ingredients" ADD COLUMN "create_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "create_by" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_create_by_user_id_fk" FOREIGN KEY ("create_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_create_by_user_id_fk" FOREIGN KEY ("create_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
