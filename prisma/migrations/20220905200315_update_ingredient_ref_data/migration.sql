/*
  Warnings:

  - You are about to drop the column `denomination` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `Nutrition` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nutritionRefId]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutritionRefId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityRef` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` ADD COLUMN `nutritionRefId` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantityRef` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Nutrition` DROP COLUMN `denomination`,
    DROP COLUMN `ingredientId`;

-- CreateIndex
CREATE UNIQUE INDEX `Ingredient_nutritionRefId_key` ON `Ingredient`(`nutritionRefId`);
