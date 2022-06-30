/*
  Warnings:

  - Added the required column `denomination` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Nutrition` ADD COLUMN `denomination` VARCHAR(100) NOT NULL;
