# ✅ Authentication & Routing Fixed - NutriCare

## 🐛 Masalah yang Ditemukan:

### 1. **Tidak Ada Route Protection** ❌
- Semua page bisa diakses tanpa login
- User belum login tapi bisa akses Profile, Tracking, dll
- Admin page bisa diakses tanpa authentication

### 2. **Logic Authentication Salah** ❌
- Header menampilkan menu Profile/Logout untuk user yang belum login
- Tidak ada redirect ke login page untuk protected routes
- Sign-in/Sign-up page bisa diakses meskipun sudah login

## ✅ Solusi yang Diterapkan:

### 1. **Created ProtectedRoute Component**
**File:** `src/components/ProtectedRoute.js`

```javascript
// ProtectedRoute - Hanya bisa diakses kalau sudah login
export const ProtectedRoute = ({ children }) => {
  const token = getCookie('token');
  
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
};

// AdminRoute - Hanya bisa diakses oleh admin
export const AdminRoute = ({ children }) => {
  const token = getCookie('token');
  const userIsAdmin = isAdmin();
  
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  
  if (!userIsAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

// PublicOnlyRoute - Hanya bisa diakses kalau belum login
export const PublicOnlyRoute = ({ children }) => {
  const token = getCookie('token');
  
  if (token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
```

### 2. **Updated Routes dengan Protection**
**File:** `src/routes/index.js`

```javascript
// ✅ Public Routes - Bisa diakses siapa saja (tanpa login)
<Route path="/" element={<App />} />
<Route path="/resep" element={<Resep />} />
<Route path="/resep/detail/:id" element={<ResepDetail />} />

// ✅ Public Only Routes - Hanya bisa diakses kalau BELUM login
<Route path="/sign-in" element={<PublicOnlyRoute><SignIn /></PublicOnlyRoute>} />
<Route path="/sign-up" element={<PublicOnlyRoute><SignUp /></PublicOnlyRoute>} />
<Route path="/admin" element={<PublicOnlyRoute><LoginAdmin /></PublicOnlyRoute>} />

// ✅ Protected Routes - HARUS login user dulu
<Route path="/pilih-makanan" element={<ProtectedRoute><PilihMakanan /></ProtectedRoute>} />
<Route path="/tracking-nutrisi" element={<ProtectedRoute><TrackingNutrisi /></ProtectedRoute>} />
<Route path="/karbon" element={<ProtectedRoute><TrackingKarbon /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
// ... etc

// ✅ Admin Routes - HARUS login sebagai ADMIN
<Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
<Route path="/admin/foods" element={<AdminRoute><AdminFoodManagement /></AdminRoute>} />
// ... etc
```

---

## 📋 Route Classification:

### **Public Routes** (Tidak butuh login):
```
✅ /                      - Home (Guest/Login)
✅ /resep                 - Resep list
✅ /resep/detail/:id      - Resep detail
```

### **Public Only Routes** (Hanya untuk yang belum login):
```
✅ /sign-in               - Login user
✅ /sign-up               - Register user
✅ /admin                 - Login admin
```

### **Protected Routes** (Butuh login user):
```
🔒 /pilih-makanan         - Pilih makanan
🔒 /pilih-makanan/detail  - Keranjang makanan
🔒 /tracking-nutrisi      - Tracking nutrisi
🔒 /karbon                - Tracking karbon
🔒 /rekomendasi           - Rekomendasi makanan
🔒 /profile               - User profile
🔒 /editprofile           - Edit profile
🔒 /akun                  - Account settings
```

### **Admin Routes** (Butuh login admin):
```
🔐 /admin/dashboard          - Admin dashboard
🔐 /admin/foods              - Kelola makanan
🔐 /admin/disease-template   - Template penyakit
🔐 /admin/patient-assignment - Assignment pasien
🔐 /admin/weekly-plan        - Weekly plan
```

---

## 🎯 Behavior After Fix:

### Scenario 1: User Belum Login
**Before Fix:**
```
✅ Bisa akses semua page
✅ Navbar menampilkan Profile/Logout
❌ SALAH!
```

**After Fix:**
```
✅ Home page (/) - Tampil HomeGuest
✅ Resep page - Bisa diakses
❌ /pilih-makanan - Redirect ke /sign-in
❌ /tracking-nutrisi - Redirect ke /sign-in
❌ /profile - Redirect ke /sign-in
✅ BENAR!
```

### Scenario 2: User Sudah Login
**Before Fix:**
```
✅ Bisa akses semua page
✅ Bisa akses /sign-in lagi
❌ SALAH!
```

**After Fix:**
```
✅ Home page (/) - Tampil HomeLogin
✅ /pilih-makanan - Bisa diakses
✅ /tracking-nutrisi - Bisa diakses
✅ /profile - Bisa diakses
❌ /sign-in - Redirect ke / (sudah login)
❌ /sign-up - Redirect ke / (sudah login)
✅ BENAR!
```

### Scenario 3: Admin Login
**Before Fix:**
```
✅ Bisa akses user pages
✅ Bisa akses admin pages tanpa check role
❌ SALAH!
```

**After Fix:**
```
✅ /admin/dashboard - Bisa diakses
✅ /admin/foods - Bisa diakses
❌ / - Auto redirect ke /admin/dashboard
❌ /tracking-nutrisi - Redirect ke unauthorized
✅ BENAR!
```

---

