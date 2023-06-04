/*
  Warnings:

  - Added the required column `unitRef` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` ADD COLUMN `unitRef` ENUM('unique', 'gr', 'kg', 'ml', 'l');

UPDATE `Ingredient` SET `unitRef` = 'gr' WHERE `unitRef` IS NULL;

ALTER TABLE `Ingredient` MODIFY COLUMN `unitRef` ENUM('unique', 'gr', 'kg', 'ml', 'l') NOT NULL;

