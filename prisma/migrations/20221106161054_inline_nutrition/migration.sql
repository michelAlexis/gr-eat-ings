/*
  Warnings:

  - You are about to drop the column `nutritionRefId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the `Nutrition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Ingredient_nutritionRefId_key` ON `Ingredient`;

-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `nutritionRefId`,
    ADD COLUMN `carb` DOUBLE NULL,
    ADD COLUMN `fat` DOUBLE NULL,
    ADD COLUMN `fatSaturated` DOUBLE NULL,
    ADD COLUMN `fiber` DOUBLE NULL,
    ADD COLUMN `kcal` INTEGER NULL,
    ADD COLUMN `protein` DOUBLE NULL,
    ADD COLUMN `salt` DOUBLE NULL,
    ADD COLUMN `sugar` DOUBLE NULL;

-- DropTable
DROP TABLE `Nutrition`;
