CREATE TABLE `servings` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`label` varchar(50) NOT NULL,
	`quantity` int NOT NULL,
	`is_default` boolean DEFAULT false,
	`ingredient_id` bigint NOT NULL,
	CONSTRAINT `servings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `servings` ADD CONSTRAINT `servings_ingredient_id_ingredients_id_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE cascade ON UPDATE no action;