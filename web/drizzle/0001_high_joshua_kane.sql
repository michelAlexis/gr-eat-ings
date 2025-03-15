ALTER TABLE "servings" ALTER COLUMN "quantity" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "age";