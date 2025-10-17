# 🏥 NutriCare Admin System Flow Guide

## 🎯 **Overview Sistem Admin**
Sistem admin NutriCare adalah platform manajemen untuk mengelola data makanan, kebutuhan gizi pasien, dan rencana diet. Berikut adalah flow lengkap cara mengoperasikan sistem.

---

## 🚀 **1. LOGIN ADMIN**

### **Akses Login:**
- **URL:** `http://localhost:3000/admin`
- **Email:** `admin@admin.com`
- **Password:** `admin123`

### **Flow Login:**
1. Masuk ke halaman admin
2. Input email dan password
3. Klik "Login"
4. Otomatis redirect ke Dashboard

---

## 📊 **2. DASHBOARD ADMIN**

### **URL:** `http://localhost:3000/admin/dashboard`

### **Fitur Dashboard:**
- **📈 Statistics Cards:** Total pasien, makanan, kebutuhan gizi, plans aktif, resep
- **⚡ Quick Actions:** 4 tombol aksi cepat
- **🔧 System Status:** Status database, API, frontend
- **📋 Navigation Guide:** Panduan fitur-fitur

### **Quick Actions:**
1. **🦠 Kebutuhan Gizi Pasien** → `/admin/disease-template`
2. **👤 Assign ke Pasien** → `/admin/patient-assignment`
3. **🍽️ Tambah Makanan** → `/admin/foods`
4. **📖 Manajemen Resep** → `/admin/resep-management`

---

## 🍽️ **3. KELOLA MAKANAN (AdminFoodManagement)**

### **URL:** `http://localhost:3000/admin/foods`

### **Fungsi:**
- **CRUD Makanan:** Create, Read, Update, Delete data makanan
- **Upload Gambar:** Upload foto makanan
- **Data Nutrisi:** Kalori, karbohidrat, protein, lemak, karbon

### **Flow Operasi:**
1. **Lihat Data Makanan:** Tabel dengan semua makanan
2. **Tambah Makanan Baru:**
   - Klik "Tambah Makanan"
   - Isi form: nama, kalori, karbohidrat, protein, lemak, karbon
   - Upload gambar (optional)
   - Klik "Simpan"
3. **Edit Makanan:**
   - Klik tombol "Edit" di tabel
   - Ubah data yang diperlukan
   - Klik "Update"
4. **Hapus Makanan:**
   - Klik tombol "Delete"
   - Konfirmasi penghapusan

### **Data yang Diisi:**
- **Makanan:** Nama makanan
- **Kalori Makanan:** Kalori per porsi
- **Karbohidrat:** Gram karbohidrat
- **Protein:** Gram protein
- **Lemak:** Gram lemak
- **Karbon:** Karbon footprint
- **Porsi:** Ukuran porsi
- **Penyetaraan Porsi:** Konversi porsi

---

## 🦠 **4. KEBUTUHAN GIZI PASIEN (AdminDiseaseTemplate)**

### **URL:** `http://localhost:3000/admin/disease-template`

### **Fungsi:**
- **Buat Template Gizi:** Kebutuhan kalori dan gizi per jenis pasien
- **Kategori Penyakit:** Metabolik, Kardiovaskular, Ginjal, dll
- **Template Mingguan:** Kalori per kg berat badan per hari

### **Flow Operasi:**
1. **Lihat Template Gizi:** Dikelompokkan per kategori penyakit
2. **Buat Template Baru:**
   - Klik "Kebutuhan Gizi Baru"
   - Isi data penyakit: nama, kode ICD, kategori, tingkat keparahan
   - Isi deskripsi penyakit
   - Set template mingguan (kalori per kg, persentase makronutrien)
   - Klik "Buat Kebutuhan Gizi"
3. **Edit Template:**
   - Klik "Edit" di template yang ada
   - Ubah data yang diperlukan
   - Klik "Update Kebutuhan Gizi"
4. **Hapus Template:**
   - Klik "Delete"
   - Konfirmasi penghapusan

### **Data Template Mingguan:**
- **Hari:** Senin - Minggu
- **Kalori/kg:** Kalori per kg berat badan
- **Karbo %:** Persentase karbohidrat
- **Protein %:** Persentase protein
- **Lemak %:** Persentase lemak
- **Catatan Medis:** Catatan khusus per hari

---

## 👤 **5. ASSIGNMENT PASIEN (AdminPatientAssignment)**

### **URL:** `http://localhost:3000/admin/patient-assignment`

### **Fungsi:**
- **Assign Template:** Berikan template gizi ke pasien
- **Buat Weekly Plan:** Rencana diet mingguan untuk pasien
- **Monitor Assignment:** Lihat pasien yang sudah di-assign

### **Flow Operasi:**
1. **Pilih Template Gizi:**
   - Pilih template dari dropdown
   - Lihat detail template yang dipilih
2. **Pilih Pasien:**
   - Pilih satu atau lebih pasien
   - Lihat data pasien (nama, berat badan, dll)
3. **Set Info Minggu:**
   - Minggu ke berapa
   - Tahun
   - Tanggal mulai dan selesai
4. **Assign:**
   - Klik "Assign Template ke Pasien"
   - Konfirmasi assignment
   - Otomatis buat weekly plan

