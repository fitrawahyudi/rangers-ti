// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcrypt');
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding...');

  // --- GANTI DATA INI ---
  const adminUsername = 'admin'; // Ganti dengan username admin yang kamu mau
  const adminPassword = 'admin'; // Ganti dengan password yang kamu mau
  const adminEmail = 'fitrawahyudi739@gmail.com'; // Ganti dengan password yang kamu mau
  // -----------------------

  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  console.log('Password berhasil di-hash...');

  // Hapus admin lama jika ada (opsional, tapi bagus untuk testing)
  await prisma.admin.deleteMany({
    where: { username: adminUsername },
  });

  // Buat admin baru
  const newAdmin = await prisma.admin.create({
    data: {
      username: adminUsername,
      password: hashedPassword,
      email: adminEmail
      // tambahkan field lain jika wajib, misal 'name'
      // name: 'Admin Utama' 
    },
  });

  console.log(`Berhasil membuat admin baru: ${newAdmin.username}`);
  console.log('Seeding selesai.');
}

// Jalankan fungsi main
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Tutup koneksi prisma
    await prisma.$disconnect();
  });