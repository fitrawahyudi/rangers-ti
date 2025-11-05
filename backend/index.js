// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const { PrismaClient } = require('@prisma/client');
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { Prisma, PrismaClient } from '@prisma/client';
import "dotenv/config"
import jwt from "jsonwebtoken"

// backend/index.js

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["https://rangers-ti.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running ✅" });
});

// Endpoint untuk registrasi volunteer baru
app.post('/register', async (req, res) => {
  // console.log("DATA YANG DITERIMA DARI FRONTEND:", req.body);
  const {
    email,
    username,
    password,
    nama_lengkap,
    npm,
    angkatan,
    program_studi,
    no_wa,
    divisi_pilihan,
    alasan_bergabung,
    bersedia
  } = req.body;

  // // Validasi input yang lebih ketat
  // if (
  //   !username || !password || !program_studi || !nama_lengkap || !npm || !angkatan || !no_wa ||
  //   !divisi_pilihan ||bersedia || !alasan_bergabung
  // ) {
  //   return res.status(400).json({ error: 'Semua field wajib diisi' });
  // }

  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Simpan volunteer ke database
    const newVolunteer = await prisma.volunteer.create({
      data: {
        username,
        email,
        password: hashedPassword,
        nama_lengkap,
        npm,
        angkatan: parseInt(angkatan), // Pastikan angkatan adalah angka
        no_wa,
        program_studi,
        divisi_pilihan, // Pastikan value dari frontend (e.g., "ACARA")
        alasan_bergabung,
        bersedia,
      },
    });

    // Jangan kirim balik password hash
    const { password: _, ...volunteerData } = newVolunteer;
    res.status(201).json({
      message: 'Pendaftaran volunteer berhasil!',
      volunteer: volunteerData,
    });

  } catch (error) {
    console.error("PRISMA GAGAL:", error);
    // Tangani error unik (username atau NIM sudah terdaftar)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const field = error.meta.target.includes('username') ? 'Username' : 'NPM';
        return res.status(409).json({ error: `${field} ini sudah terdaftar.` });
      }
    }
    
    // Error validasi Enum (jika divisi tidak sesuai)
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({ error: 'Data tidak valid, cek pilihan divisi.' });
    }

    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

// ... (const JWT_SECRET = ...;)
const JWT_SECRET = process.env.JWT_SECRET || 'FWD201104@@UDI';


// === ENDPOINT VOLUNTEER ===

app.post('/volunteer/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const volunteer = await prisma.volunteer.findUnique({
      where: { username },
    });

    if (!volunteer) {
      return res.status(404).json({ error: 'Username tidak ditemukan' });
    }

    const isPasswordValid = await bcrypt.compare(password, volunteer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password salah' });
    }

    // Buat Token JWT khusus Volunteer
    const token = jwt.sign(
      { volunteerId: volunteer.id, username: volunteer.username }, // Payload beda
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login berhasil!',
      token: token, // Kirim token ke frontend
    });
  } catch (error) {
    res.status(500).json({ error: 'Login gagal' });
  }
});

const authenticateVolunteer = (req, res, next) => {
  console.log("\n--- [Middleware authenticateVolunteer] Dijalankan ---"); // Log 1

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  console.log("Header 'authorization' diterima:", authHeader); // Log 2
  console.log("Token yang diekstrak:", token); // Log 3

  if (token == null) {
    console.error("HASIL: GAGAL ❌ - Token tidak ditemukan (null)."); // Log 4
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    // INI ADALAH BAGIAN PALING PENTING
    if (err) {
      console.error("HASIL: GAGAL ❌ - Verifikasi JWT Gagal."); // Log 5
      console.error("Pesan Error JWT:", err.message); // Log 6 (Misal: "invalid signature", "jwt expired")
      return res.sendStatus(403); // Forbidden
    }

    // Cek apakah ini token Volunteer, bukan token Admin
    if (!user.volunteerId) {
      console.error("HASIL: GAGAL ❌ - Token ini valid, TAPI BUKAN token Volunteer."); // Log 7
      return res.sendStatus(403);
    }

    // Jika semua aman
    console.log("HASIL: SUKSES ✅ - Token terverifikasi untuk:", user.email); // Log 8
    req.volunteer = user; // Simpan data volunteer
    next();
  });
};


