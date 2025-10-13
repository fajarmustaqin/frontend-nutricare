# 🔧 Fix White Screen Issue - NutriCare

## Masalah yang Terjadi
Layar putih (blank white screen) setelah refresh atau saat navigasi.

## Penyebab Utama
1. ❌ **Missing .env file** - Environment variables tidak terdefinisi
2. 🔄 **Infinite loop di useEffect** - Navigation loop di App.js
3. 🐛 **Error tidak ter-catch** - Tidak ada error boundary

## ✅ Solusi yang Sudah Diterapkan

### 1. **Create .env File** (PENTING!)
Buat file `.env` di root folder `front-end-nutricare/`:

```env
REACT_APP_API_URL=http://localhost:8080
```

**Lokasi file:**
```
front-end-nutricare/
├── .env          <-- BUAT FILE INI!
├── package.json
├── src/
└── public/
```

### 2. **Fixed App.js**
- ✅ Menambahkan `useRef` untuk prevent infinite redirect loop
- ✅ Menambahkan `useLocation` untuk tracking current path
- ✅ Menambahkan proper dependencies di useEffect
- ✅ Menambahkan loading state saat redirect
- ✅ Menambahkan `replace: true` untuk avoid back button issues

### 3. **Added Error Boundary**
- ✅ Created `ErrorBoundary.js` component
- ✅ Wrapped entire app with ErrorBoundary
- ✅ Shows friendly error message instead of white screen
- ✅ Shows detailed error in development mode

### 4. **Added Environment Variable Checker**
- ✅ Created `envCheck.js` helper
- ✅ Logs environment status on startup
- ✅ Shows warning if .env is missing

## 🚀 Langkah-langkah untuk Fix

### Step 1: Stop Development Server
```bash
# Press Ctrl+C di terminal yang running `npm start`
```

### Step 2: Create .env File
```bash
# Di folder front-end-nutricare/
# Windows:
echo REACT_APP_API_URL=http://localhost:8080 > .env

# Mac/Linux:
echo "REACT_APP_API_URL=http://localhost:8080" > .env
```

### Step 3: Clear Cache & Restart
```bash
# Di folder front-end-nutricare/
npm run build
rm -rf node_modules/.cache   # Mac/Linux
# atau
rmdir /s node_modules\.cache  # Windows

# Restart dev server
npm start
```

### Step 4: Test di Browser
1. Buka browser: http://localhost:3000
2. Buka **DevTools Console** (F12)
3. Cek ada message: `🚀 Starting NutriCare Application...`
4. Cek ada message: `✅ REACT_APP_API_URL: http://localhost:8080`

## 🔍 Debugging Tips

### Jika Masih White Screen:

**1. Check Browser Console (F12)**
```
Look for:
- Red error messages
- Missing environment variables warning
- Network errors (Failed to fetch)
```

**2. Check React DevTools**
```
- Install React DevTools extension
- Check which component is rendering
- Look for error states
```

**3. Check .env File Location**
```bash
# Pastikan .env ada di folder yang benar
ls -la front-end-nutricare/.env    # Mac/Linux
dir front-end-nutricare\.env       # Windows
```

**4. Verify Environment Variables**
```javascript
// Di browser console, run:
console.log(process.env.REACT_APP_API_URL)
// Should show: http://localhost:8080
```

## 📋 Checklist Troubleshooting

- [ ] File `.env` sudah dibuat di `front-end-nutricare/` (bukan di `src/`)
- [ ] Dev server sudah di-restart setelah create .env
- [ ] Browser console tidak ada error merah
- [ ] Backend API sudah running di port 8080
- [ ] Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Clear node cache: `rm -rf node_modules/.cache`

## 🎯 Testing Scenarios

### Test 1: Normal User Login
1. Go to http://localhost:3000
2. Click "Masuk" or go to /sign-in
3. Login dengan user credentials
4. Should see HomeLogin component
5. Refresh page (F5)
6. Should stay on same page (not white screen)

### Test 2: Admin Login
1. Go to http://localhost:3000/admin
2. Login dengan admin credentials
3. Should redirect to /admin/dashboard
4. Refresh page (F5)
5. Should stay on dashboard (not white screen)

### Test 3: Guest Access
1. Open incognito/private window
2. Go to http://localhost:3000
3. Should see HomeGuest component
4. Refresh page (F5)
5. Should stay on HomeGuest (not white screen)

## 📝 Files Modified

### New Files:
- ✅ `src/components/ErrorBoundary.js` - Error catcher
- ✅ `src/helpers/envCheck.js` - Environment checker
- ✅ `.env` - Environment variables (YOU NEED TO CREATE THIS!)

### Modified Files:
- ✅ `src/App.js` - Fixed infinite loop & navigation
- ✅ `src/index.js` - Added ErrorBoundary & env check
- ✅ All admin pages - Fixed useEffect dependencies

## 🆘 Masih Error?

Jika masih ada masalah, cek:

1. **Console Error Message**
   ```bash
   # Screenshot error di browser console
   # Share error message
   ```

2. **Network Tab**
   ```
   F12 > Network tab
   - Cek ada failed requests?
   - Status code 404/500?
   ```

3. **Backend Status**
   ```bash
   # Pastikan backend running:
   cd back-end-nutricare
   npm start
   
   # Should see: Server running on port 8080
   ```

4. **Port Conflicts**
   ```bash
   # Check if port 3000 or 8080 already used
   # Windows:
   netstat -ano | findstr :3000
   netstat -ano | findstr :8080
   
   # Mac/Linux:
   lsof -i :3000
   lsof -i :8080
   ```

## 📞 Contact

Jika masih ada issue, please provide:
1. Screenshot browser console (F12)
2. Screenshot terminal error
3. File `.env` content (censored if needed)
4. Output dari: `npm start`

---

## Summary Fix
**Main Issue:** Missing `.env` file + navigation loop
**Main Solution:** Create `.env` + fix App.js useEffect
**Result:** No more white screen! 🎉

