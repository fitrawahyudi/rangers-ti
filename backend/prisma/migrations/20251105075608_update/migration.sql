/*
  Warnings:

  - The values [VOLUNTEER] on the enum `Volunteer_divisi_pilihan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `volunteer` MODIFY `divisi_pilihan` ENUM('MC', 'PEMATERI', 'PEMBACA_DOA') NOT NULL;