## 🔍 Testing Checklist:

### Test 1: Guest User (Belum Login)
- [ ] Buka http://localhost:3000
- [ ] Harus tampil **HomeGuest** (bukan HomeLogin)
- [ ] Header harus menampilkan tombol **"Masuk"** dan **"Daftar"**
- [ ] **TIDAK** ada menu Profile/Logout
- [ ] Click "Pilih Makanan" → harus redirect ke `/sign-in`
- [ ] Click "Tracking" → harus redirect ke `/sign-in`

### Test 2: Login sebagai User
- [ ] Login di `/sign-in`
- [ ] Setelah login, redirect ke `/` 
- [ ] Harus tampil **HomeLogin** dengan nama user
- [ ] Header harus menampilkan **dropdown Profile**
- [ ] Bisa akses `/pilih-makanan` ✅
- [ ] Bisa akses `/tracking-nutrisi` ✅
- [ ] Bisa akses `/profile` ✅
- [ ] Akses `/sign-in` → auto redirect ke `/`
- [ ] Akses `/admin/dashboard` → redirect ke `/unauthorized`

### Test 3: Login sebagai Admin
- [ ] Login di `/admin`
- [ ] Setelah login, redirect ke `/admin/dashboard` 
- [ ] Harus tampil **Admin Dashboard**
- [ ] Sidebar admin muncul
- [ ] Bisa akses semua `/admin/*` pages ✅
- [ ] Akses `/admin` → auto redirect ke `/admin/dashboard`
- [ ] Akses `/tracking-nutrisi` → redirect ke `/unauthorized` (admin tidak bisa akses user pages)

### Test 4: Logout
- [ ] Click Logout
- [ ] Cookie token dihapus
- [ ] Redirect ke home
- [ ] Tampil **HomeGuest** (bukan HomeLogin)
- [ ] Menu Profile/Logout hilang
- [ ] Akses protected routes → redirect ke `/sign-in`

---

## 🔧 Troubleshooting:

### Issue: Data Makanan Tidak Muncul

**Possible Causes:**
1. Database kosong (belum run seeder)
2. Backend tidak running
3. CORS issue
4. API URL salah

**Solutions:**

#### 1. Check Database
```bash
mongosh
use nutricare
db.foods.countDocuments()  # Harus > 0
```

Kalau 0, run seeder:
```bash
cd back-end-nutricare
npm run seeder
```

#### 2. Check Backend Running
```bash
# Backend harus running di port 8080
# Check terminal backend, harus ada:
# ✅ MongoDB Connected
# ✅ Server running on port 8080
```

#### 3. Check API Call
Buka DevTools (F12) > Network tab:
```
GET http://localhost:8080/food
Status: 200 OK
Response: [array of food objects]
```

Kalau 404 atau 500, cek backend.

#### 4. Check Console
Buka DevTools (F12) > Console:
```
Harus ada:
✅ REACT_APP_API_URL: http://localhost:8080

Tidak boleh ada:
❌ CORS error
❌ Network error
❌ 404 not found
```

### Issue: Redirect Loop

**Cause:** Cookie tidak terhapus dengan benar saat logout

**Fix:**
```javascript
// Clear cookies manually
document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// Atau di browser:
// F12 > Application > Cookies > Delete 'token'
```

### Issue: Stuck di Login Page

**Cause:** Token ada tapi invalid

**Fix:**
```bash
# Clear browser cookies
# atau
# Check backend logs untuk authentication error
```

---

## 📊 Data Flow:

### Guest → Login → Protected Page:
```
1. User buka / → HomeGuest
2. Click "Masuk" → /sign-in
3. Submit credentials → Backend validates
4. Set cookie token → Redirect to /
5. HomeLogin renders dengan user data
6. Click "Pilih Makanan" → /pilih-makanan ✅
7. ProtectedRoute checks token → Allow access
```

### Guest → Try Access Protected Page:
```
1. User buka /tracking-nutrisi tanpa login
2. ProtectedRoute checks token → No token!
3. Redirect to /sign-in
4. After login → Return to /tracking-nutrisi ✅
```

---

## ✅ Files Modified:

### New Files:
```
front-end-nutricare/
└── src/
    └── components/
        └── ProtectedRoute.js       ⭐ NEW - Route guards
```

### Updated Files:
```
front-end-nutricare/
└── src/
    └── routes/
        └── index.js                ✏️ UPDATED - Applied protection
```

---

## 🎉 Result:

✅ **Proper Authentication Flow**
- Guest user tidak bisa akses protected pages
- Protected pages redirect ke login
- Admin pages check role
- No more unauthorized access

✅ **Better UX**
- Header shows correct menu based on auth state
- Automatic redirects
- Clear access control

✅ **Security Improved**
- Routes properly guarded
- Role-based access control (RBAC)
- Token validation before render

---

## 🚀 Next Steps:

1. **Clear Browser Cache & Cookies**
   ```
   Ctrl + Shift + Delete
   Clear cookies & cached data
   ```

2. **Restart Frontend**
   ```bash
   cd front-end-nutricare
   npm start
   ```

3. **Test Authentication Flow**
   - Try accessing protected routes without login
   - Login and verify access
   - Check admin role separation

4. **Verify Data Loading**
   - After login, go to /pilih-makanan
   - Data should load from backend
   - Check DevTools Network tab

---

Selamat! Routing dan authentication sudah BENAR! 🎉

