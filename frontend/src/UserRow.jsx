// src/UserRow.js

import React, { useState } from 'react';

// Komponen Status sederhana untuk visual
const StatusBadge = ({ status }) => {
  const style = {
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
    backgroundColor: status === 'DITERIMA' ? '#28a745' : '#ffc107', // Hijau atau Kuning
  };
  return <span style={style}>{status}</span>;
};


function UserRow({ user }) {
  // 1. State untuk melacak apakah baris ini terbuka atau tidak
  const [isOpen, setIsOpen] = useState(false);

  // 2. Fungsi untuk toggle state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    // 3. Kita gunakan React.Fragment (<>) karena kita ingin me-render 2 baris (<tr>)
    <>
      {/* --- BARIS UTAMA (YANG SELALU TERLIHAT) --- */}
      <tr className="main-row">
        <td>
          {/* Tombol untuk expand/collapse */}
          <button onClick={toggleOpen} className="expand-button">
            {isOpen ? '−' : '+'}
          </button>
        </td>
        <td>{user.nama}</td>
        <td>{user.npm}</td>
        <td>{user.programStudi}</td>
        <td>
          <StatusBadge status={user.status} />
        </td>
        <td>
          <button className="action-button delete">Hapus</button>
        </td>
      </tr>

      {/* --- BARIS DETAIL (YANG TERSEMBUNYI) --- */}
      {/* 4. Render baris ini HANYA JIKA 'isOpen' adalah true */}
      {isOpen && (
        <tr className="detail-row">
          {/* 5. PENTING: colSpan="6"
            Ini membuat 1 sel <td> mengambil ruang sebanyak 6 kolom,
            sehingga pas di bawah baris utama kita.
          */}
          <td colSpan="6">
            <div className="detail-content">
              <h4>Detail Tambahan:</h4>
              <ul>
                <li><strong>Stambuk/Angkatan:</strong> {user.stambuk}</li>
                <li><strong>No. WhatsApp:</strong> {user.noWhatsApp}</li>
                <li><strong>Divisi:</strong> {user.divisi}</li>
                <li><strong>Email:</strong> {user.email}</li>
              </ul>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default UserRow;