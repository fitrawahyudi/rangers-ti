
import React from 'react';

const styles = {
  // Latar belakang gelap
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Kotak putih di tengah
  content: {
    backgroundColor: 'white',
    padding: '20px 40px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    zIndex: 1001,
  },
  closeButton: {
    float: 'right',
    border: 'none',
    background: '#eee',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
};


function UserDetailModal({ user, onClose }) {
  // Jika tidak ada user, jangan render apa-apa
  if (!user) {
    return null;
  }

  // Kita gunakan 'stopPropagation' agar saat mengklik kotak putih,
  // overlay di belakangnya tidak ikut ter-klik (yang akan memicu onClose)
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.content} onClick={(e) => e.stopPropagation()}>
        
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <h2>Detail Anggota</h2>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>Email</strong> {user.email}
          </li>
          <li style={styles.listItem}>
            <strong>Nama</strong> {user.nama_lengkap}
          </li>
          <li style={styles.listItem}>
            <strong>NPM</strong> {user.npm}
          </li>
          <li style={styles.listItem}>
            <strong>Program Studi</strong> {user.program_studi}
          </li>
          <li style={styles.listItem}>
            <strong>Stambuk</strong> {user.angkatan}
          </li>
          <li style={styles.listItem}>
            <strong>No. WhatsApp</strong> {user.no_wa}
          </li>
          <li style={styles.listItem}>
            <strong>Divisi</strong> {user.divisi_pilihan}
          </li>
          <li style={styles.listItem}>
            <strong>Alasan Bergabung</strong> {user.alasan_bergabung}
          </li>
          <li style={styles.listItem}>
            <strong>Status</strong> {user.status}
          </li>
        </ul>
        
      </div>
    </div>
  );
}

export default UserDetailModal;