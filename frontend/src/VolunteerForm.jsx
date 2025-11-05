import React, { useState } from 'react';

// === Komponen untuk Langkah 1: Data Diri ===
function Step1({ formData, handleChange, errors }) {
    return (
        <div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Nama Lengkap <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        id="fullName"
                        name="fullName"
                        placeholder="Contoh: Budi Santoso"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Alamat Email <span className="text-danger">*</span></label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="contoh@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Nomor Telepon (WhatsApp) <span className="text-danger">*</span></label>
                    <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                        placeholder="0812xxxxxxxx"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="dob" className="form-label">Tanggal Lahir <span className="text-danger">*</span></label>
                    <input
                        type="date"
                        className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                </div>
                <div className="col-12">
                    <label htmlFor="address" className="form-label">Alamat Domisili Saat Ini <span className="text-danger">*</span></label>
                    <textarea
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        name="address"
                        rows="3"
                        placeholder="Jl. Merdeka No. 10, Kota Bandung, Jawa Barat"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
            </div>
        </div>
    );
}

// === Komponen untuk Langkah 2: Akademik & Organisasi ===
function Step2({ formData, handleChange, errors }) {
    return (
        <div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="university" className="form-label">Universitas/Institusi <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className={`form-control ${errors.university ? 'is-invalid' : ''}`}
                        id="university"
                        name="university"
                        placeholder="Universitas Indonesia"
                        value={formData.university}
                        onChange={handleChange}
                        required
                    />
                    {errors.university && <div className="invalid-feedback">{errors.university}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="major" className="form-label">Fakultas / Jurusan <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                        id="major"
                        name="major"
                        placeholder="Ilmu Komputer"
                        value={formData.major}
                        onChange={handleChange}
                        required
                    />
                    {errors.major && <div className="invalid-feedback">{errors.major}</div>}
                </div>
                <div className="col-12">
                    <label htmlFor="organization" className="form-label">Pengalaman Organisasi/Kepanitiaan</label>
                    <textarea
                        className="form-control"
                        id="organization"
                        name="organization"
                        rows="4"
                        placeholder="Jelaskan pengalaman relevan Anda (jika ada)..."
                        value={formData.organization}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

// === Komponen untuk Langkah 3: Motivasi & Komitmen ===
function Step3({ formData, handleChange, errors }) {
    return (
        <div>
            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="motivation" className="form-label">Motivasi Bergabung <span className="text-danger">*</span></label>
                    <textarea
                        className={`form-control ${errors.motivation ? 'is-invalid' : ''}`}
                        id="motivation"
                        name="motivation"
                        rows="5"
                        placeholder="Jelaskan alasan Anda tertarik menjadi volunteer dan apa yang dapat Anda kontribusikan..."
                        value={formData.motivation}
                        onChange={handleChange}
                        required
                    ></textarea>
                    {errors.motivation && <div className="invalid-feedback">{errors.motivation}</div>}
                </div>
                <div className="col-12">
                    <label htmlFor="commitment" className="form-label">Komitmen Waktu per Minggu <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className={`form-control ${errors.commitment ? 'is-invalid' : ''}`}
                        id="commitment"
                        name="commitment"
                        placeholder="Contoh: 5-8 jam per minggu"
                        value={formData.commitment}
                        onChange={handleChange}
                        required
                    />
                    {errors.commitment && <div className="invalid-feedback">{errors.commitment}</div>}
                </div>
            </div>
        </div>
    );
}

// === Komponen untuk Langkah 4: Pilihan Divisi ===
function Step4({ formData, handleChange, errors }) {
    return (
        <div>
            <label htmlFor="division" className="form-label">Pilihan Divisi <span className="text-danger">*</span></label>
            <select
                className={`form-select ${errors.division ? 'is-invalid' : ''}`}
                id="division"
                name="division"
                value={formData.division}
                onChange={handleChange}
                required
            >
                <option value="">-- Pilih Divisi --</option>
                <option value="acara">Divisi Acara (Event)</option>
                <option value="humas">Divisi Humas (Public Relations)</option>
                <option value="desain">Divisi Desain & Kreatif</option>
                <option value="dokumentasi">Divisi Dokumentasi</option>
                <option value="logistik">Divisi Logistik & Perlengkapan</option>
                <option value="lainnya">Lainnya</option>
            </select>
            {errors.division && <div className="invalid-feedback">{errors.division}</div>}
        </div>
    );
}

// === Komponen untuk Langkah 5: Administrasi ===
function Step5({ handleFileChange, errors, cvFileName }) {
    return (
        <div>
            <label htmlFor="cv-upload" className="form-label">Upload CV (PDF, maks. 2MB)</label>
            <input
                type="file"
                className={`form-control ${errors.cv ? 'is-invalid' : ''}`}
                id="cv-upload"
                name="cv-upload"
                accept=".pdf"
                onChange={handleFileChange}
            />
            {cvFileName && <div className="form-text text-muted mt-2">File terpilih: {cvFileName}</div>}
            {errors.cv && <div className="invalid-feedback d-block">{errors.cv}</div>}
        </div>
    );
}

// === Komponen untuk Langkah 6: Konfirmasi ===
function Step6({ formData, handleChange, errors }) {
    return (
        <div>
            <div className="form-check">
                <input
                    className={`form-check-input ${errors.agreement ? 'is-invalid' : ''}`}
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    required
                />
                <label className="form-check-label" htmlFor="agreement">
                    Saya menyatakan bahwa data yang saya isi adalah benar dan dapat dipertanggungjawabkan. <span className="text-danger">*</span>
                </label>
                {errors.agreement && <div className="invalid-feedback d-block">{errors.agreement}</div>}
            </div>
        </div>
    );
}

// === Komponen Indikator Langkah ===
function StepIndicator({ currentStep, totalSteps, stepTitles }) {
    const progressPercentage = (currentStep / totalSteps) * 100;
    
    return (
        <div className="mb-4">
            <div className="text-center">
                <p className="text-primary fw-semibold">
                    Langkah <span>{currentStep}</span> dari {totalSteps}
                </p>
                <h2 className="h4 text-dark mt-1">
                    {stepTitles[currentStep - 1]}
                </h2>
            </div>
            <div className="progress mt-3" style={{ height: '8px' }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progressPercentage}%` }}
                    aria-valuenow={progressPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </div>
    );
}

// === Komponen Konfirmasi Selesai ===
function Confirmation() {
    return (
        <div className="text-center py-5">
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Pendaftaran Berhasil!</h4>
                <p>Terima kasih telah mendaftar. Kami akan segera menghubungi Anda.</p>
            </div>
            <p className="text-muted">Anda dapat menutup halaman ini.</p>
        </div>
    );
}

// === Komponen Aplikasi Utama ===
export default function VolunteerForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        university: '',
        major: '',
        organization: '',
        motivation: '',
        commitment: '',
        division: '',
        cv: null,
        agreement: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const totalSteps = 6;
    const stepTitles = [
        "Data Diri",
        "Akademik & Organisasi",
        "Motivasi & Komitmen",
        "Pilihan Divisi",
        "Administrasi",
        "Konfirmasi & Selesai"
    ];

    // Handler untuk input teks, select, checkbox
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Hapus error saat pengguna mulai mengetik
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Handler khusus untuk input file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Validasi file sederhana (opsional)
        if (file && file.size > 2 * 1024 * 1024) { // 2MB
             setErrors(prev => ({ ...prev, cv: 'Ukuran file terlalu besar, maks. 2MB.' }));
             setFormData(prev => ({ ...prev, cv: null }));
             e.target.value = null; // Reset input file
        } else if (file && file.type !== 'application/pdf') {
             setErrors(prev => ({ ...prev, cv: 'Hanya file PDF yang diizinkan.' }));
             setFormData(prev => ({ ...prev, cv: null }));
             e.target.value = null; // Reset input file
        } else {
            setFormData(prev => ({ ...prev, cv: file }));
            if (errors.cv) {
                setErrors(prev => ({ ...prev, cv: null }));
            }
        }
    };

    // Fungsi validasi per langkah
    const validateStep = () => {
        const newErrors = {};
        switch (step) {
            case 1:
                if (!formData.fullName) newErrors.fullName = 'Nama lengkap wajib diisi.';
                if (!formData.email) newErrors.email = 'Email wajib diisi.';
                else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid.';
                if (!formData.phone) newErrors.phone = 'Nomor telepon wajib diisi.';
                if (!formData.dob) newErrors.dob = 'Tanggal lahir wajib diisi.';
                if (!formData.address) newErrors.address = 'Alamat wajib diisi.';
                break;
            case 2:
                if (!formData.university) newErrors.university = 'Universitas wajib diisi.';
                if (!formData.major) newErrors.major = 'Jurusan wajib diisi.';
                break;
            case 3:
                if (!formData.motivation) newErrors.motivation = 'Motivasi wajib diisi.';
                if (!formData.commitment) newErrors.commitment = 'Komitmen wajib diisi.';
                break;
            case 4:
                if (!formData.division) newErrors.division = 'Pilihan divisi wajib diisi.';
                break;
            case 5:
                // Validasi CV bisa ditambahkan di sini jika CV wajib
                // if (!formData.cv) newErrors.cv = 'CV wajib diunggah.';
                break;
            case 6:
                if (!formData.agreement) newErrors.agreement = 'Anda harus menyetujui pernyataan ini.';
                break;
            default:
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fungsi untuk ke langkah selanjutnya
    const nextStep = () => {
        if (validateStep()) {
            if (step < totalSteps) {
                setStep(step + 1);
                window.scrollTo(0, 0);
            }
        }
    };

    // Fungsi untuk ke langkah sebelumnya
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    // Fungsi untuk submit formulir
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
            // Logika pengiriman formulir (misalnya ke API)
            console.log("Formulir Dikirim:", formData);
            
            // Tampilkan halaman konfirmasi
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        }
    };

    // Tampilkan konfirmasi jika sudah submit
    if (isSubmitted) {
        return (
             <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">
                            <Confirmation />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render formulir
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">
                        
                        {/* Header Utama */}
                        <div className="text-center mb-4">
                            <h1 className="h2 font-weight-bold text-dark">
                                Form Pendaftaran Volunteer
                            </h1>
                            <p className="text-muted">
                                Terima kasih atas minat Anda untuk bergabung.
                            </p>
                        </div>

                        {/* Indikator Langkah */}
                        <StepIndicator currentStep={step} totalSteps={totalSteps} stepTitles={stepTitles} />

                        {/* Konten Formulir per Langkah */}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="p-3">
                                {step === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
                                {step === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
                                {step === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors} />}
                                {step === 4 && <Step4 formData={formData} handleChange={handleChange} errors={errors} />}
                                {step === 5 && <Step5 handleFileChange={handleFileChange} errors={errors} cvFileName={formData.cv ? formData.cv.name : ''} />}
                                {step === 6 && <Step6 formData={formData} handleChange={handleChange} errors={errors} />}
                            </div>

                            {/* Tombol Navigasi */}
                            <div className="d-flex justify-content-between mt-5">
                                {step > 1 && (
                                    <button type="button" className="btn btn-light" onClick={prevStep}>
                                        Kembali
                                    </button>
                                )}
                                {step < totalSteps && (
                                    <button type="button" className="btn btn-primary ms-auto" onClick={nextStep}>
                                        Selanjutnya
                                    </button>
                                )}
                                {step === totalSteps && (
                                    <button type="submit" className="btn btn-success ms-auto">
                                        Kirim Pendaftaran
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}