### **Data Assignment:**
- **Template:** Template gizi yang dipilih
- **Pasien:** Daftar pasien yang dipilih
- **Minggu:** Minggu ke berapa
- **Tahun:** Tahun assignment
- **Tanggal:** Tanggal mulai dan selesai

---

## 📅 **6. MONITOR DIET PLANS (AdminWeeklyPlan)**

### **URL:** `http://localhost:3000/admin/weekly-plan`

### **Fungsi:**
- **Lihat Weekly Plans:** Semua rencana diet mingguan
- **Edit Plans:** Ubah rencana diet yang sudah dibuat
- **Monitor Status:** Lihat status plans (aktif, selesai, dll)

### **Flow Operasi:**
1. **Lihat Plans:**
   - Tabel dengan semua weekly plans
   - Filter berdasarkan pasien, minggu, tahun
2. **Edit Plan:**
   - Klik "Edit" di plan yang ada
   - Ubah data yang diperlukan
   - Klik "Update Plan"
3. **Lihat Detail:**
   - Klik "View Details" untuk lihat detail plan
   - Lihat rencana harian, catatan, dll

### **Data Weekly Plan:**
- **User ID:** ID pasien
- **Minggu Ke:** Minggu ke berapa
- **Tahun:** Tahun plan
- **Tanggal:** Tanggal mulai dan selesai
- **Catatan:** Catatan khusus
- **Plan Harian:** Rencana per hari

---

## 📖 **7. MANAJEMEN RESEP (AdminResepManagement)**

### **URL:** `http://localhost:3000/admin/resep-management`

### **Fungsi:**
- **CRUD Resep:** Create, Read, Update, Delete resep
- **Link dengan Makanan:** Resep terkait dengan data makanan
- **Kategori Resep:** Mudah, Sedang, Sulit

### **Flow Operasi:**
1. **Lihat Resep:**
   - Tabel dengan semua resep
   - Filter berdasarkan tingkat kesulitan
2. **Tambah Resep:**
   - Klik "Tambah Resep"
   - Pilih makanan dari dropdown
   - Isi nama resep, deskripsi, langkah-langkah
   - Set waktu persiapan dan tingkat kesulitan
   - Klik "Simpan"
3. **Edit Resep:**
   - Klik "Edit" di resep yang ada
   - Ubah data yang diperlukan
   - Klik "Update"
4. **Hapus Resep:**
   - Klik "Delete"
   - Konfirmasi penghapusan

### **Data Resep:**
- **Makanan:** Makanan yang terkait
- **Nama Resep:** Nama resep
- **Deskripsi:** Deskripsi resep
- **Langkah-langkah:** Cara membuat
- **Waktu Persiapan:** Waktu dalam menit
- **Tingkat Kesulitan:** Mudah/Sedang/Sulit

---

## 🔄 **FLOW SISTEM LENGKAP**

### **Urutan Operasi yang Disarankan:**

#### **1. Setup Awal (Sekali):**
```
1. Login Admin
2. Kelola Makanan → Tambah data makanan
3. Kebutuhan Gizi Pasien → Buat template gizi
4. Manajemen Resep → Buat resep
```

#### **2. Operasi Harian:**
```
1. Login Admin
2. Dashboard → Lihat statistik
3. Assignment Pasien → Assign template ke pasien baru
4. Monitor Diet Plans → Monitor dan edit plans
```

#### **3. Maintenance:**
```
1. Kelola Makanan → Update/tambah makanan
2. Kebutuhan Gizi Pasien → Update template
3. Manajemen Resep → Update/tambah resep
```

---

## 🎯 **TIPS OPERASI**

### **✅ Best Practices:**
1. **Selalu login dulu** sebelum mengakses fitur admin
2. **Setup data dasar** (makanan, template gizi) sebelum assign pasien
3. **Monitor weekly plans** secara berkala
4. **Backup data** penting secara berkala

### **⚠️ Perhatian:**
1. **Template gizi** harus dibuat sebelum assign ke pasien
2. **Data makanan** harus lengkap sebelum buat resep
3. **Assignment** akan otomatis buat weekly plan
4. **Hapus data** tidak bisa di-undo

### **🔧 Troubleshooting:**
1. **Login gagal:** Cek email/password, pastikan backend running
2. **Data tidak muncul:** Refresh halaman, cek koneksi
3. **Error saat save:** Cek semua field required sudah diisi
4. **Gambar tidak upload:** Cek ukuran file, format yang didukung

---

## 📱 **NAVIGATION**

### **Sidebar Menu:**
- **🏠 Dashboard** → Overview sistem
- **🍽️ Kelola Makanan** → CRUD makanan
- **🦠 Kebutuhan Gizi Pasien** → Template gizi
- **👤 Assignment Pasien** → Assign template
- **📅 Monitor Diet Plans** → Lihat/edit plans
- **📖 Manajemen Resep** → CRUD resep

### **Quick Actions (Dashboard):**
- **Kelola Gizi** → Langsung ke template gizi
- **Assign Now** → Langsung ke assignment
- **Add Food** → Langsung ke kelola makanan
- **Manage Resep** → Langsung ke manajemen resep

---

**🎉 Sistem admin NutriCare siap digunakan!**

**📞 Support:** Jika ada masalah, cek console browser untuk error details.
