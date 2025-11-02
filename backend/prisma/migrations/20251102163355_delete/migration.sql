/*
  Warnings:

  - You are about to drop the column `alasan_memilih_divisi` on the `volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `kontribusi` on the `volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `motivasi_bergabung` on the `volunteer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `volunteer` DROP COLUMN `alasan_memilih_divisi`,
    DROP COLUMN `kontribusi`,
    DROP COLUMN `motivasi_bergabung`;
