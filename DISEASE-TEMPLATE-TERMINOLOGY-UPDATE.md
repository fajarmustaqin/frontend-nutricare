# Disease Template Terminology Update

## 🎯 **Change Request**
Update kosa kata dari "template diet per penyakit" menjadi "kebutuhan kalori atau gizi setiap jenis pasien".

## 📝 **Terminology Changes**

### **Before (Old Terminology):**
- ❌ "Template Diet per Penyakit"
- ❌ "Disease Templates"
- ❌ "Template Penyakit"
- ❌ "Buat Template Penyakit Baru"
- ❌ "Template Kalori Mingguan"

### **After (New Terminology):**
- ✅ "Kebutuhan Kalori & Gizi per Jenis Pasien"
- ✅ "Kebutuhan Gizi Pasien"
- ✅ "Kebutuhan Gizi"
- ✅ "Buat Kebutuhan Gizi Pasien Baru"
- ✅ "Kebutuhan Kalori Mingguan"

## 📁 **Files Updated**

### **1. AdminDiseaseTemplate.js**
**Changes Made:**
- **Page Title:** `🦠 Template Diet per Penyakit` → `🦠 Kebutuhan Kalori & Gizi per Jenis Pasien`
- **Breadcrumb:** `Disease Templates` → `Kebutuhan Gizi Pasien`
- **Button Text:** `Template Baru` → `Kebutuhan Gizi Baru`
- **Card Header:** `templates` → `kebutuhan gizi`
- **Modal Title:** `Edit Disease Template` → `Edit Kebutuhan Gizi Pasien`
- **Modal Title:** `Buat Template Penyakit Baru` → `Buat Kebutuhan Gizi Pasien Baru`
- **Section Title:** `Template Kalori Mingguan` → `Kebutuhan Kalori Mingguan`
- **Button Text:** `Update Template` → `Update Kebutuhan Gizi`
- **Button Text:** `Buat Template` → `Buat Kebutuhan Gizi`

### **2. AdminDashboard.js**
**Changes Made:**
- **Quick Action Title:** `Buat Template Penyakit` → `Kebutuhan Gizi Pasien`
- **Quick Action Description:** `Tambah template diet untuk penyakit baru` → `Kelola kebutuhan kalori dan gizi setiap jenis pasien`
- **Quick Action Button:** `Buat Template` → `Kelola Gizi`
- **Stats Card:** `Template Penyakit` → `Kebutuhan Gizi`
- **Navigation Guide:** `Template Penyakit: Buat template diet per penyakit` → `Kebutuhan Gizi Pasien: Kelola kebutuhan kalori dan gizi setiap jenis pasien`
- **Overview Stats:** `Disease Templates` → `Kebutuhan Gizi`

### **3. AdminSidebar.js**
**Changes Made:**
- **Menu Title:** `Template Penyakit` → `Kebutuhan Gizi Pasien`

## 🎯 **Impact**

### **User Experience:**
- **More Intuitive:** Terminology lebih mudah dipahami oleh admin
- **Clearer Purpose:** Fokus pada "kebutuhan gizi" daripada "template diet"
- **Better Context:** Menekankan pada "jenis pasien" daripada "penyakit"

### **Consistency:**
- **Unified Language:** Semua referensi menggunakan terminology yang sama
- **Professional Tone:** Bahasa yang lebih profesional dan medis
- **Clear Functionality:** Tujuan fitur lebih jelas

## 🧪 **Testing**

### **Check Updated Pages:**
1. **Admin Dashboard:** `http://localhost:3000/admin/dashboard`
   - ✅ Quick action "Kebutuhan Gizi Pasien"
   - ✅ Stats card "Kebutuhan Gizi"
   - ✅ Navigation guide updated

2. **Admin Sidebar:** All admin pages
   - ✅ Menu "Kebutuhan Gizi Pasien"

3. **Disease Template Page:** `http://localhost:3000/admin/disease-template`
   - ✅ Page title "Kebutuhan Kalori & Gizi per Jenis Pasien"
   - ✅ Breadcrumb "Kebutuhan Gizi Pasien"
   - ✅ Button "Kebutuhan Gizi Baru"
   - ✅ Modal titles updated
   - ✅ Section titles updated

## 🎉 **Result**

**Before:** ❌ Confusing terminology "template diet per penyakit"  
**After:** ✅ Clear terminology "kebutuhan kalori dan gizi setiap jenis pasien"

---

**Status:** ✅ Complete  
**All terminology updated consistently across admin interface**
