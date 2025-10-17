# Edit Profile Select Element Fix

## 🐛 **Problem**
Form validation error karena field "Aktivitas Fisik" tidak terisi, meskipun ada `defaultValue`.

```
Form validation errors: {aktivitasFisik: {…}}
aktivitasFisik: {type: 'required', message: 'Aktivitas Fisik tidak boleh kosong', ref: select#aktivitasFisik.form-control}
```

## 🔍 **Root Cause**
`defaultValue` tidak bekerja dengan baik untuk select element di React Hook Form. Select element tidak ter-populate dengan data dari database.

## ✅ **Solution**

### **1. Added `watch` to useForm**
```javascript
const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
```

### **2. Fixed Select Element with Controlled Component**
```javascript
// BEFORE: defaultValue (not working)
<select
    defaultValue={User?.aktivitasFisik?.nilai || ""}
    {...register("aktivitasFisik", {
        required: "Aktivitas Fisik tidak boleh kosong",
    })}
>

// AFTER: value with watch (working)
<select
    value={watch("aktivitasFisik") || User?.aktivitasFisik?.nilai || ""}
    {...register("aktivitasFisik", {
        required: "Aktivitas Fisik tidak boleh kosong",
    })}
>
```

## 🎯 **How It Works**

### **1. `watch` Function**
- `watch("aktivitasFisik")` - watches the current value of the field
- Returns the current value or undefined if not set

### **2. Fallback Value**
- `User?.aktivitasFisik?.nilai || ""` - fallback to database value
- Ensures the select shows the correct value from database

### **3. Controlled Component**
- `value` prop makes it a controlled component
- React Hook Form can properly track and validate the field

## 🚀 **Result**

**Before:** ❌ Select element empty, validation error  
**After:** ✅ Select element shows database value, validation passes

---

**Test:** Check `http://localhost:3000/editprofile`  
**Status:** ✅ Complete
