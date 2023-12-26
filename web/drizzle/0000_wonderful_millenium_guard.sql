CREATE TABLE `ingredients` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`ref_unit` enum('gr','ml') NOT NULL DEFAULT 'gr',
	`ref_quantity` int NOT NULL DEFAULT 100,
	`kcal` int NOT NULL DEFAULT 0,
	`fat` int,
	`fat_saturated` int,
	`carbs` int,
	`sugar` int,
	`fiber` int,
	`protein` int,
	`sodium` int,
	CONSTRAINT `ingredients_id` PRIMARY KEY(`id`)
);
