# ✨ Profile Page Redesign - NutriCare

## 🎨 New Modern Profile Design

Profile page telah di-redesign dengan tampilan yang **jauh lebih modern dan professional**!

---

## 🆕 What's New?

### 1. **Beautiful Hero Header** 🌟
**Before:**
- Small user icon di corner
- Basic white card
- Plain text layout

**After:**
- ✅ Large gradient header card (purple-blue)
- ✅ Big centered avatar with hover effect
- ✅ Glassmorphism meta badges (age, gender)
- ✅ **BMI Calculator & Badge** (NEW!)
- ✅ Beautiful animations

### 2. **Modern Stats Cards** 📊
**Before:**
- Small cards dengan external images
- Cramped layout
- Basic styling

**After:**
- ✅ Large emoji icons dengan gradient backgrounds
- ✅ Clear labels & values
- ✅ Hover lift effects
- ✅ Color-coded cards:
  - ⚖️ Berat: Purple gradient
  - 📏 Tinggi: Pink gradient
  - 🏃 Aktivitas: Blue gradient

### 3. **Improved Action Menu** 🎯
**Before:**
- Simple rows dengan icons
- Basic styling
- Limited interaction

**After:**
- ✅ Modern card-based menu items
- ✅ Gradient icon circles
- ✅ Descriptive subtitles
- ✅ Smooth slide animations (one by one)
- ✅ Hover effects dengan slide-right animation
- ✅ Color-coded borders on hover

### 4. **BMI Calculator** ⭐ (NEW FEATURE!)
**Auto-calculates BMI:**
- Formula: BMI = weight(kg) / (height(m))²
- Shows BMI value with category:
  - 💙 Underweight (< 18.5) - Blue badge
  - 💚 Normal (18.5 - 24.9) - Green badge
  - 🧡 Overweight (25 - 29.9) - Orange badge
  - ❤️ Obese (≥ 30) - Red badge

### 5. **Better Nutrition Info Display** 🎯
**New Section:**
- Shows daily nutrition requirements
- 4 cards for: Kalori, Karbo, Protein, Lemak
- Emoji icons untuk visual clarity
- Hover animations

---

## 🎨 Design Features

### **Visual Enhancements:**
```
✅ Gradient backgrounds everywhere
✅ Glassmorphism effects (blur + transparency)
✅ Smooth transitions (0.3s ease)
✅ Hover effects (lift, slide, scale)
✅ Drop shadows untuk depth
✅ Modern border radius (16px - 24px)
✅ Professional color palette
```

### **Animations:**
```
✅ Fade-in-up on page load
✅ Slide-in-left for menu items (staggered)
✅ Hover lift for cards
✅ Scale on hover for nutrition items
✅ Slide-right for menu cards
```

### **Color Scheme:**
```css
Primary: #667eea → #764ba2 (purple-blue gradient)
Pink:    #f093fb → #f5576c
Blue:    #4facfe → #00f2fe
Green:   #43e97b → #38f9d7
Red:     #fc5c65 → #eb3349

Background: #f5f7fa → #c3cfe2 (subtle gradient)
Text: #2d3748 (dark gray)
Muted: #718096 (medium gray)
```

---

## 📱 Layout Structure

### **Desktop View:**
```
┌─────────────────────────────────────────┐
│  GRADIENT HERO HEADER                   │
│  ┌────────┐  ┌──────┐ ┌──────┐ ┌──────┐│
│  │        │  │ ⚖️   │ │ 📏   │ │ 🏃   ││
│  │  👤    │  │ 70kg │ │170cm │ │Active││
│  │        │  └──────┘ └──────┘ └──────┘│
│  │John Doe│                             │
│  │🎂 25th │                             │
│  │♂️ Laki2 │                             │
│  │BMI:24.2│                             │
│  └────────┘                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  🎯 Kebutuhan Nutrisi Harian            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ 🔥   │ │ 🍞   │ │ 🥩   │ │ 🥑   │  │
│  │2000  │ │ 300g │ │ 75g  │ │ 67g  │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ⚙️  Pengaturan Akun              →    │
│      Ubah password dan data akun        │
├─────────────────────────────────────────┤
│  ✏️  Edit Profil                  →    │
│      Update data diri dan kesehatan     │
├─────────────────────────────────────────┤
│  📊  Tracking Nutrisi             →    │
│      Lihat riwayat konsumsi nutrisi     │
├─────────────────────────────────────────┤
│  🌱  Dampak Karbon                →    │
│      Pantau jejak karbon makanan        │
├─────────────────────────────────────────┤
│  🚪  Keluar                        →    │
│      Logout dari akun anda              │
└─────────────────────────────────────────┘
```

