CREATE TABLE `ingredients` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(1000) DEFAULT '',
	`ref_unit` enum('gr','ml') NOT NULL DEFAULT 'gr',
	`ref_quantity` int NOT NULL DEFAULT 100,
	`kcal` int NOT NULL DEFAULT 0,
	`fat` float,
	`fat_saturated` float,
	`carbs` float,
	`sugar` float,
	`fiber` float,
	`protein` float,
	`salt` float,
	CONSTRAINT `ingredients_id` PRIMARY KEY(`id`)
);
