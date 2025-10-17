# 🏥 NutriCare Admin - Flow Sederhana

## 🎯 **CARA MENGGUNAKAN SISTEM ADMIN**

### **1. LOGIN ADMIN** 🔐
```
URL: http://localhost:3000/admin
Email: admin@admin.com
Password: admin123
```

### **2. DASHBOARD** 📊
```
URL: http://localhost:3000/admin/dashboard
Fungsi: Lihat statistik dan quick actions
```

---

## 🔄 **FLOW OPERASI SISTEM**

### **STEP 1: SETUP DATA DASAR** (Lakukan sekali)

#### **A. Kelola Makanan** 🍽️
```
URL: http://localhost:3000/admin/foods
Tujuan: Tambah data makanan ke database
```
**Yang dilakukan:**
1. Klik "Tambah Makanan"
2. Isi: nama, kalori, karbohidrat, protein, lemak
3. Upload gambar (optional)
4. Klik "Simpan"

#### **B. Kebutuhan Gizi Pasien** 🦠
```
URL: http://localhost:3000/admin/disease-template
Tujuan: Buat template kebutuhan gizi per jenis pasien
```
**Yang dilakukan:**
1. Klik "Kebutuhan Gizi Baru"
2. Isi: nama penyakit, kategori, tingkat keparahan
3. Set template mingguan (kalori per kg, persentase gizi)
4. Klik "Buat Kebutuhan Gizi"

#### **C. Manajemen Resep** 📖
```
URL: http://localhost:3000/admin/resep-management
Tujuan: Buat resep makanan
```
**Yang dilakukan:**
1. Klik "Tambah Resep"
2. Pilih makanan dari dropdown
3. Isi: nama resep, deskripsi, langkah-langkah
4. Set waktu persiapan dan tingkat kesulitan
5. Klik "Simpan"

---

### **STEP 2: OPERASI HARIAN** (Lakukan setiap ada pasien baru)

#### **Assignment Pasien** 👤
```
URL: http://localhost:3000/admin/patient-assignment
Tujuan: Berikan template gizi ke pasien
```
**Yang dilakukan:**
1. Pilih template gizi dari dropdown
2. Pilih pasien yang akan di-assign
3. Set info minggu (minggu ke berapa, tahun, tanggal)
4. Klik "Assign Template ke Pasien"

**Hasil:** Otomatis buat weekly plan untuk pasien

#### **Monitor Diet Plans** 📅
```
URL: http://localhost:3000/admin/weekly-plan
Tujuan: Lihat dan edit rencana diet pasien
```
**Yang dilakukan:**
1. Lihat semua weekly plans
2. Edit plan jika diperlukan
3. Monitor status plans

---

## 🎯 **URUTAN YANG BENAR**

### **Untuk Admin Baru:**
```
1. Login Admin
2. Kelola Makanan → Tambah makanan
3. Kebutuhan Gizi Pasien → Buat template gizi
4. Manajemen Resep → Buat resep
5. Assignment Pasien → Assign template ke pasien
6. Monitor Diet Plans → Monitor plans
```

### **Untuk Operasi Harian:**
```
1. Login Admin
2. Dashboard → Lihat statistik
3. Assignment Pasien → Assign pasien baru
4. Monitor Diet Plans → Monitor plans
```

---

## 📋 **CHECKLIST OPERASI**

### **Setup Awal (Sekali):**
- [ ] Login admin berhasil
- [ ] Tambah minimal 10 makanan
- [ ] Buat minimal 3 template gizi
- [ ] Buat minimal 5 resep

### **Operasi Harian:**
- [ ] Login admin
- [ ] Cek dashboard statistik
- [ ] Assign template ke pasien baru
- [ ] Monitor weekly plans

### **Maintenance:**
- [ ] Update data makanan jika perlu
- [ ] Update template gizi jika perlu
- [ ] Update resep jika perlu

---

## ⚠️ **PENTING DIPERHATIKAN**

### **Sebelum Assignment:**
- ✅ Template gizi sudah dibuat
- ✅ Data makanan sudah ada
- ✅ Pasien sudah terdaftar di sistem

### **Setelah Assignment:**
- ✅ Weekly plan otomatis terbuat
- ✅ Cek di Monitor Diet Plans
- ✅ Edit jika diperlukan

### **Troubleshooting:**
- **Login gagal:** Cek email/password
- **Data tidak muncul:** Refresh halaman
- **Error save:** Cek field required
- **Assignment gagal:** Cek template dan pasien sudah ada

---

## 🚀 **QUICK START**

### **5 Menit Setup:**
1. Login admin
2. Tambah 5 makanan
3. Buat 2 template gizi
4. Buat 3 resep
5. Siap untuk assignment!

### **Assignment Pasien:**
1. Pilih template gizi
2. Pilih pasien
3. Set minggu
4. Klik assign
5. Done!

---

**🎉 Sistem admin siap digunakan!**

**📞 Butuh bantuan? Cek console browser untuk error details.**
