-- CreateTable
CREATE TABLE `Volunteer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `npm` VARCHAR(191) NOT NULL,
    `angkatan` INTEGER NOT NULL,
    `program_studi` VARCHAR(191) NOT NULL,
    `no_wa` VARCHAR(191) NOT NULL,
    `divisi_pilihan` ENUM('VOLUNTEER', 'MC', 'PEMATERI', 'PEMBACA_DOA') NOT NULL,
    `motivasi_bergabung` TEXT NOT NULL,
    `kontribusi` TEXT NOT NULL,
    `alasan_bergabung` TEXT NOT NULL,
    `alasan_memilih_divisi` TEXT NOT NULL,
    `bersedia` ENUM('BERSEDIA', 'TIDAK') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Volunteer_email_key`(`email`),
    UNIQUE INDEX `Volunteer_npm_key`(`npm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