### **Mobile View:**
```
┌──────────────────┐
│  GRADIENT HEADER │
│                  │
│      👤          │
│   John Doe       │
│   🎂 25 | ♂️     │
│   BMI: 24.2      │
│                  │
│  ┌────────────┐  │
│  │ ⚖️  70kg   │  │
│  └────────────┘  │
│  ┌────────────┐  │
│  │ 📏  170cm  │  │
│  └────────────┘  │
│  ┌────────────┐  │
│  │ 🏃  Active │  │
│  └────────────┘  │
└──────────────────┘

[Nutrition Info]
[Action Menu]
```

---

## ✨ New Features

### 1. **BMI Calculator** (Auto-calculated)
```javascript
BMI = weight(kg) / (height(m))²

Example:
Weight: 70 kg
Height: 170 cm (1.7 m)
BMI = 70 / (1.7 × 1.7) = 24.2

Category: Normal ✅
```

**Display:**
```
┌──────────────────────┐
│ ❤️ BMI: 24.2 (Normal)│
└──────────────────────┘
Color-coded by category!
```

### 2. **Nutrition Requirements Display**
Shows calculated daily needs:
- 🔥 Total Kalori (from BMR × activity factor)
- 🍞 Karbohidrat (75% of calories)
- 🥩 Protein (15% of calories)
- 🥑 Lemak (25% of calories)

### 3. **Enhanced Action Menu**
5 Menu items dengan descriptions:
```
1. ⚙️ Pengaturan Akun
   → Ubah password dan data akun
   
2. ✏️ Edit Profil
   → Update data diri dan kesehatan
   
3. 📊 Tracking Nutrisi
   → Lihat riwayat konsumsi nutrisi
   
4. 🌱 Dampak Karbon
   → Pantau jejak karbon makanan
   
5. 🚪 Keluar
   → Logout dari akun anda
```

---

## 🎯 Interactive Elements

### **Hover Effects:**

**1. Avatar:**
```
Hover → Scale up 1.05x + enhanced shadow
```

**2. Stats Cards:**
```
Hover → Lift up 5px + colored border appears
```

**3. Nutrition Items:**
```
Hover → Background darkens + scale 1.05x
```

**4. Action Menu:**
```
Hover → Slide right 10px
      → Gradient background appears
      → Colored border appears
      → Arrow slides right
      → Icon rotates slightly
```

---

## 📊 Before vs After

### **Profile Header:**
```
Before:
┌──────────────────┐
│ 👤 John Doe      │
│ 25 | Laki-laki   │
└──────────────────┘

After:
┌────────────────────────────────┐
│     GRADIENT HERO HEADER       │
│                                │
│         ┌─────────┐            │
│         │   👤    │            │
│         │ Avatar  │            │
│         └─────────┘            │
│                                │
│       JOHN DOE (Large!)        │
│                                │
│   [🎂 25 tahun] [♂️ Laki-laki] │
│   [❤️ BMI: 24.2 (Normal)]      │
└────────────────────────────────┘
```

### **Stats Display:**
```
Before:
Small cards, cramped, external images

After:
Large cards, spacious, emoji icons, gradients
```

### **Menu:**
```
Before:
Basic list dengan arrow

After:
Modern cards dengan:
- Gradient icons
- Titles + descriptions
- Hover animations
- Better spacing
```

---

## 🔧 Technical Details

### **New Calculations:**
```javascript
// BMI Calculator
const calculateBMI = () => {
  const heightInMeters = User.tinggi / 100;
  const bmi = User.berat / (heightInMeters ** 2);
  return bmi.toFixed(1);
};

// BMI Category
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};
```

### **CSS Variables:**
```css
--stat-color:  Card border color on hover
--menu-color:  Menu card border color on hover
--menu-bg:     Menu card background gradient
```

### **Responsive Breakpoints:**
```
< 576px:  Mobile (stacked layout)
< 768px:  Tablet (2 column stats)
> 768px:  Desktop (3 column stats)
```

---

## 📱 Mobile Optimizations

### **Changes for Mobile:**
```
✅ Avatar: 120px → 100px
✅ Name: 2rem → 1.5rem
✅ Stats: 3 columns → 1 column (stacked)
✅ Meta badges: Smaller padding
✅ Menu cards: Slide 10px → 5px on hover
✅ Better touch targets (larger)
```

---

## 🎨 CSS Classes Added

### **Profile Specific:**
```css
.profile-container       - Main container dengan gradient bg
.profile-header-card     - Gradient hero card
.profile-avatar          - Large circular avatar
.profile-name            - User name (large, bold)
.profile-meta            - Age & gender badges
.profile-meta-item       - Individual meta badge
.bmi-badge              - BMI display badge
.bmi-normal             - Green badge (healthy BMI)
.bmi-overweight         - Orange badge
.bmi-underweight        - Blue badge
```

### **Stats:**
```css
.stats-grid             - Grid for stat cards
.stat-card              - Individual stat card
.stat-icon              - Gradient emoji icon
.stat-label             - Stat label text
.stat-value             - Large stat value
.stat-unit              - Small unit text
```

### **Nutrition Info:**
```css
.nutrition-info-card    - White card container
.nutrition-info-title   - Section title
.nutrition-info-grid    - Grid for nutrition items
.nutrition-info-item    - Individual nutrition item
.nutrition-info-icon    - Emoji icon
.nutrition-info-label   - Label text
.nutrition-info-value   - Value number
```

### **Action Menu:**
```css
.action-menu-section    - Menu section container
.action-menu-grid       - Grid for menu items
.action-menu-card       - Menu item card
.action-menu-left       - Left side (icon + text)
.action-menu-icon       - Gradient icon circle
.action-menu-text       - Title & description
.action-menu-arrow      - Right arrow icon
```

### **Animations:**
```css
.fade-in-up            - Fade in from bottom
.slide-in-left         - Slide in from left
```

---

## 🎯 User Experience Improvements

### **Better Information Display:**
```
Old: Icons squished together
New: Spacious cards dengan clear hierarchy
```

### **BMI Health Indicator:**
```
New Feature! Auto-calculates & shows BMI status
Helps user understand if their weight is healthy
```

### **Clearer Navigation:**
```
Old: Just menu names
New: Menu + descriptions for clarity
     "Pengaturan Akun → Ubah password dan data akun"
```

### **More Engaging:**
```
Old: Static cards
New: Hover animations, color transitions, smooth effects
```

---

## 📋 Components Breakdown

### **1. Profile Header (Gradient Hero)**
```jsx
<div className="profile-header-card">
  - Avatar (120px circle, gradient background)
  - Name (large, white, shadow)
  - Meta badges (age, gender with icons)
  - BMI badge (color-coded by category)
  - Stats grid (3 cards: weight, height, activity)
</div>
```

### **2. Nutrition Requirements**
```jsx
<div className="nutrition-info-card">
  - Title: "🎯 Kebutuhan Nutrisi Harian"
  - 4 Cards Grid:
    🔥 Kalori (kcal)
    🍞 Karbohidrat (g)
    🥩 Protein (g)
    🥑 Lemak (g)
</div>
```

### **3. Action Menu**
```jsx
<div className="action-menu-section">
  5 Menu Cards:
  1. ⚙️ Pengaturan Akun    → /akun
  2. ✏️ Edit Profil         → /editprofile
  3. 📊 Tracking Nutrisi   → /tracking-nutrisi
  4. 🌱 Dampak Karbon      → /karbon
  5. 🚪 Keluar             → / (logout)
</div>
```

---

## 🎨 Visual Design Details

### **Gradient Header:**
```css
Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Border-radius: 24px
Shadow: 0 20px 60px rgba(102, 126, 234, 0.3)
Decorative circle: rgba(255, 255, 255, 0.1)
```

### **Avatar:**
```css
Size: 120px × 120px
Border: 5px solid rgba(255, 255, 255, 0.3)
Background: gradient
Shadow: 0 10px 30px rgba(0, 0, 0, 0.2)
Icon: 4rem, white
Hover: scale(1.05)
```

### **Stats Cards:**
```css
Background: white
Border-radius: 20px
Padding: 1.5rem
Shadow: 0 4px 20px rgba(0, 0, 0, 0.08)
Hover: translateY(-5px) + enhanced shadow
```

### **Menu Cards:**
```css
Background: white → gradient on hover
Border-radius: 16px
Padding: 1.5rem
Hover: translateX(10px) + colored border
```

