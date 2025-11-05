// function AdminDashboard() {
//   const [volunteers, setVolunteers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [adminName, setAdminName] = useState("");
//   const navigate = useNavigate();

//   const fetchAdminData = async () => {
//     try {
//       const response = await api.get("/admin/me"); // Panggil endpoint BARU
//       // Simpan nama, atau email jika namanya (null/kosong)
//       setAdminName(response.data.name || response.data.email);
//     } catch (err) {
//       console.error("Gagal mengambil info admin:", err);
//       setAdminName("Admin"); // Nama cadangan jika gagal
//     }
//   };

//   const handleDelete = (id, nama) => {
//     // Tampilkan konfirmasi SweetAlert2
//     Swal.fire({
//       title: "Apakah kamu yakin?",
//       text: `Kamu akan menghapus pendaftar atas nama "${nama}". Aksi ini tidak bisa dibatalkan!`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33", // Warna tombol hapus (merah)
//       cancelButtonColor: "#3085d6", // Warna tombol batal (biru)
//       confirmButtonText: "Ya, hapus!",
//       cancelButtonText: "Batal",
//     }).then(async (result) => {
//       // Jika admin mengklik "Ya, hapus!"
//       if (result.isConfirmed) {
//         try {
//           // Kirim request hapus ke API
//           await api.delete(`/admin/volunteers/${id}`);

//           // Update state untuk menghapus data dari tabel
//           setVolunteers(volunteers.filter((v) => v.id !== id));

//           // Tampilkan notifikasi sukses
//           Swal.fire(
//             "Dihapus!",
//             `Data pendaftar "${nama}" telah berhasil dihapus.`,
//             "success"
//           );
//         } catch (err) {
//           console.log(err);
//           // Tampilkan notifikasi error jika API gagal
//           Swal.fire(
//             "Gagal!",
//             "Terjadi kesalahan saat menghapus data.",
//             "error"
//           );
//         }
//       }
//     });
//   };

//   // Fungsi untuk mengambil data
//   const fetchVolunteers = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get("/admin/volunteers");
//       setVolunteers(response.data);
//       setError("");
//     } catch (err) {
//       setError("Gagal mengambil data pendaftar. Coba muat ulang halaman.", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Ambil data saat komponen dimuat
//   useEffect(() => {
//     const loadDashboardData = async () => {
//       setLoading(true);
//       setError(""); // Reset error
//       try {
//         // Panggil kedua fungsi secara paralel
//         await Promise.all([fetchAdminData(), fetchVolunteers()]);
//       } catch (err) {
//         // error sudah di-set oleh fetchVolunteers
//         console.error("Gagal memuat data dashboard:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboardData();
//   }, []);

//   //  Fungsi Logout
//   const handleLogout = () => {
//     localStorage.removeItem("adminToken"); // Pastikan token admin yang dihapus
//     navigate("/admin/login");
//   };

//   // Fungsi Ubah Status
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await api.put(`/admin/volunteers/${id}/status`, {
//         status: newStatus,
//       });
//       setVolunteers(
//         volunteers.map((v) =>
//           v.id === id ? { ...v, status: response.data.status } : v
//         )
//       );
//     } catch (err) {
//       alert("Gagal mengubah status.", err);
//     }
//   };

//   // Helper untuk styling select status (Versi Bootstrap 5.3+)
//   const getStatusClasses = (status) => {
//     let baseClass = "form-select form-select-sm fw-bold";
//     switch (status) {
//       case "DITERIMA":
//         return `${baseClass} bg-success-subtle border-success-subtle text-success-emphasis`;
//       case "DITOLAK":
//         return `${baseClass} bg-danger-subtle border-danger-subtle text-danger-emphasis`;
//       case "PENDING":
//       default:
//         return `${baseClass} bg-warning-subtle border-warning-subtle text-warning-emphasis`;
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-4 my-md-5">
//       {error && <div className="alert alert-danger">{error}</div>}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-dark mb-0">Admin Dashboard</h2>
//         <button onClick={handleLogout} className="btn btn-danger">
//           Logout
//         </button>
//       </div>
//       <p className="text-muted mb-0 fs-5">
//         {<TimezoneGreeting name={adminName} />}
//         {/*  */}
//       </p>
//       <div className="card shadow-sm border-0 rounded-3">
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-striped table-hover align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th scope="col">Nama</th>
//                   <th scope="col">NPM </th>
//                   <th scope="col">Program Studi </th>
//                   <th scope="col">Stambuk / Angkatan </th>
//                   <th scope="col">No. WhatsApp</th>
//                   <th scope="col">Divisi</th>
//                   <th scope="col">Email</th>
//                   <th scope="col" style={{ minWidth: "150px" }}>
//                     Status
//                   </th>
//                   <th scope="col">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {volunteers.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="text-center py-5 text-muted">
//                       Belum ada pendaftar.
//                     </td>
//                   </tr>
//                 ) : (
//                   volunteers.map((v) => (
//                     <tr key={v.id}>
//                       <td className="fw-medium">{v.nama_lengkap}</td>
//                       <td>{v.npm}</td>
//                       <td>
//                         <div className="small">{v.program_studi}</div>
//                       </td>
//                       <td>
//                         <div className="small">{v.angkatan}</div>
//                       </td>
//                       <td>
//                         <div className="small">{v.no_wa}</div>
//                       </td>
//                       <td>
//                         <div className="small">{v.divisi_pilihan}</div>
//                       </td>
//                       <td>
//                         <div className="small">{v.email}</div>
//                       </td>
//                       <td>
//                         <select
//                           value={v.status}
//                           onChange={(e) =>
//                             handleStatusChange(v.id, e.target.value)
//                           }
//                           className={getStatusClasses(v.status)}
//                           aria-label="Ubah Status"
//                         >
//                           <option value="PENDING">PENDING</option>
//                           <option value="DITERIMA">DITERIMA</option>
//                           <option value="DITOLAK">DITOLAK</option>
//                         </select>
//                       </td>
//                       <td className="text-nowrap">
//                         <button
//                           onClick={() => handleDelete(v.id, v.nama_lengkap)}
//                           className="btn btn-outline-danger btn-sm"
//                         >
//                           Hapus
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }