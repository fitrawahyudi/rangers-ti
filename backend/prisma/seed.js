// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcrypt');
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding...');

  const adminName = "Fitra Wahyudi Dalimunthe"
  const adminUsername = 'fwd201104'; 
  const adminPassword = 'fwd201104';
  const adminEmail = 'fitrawahyudi739@gmail.com'; 
  // -----------------------

  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  console.log('Password berhasil di-hash...');

  // Hapus admin lama jika ada (opsional, tapi bagus untuk testing)
  
  // Buat admin baru
  const admin = await prisma.admin.upsert({
    where: { username }, // <-- Ganti ini dengan field unik, misal 'username'
    update: { // <-- Jika admin-nya ketemu, update ini
      password: hashedPassword,
      email: adminEmail, // (Kita update email juga, siapa tahu ganti)
    },
    create: { // <-- Jika admin-nya tidak ketemu, buat baru
      name: adminName,
      username: adminUsername,
      password: hashedPassword,
      email: adminEmail,
    },
  });
  
  await prisma.admin.deleteMany({
    where: { username: adminUsername },
  });

  console.log(`Berhasil membuat admin baru: ${admin.username}`);
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