---

## 📊 Data Displayed

### **Personal Info:**
```
✅ Nama (User name)
✅ Umur (Age) 
✅ Jenis Kelamin (Gender)
✅ BMI (Auto-calculated)
```

### **Physical Stats:**
```
✅ Berat Badan (Weight in kg)
✅ Tinggi Badan (Height in cm)
✅ Aktivitas Fisik (Activity level)
   - Keterangan (description)
   - Nilai (multiplier factor)
```

### **Nutrition Requirements:**
```
✅ Kalori Total (kcal)
✅ Karbohidrat (grams)
✅ Protein (grams)
✅ Lemak (grams)
```

---

## 🚀 How to View

### **Step 1: Login**
```
URL: http://localhost:3000/sign-in
Phone: 081234567890
Password: user123
```

### **Step 2: Go to Profile**
```
Option 1: Click dropdown Profile > "My Profile"
Option 2: Direct URL: http://localhost:3000/profile
```

### **Step 3: Explore**
```
✅ See your profile with modern design
✅ Check BMI calculation
✅ View nutrition requirements
✅ Hover over cards (see animations!)
✅ Click menu items to navigate
```

---

## 🎯 Interactive Testing

### **Hover Tests:**
- [ ] Hover avatar → scales up
- [ ] Hover stats cards → lifts up + colored border
- [ ] Hover nutrition items → background darkens + scales
- [ ] Hover menu cards → slides right + gradient bg + colored border
- [ ] Hover menu arrows → slides right + color change

### **Navigation Tests:**
- [ ] Click "Pengaturan Akun" → /akun
- [ ] Click "Edit Profil" → /editprofile
- [ ] Click "Tracking Nutrisi" → /tracking-nutrisi
- [ ] Click "Dampak Karbon" → /karbon
- [ ] Click "Keluar" → logout + redirect to /

### **Responsive Tests:**
- [ ] Resize to mobile → layout stacks properly
- [ ] Avatar size adjusts
- [ ] Stats become 1 column
- [ ] Menu cards full width
- [ ] All text readable

---

## 📝 Files Updated

### **New Files:**
```
front-end-nutricare/
└── src/
    └── style/
        └── Profile.css           ⭐ NEW - Modern profile styles
```

### **Modified Files:**
```
front-end-nutricare/
└── src/
    └── pages/
        └── Profile.js            ✏️ REDESIGNED
```

### **Imports Changed:**
```javascript
// Old:
import "../style/card-makanan.css";

// New:
import "../style/Profile.css";
```

---

## ✅ Benefits

### **User Benefits:**
```
✅ Easier to read information
✅ More engaging visual design
✅ BMI health indicator
✅ Clearer navigation with descriptions
✅ Better mobile experience
✅ Professional look & feel
```

### **Developer Benefits:**
```
✅ Clean, maintainable CSS
✅ Reusable components
✅ Consistent design system
✅ Responsive by default
✅ Easy to extend
```

---

## 🎨 Design Consistency

Profile page now matches the modern design of:
- ✅ Dashboard (HomeLogin)
- ✅ Account Settings (Akun)
- ✅ Admin pages

**Unified design language across the app!**

---

## 🐛 Troubleshooting

### **Issue: BMI shows 0**
**Cause:** User weight or height data missing

**Fix:**
```
1. Go to Edit Profile
2. Enter weight & height
3. Save
4. BMI will calculate automatically
```

### **Issue: Nutrition values show 0**
**Cause:** User profile incomplete

**Fix:**
```
Complete profile data during registration or edit profile
```

### **Issue: Animations don't work**
**Cause:** Browser doesn't support CSS animations

**Fix:**
```
Update browser or use modern browser (Chrome, Firefox, Edge)
```

---

## 🎉 Summary

**Profile page is now:**
- ✅ **10x more beautiful** - Modern gradients & glassmorphism
- ✅ **More informative** - BMI calculator, nutrition display
- ✅ **Better UX** - Clear hierarchy, hover effects, descriptions
- ✅ **More engaging** - Animations, colors, interactive elements
- ✅ **Fully responsive** - Perfect on all devices
- ✅ **Consistent** - Matches overall app design

---

## 🚀 Result

Profile page transformation:
```
Old: ⭐⭐⭐ (Basic)
New: ⭐⭐⭐⭐⭐ (Professional & Modern!)
```

**Refresh dan lihat hasilnya!** 🎨✨