// Endpoint untuk cek status (Protected)
app.get('/volunteer/me', authenticateVolunteer, async (req, res) => {
  // Middleware 'authenticateVolunteer' SUDAH SELESAI di titik ini

  console.log(`--- [Endpoint /volunteer/me] Dijalankan ---`); // Log 1
  
  try {
    const volunteerId = req.volunteer.volunteerId; // Ambil ID dari middleware
    console.log(`Mencari data di database untuk volunteer ID: ${volunteerId}`); // Log 2

    const volunteer = await prisma.volunteer.findUnique({
      where: { id: volunteerId }, // Query ke database
      select: {
        id: true,
        nama_lengkap: true,
        email: true,
        username: true,
        npm: true,
        status: true,
        alasan_bergabung: true,
        divisi_pilihan: true, 
        createdAt: true
      }
    });

    // Cek apakah database mengembalikan hasil?
    if (!volunteer) {
      console.error(`HASIL: GAGAL ❌ - User dengan ID ${volunteerId} TIDAK DITEMUKAN di database.`); // Log 3
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    // Jika semua berhasil
    console.log(`HASIL: SUKSES ✅ - Data ditemukan dan dikirim ke frontend.`); // Log 4
    res.json(volunteer);
    
  } catch (error) {
    console.error("HASIL: GAGAL ❌ - Terjadi error saat query Prisma:"); // Log 5
    console.error(error); // Tampilkan error Prisma-nya
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// === ENDPOINT ADMIN ===

// 1. Admin Login
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin tidak ditemukan' });
    }

    // Bandingkan password yang di-input dengan hash di database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password salah' });
    }

    // Buat Token JWT
    const token = jwt.sign(
      { adminId: admin.id, email: admin.username },
      JWT_SECRET,
      { expiresIn: '8h' } // Token berlaku 8 jam
    );

    res.json({
      message: 'Login berhasil!',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login gagal' });
  }
});

// Middleware untuk memverifikasi token Admin
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, admin) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.admin = admin; // Simpan data admin di request
    next();
  });
};

// 2. Mendapatkan SEMUA data volunteer (HANYA UNTUK ADMIN)
app.get('/admin/volunteers', authenticateAdmin, async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: {
        createdAt: 'desc', // Tampilkan yang terbaru dulu
      },
    });
    res.json(volunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// 3. Mengubah status volunteer (HANYA UNTUK ADMIN)
app.put('/admin/volunteers/:id/status', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Misal: "DITERIMA" atau "DITOLAK"

  // Validasi status
  if (!['PENDING', 'DITERIMA', 'DITOLAK'].includes(status)) {
    return res.status(400).json({ error: 'Status tidak valid' });
  }

  try {
    const updatedVolunteer = await prisma.volunteer.update({
      where: { id: parseInt(id) },
      data: { status: status },
    });
    res.json(updatedVolunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal update status' });
  }
});

// 4. Menghapus data volunteer (HANYA UNTUK ADMIN)
app.delete('/admin/volunteers/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.volunteer.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghapus data' });
    }
});

app.get('/admin/me', authenticateAdmin, async (req, res) => {
  try {
    // req.admin.adminId diambil dari token yang sudah diverifikasi
    // oleh middleware 'authenticateAdmin'
    const adminId = req.admin.adminId; 

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      // Kita hanya pilih data yang aman untuk dikirim
      select: {
        id: true,
        username: true,
        name: true // Ini yang kita butuhkan
      }
    });

    if (!admin) {
      return res.status(404).json({ error: 'Data admin tidak ditemukan' });
    }

    // Kirim data admin (termasuk nama) ke frontend
    res.json(admin);

  } catch (error) {
    console.error("Gagal mengambil data /admin/me:", error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});
