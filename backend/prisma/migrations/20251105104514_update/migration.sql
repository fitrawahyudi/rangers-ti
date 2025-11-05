/*
  Warnings:

  - You are about to drop the column `email` on the `volunteer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Volunteer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Volunteer_email_key` ON `volunteer`;

-- AlterTable
ALTER TABLE `volunteer` DROP COLUMN `email`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Volunteer_username_key` ON `Volunteer`(`username`);
