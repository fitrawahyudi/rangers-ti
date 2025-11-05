-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_username_key`(`username`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Volunteer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `npm` VARCHAR(191) NOT NULL,
    `angkatan` INTEGER NOT NULL,
    `program_studi` VARCHAR(191) NOT NULL,
    `no_wa` VARCHAR(191) NOT NULL,
    `divisi_pilihan` ENUM('MC', 'PEMATERI', 'PEMBACA_DOA') NOT NULL,
    `alasan_bergabung` TEXT NOT NULL,
    `status` ENUM('PENDING', 'DITERIMA', 'DITOLAK') NOT NULL DEFAULT 'PENDING',
    `bersedia` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Volunteer_username_key`(`username`),
    UNIQUE INDEX `Volunteer_email_key`(`email`),
    UNIQUE INDEX `Volunteer_npm_key`(`npm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
