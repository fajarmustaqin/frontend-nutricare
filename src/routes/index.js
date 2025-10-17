import { Routes, Route } from "react-router";
import Layout from "../layouting/Layout";
import EditProfile from "../pages/EditProfile";
import App from "../App";
import SignIn from "../pages/SignIn";
import Akun from "../pages/Akun";
import SignUp from "../pages/SignUp";
import PilihMakanan from "../pages/PilihMakanan";
import TrackingNutrisi from "../pages/TrackingNutrisi";
import Profile from "../pages/Profile";
import TrackingKarbon from "../pages/TrackingKarbon";
import RekomendasiMakanan from "../pages/RekomendasiMakanan";
import KeranjangMakanan from "../pages/KeranjangMakanan";
import NotFound from "../pages/NotFound";
import Resep from "../pages/Resep";
import ResepDetail from "../pages/ResepDetail";
import LoginAdmin from "../pages/LoginAdmin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminFoodManagement from "../pages/AdminFoodManagement";
import AdminWeeklyPlan from "../pages/AdminWeeklyPlan";
import AdminDiseaseTemplate from "../pages/AdminDiseaseTemplate";
import AdminPatientAssignment from "../pages/AdminPatientAssignment";
import AdminResepManagement from "../pages/AdminResepManagement";
import { ProtectedRoute, AdminRoute, PublicOnlyRoute } from "../components/ProtectedRoute";

export default function Routers() {
  return (
    <Routes>
      {/* Public Routes - Bisa diakses siapa saja */}
      <Route path="/" element={<App />}></Route>
      <Route path="/resep" element={<Resep />}></Route>
      <Route path="/resep/detail/:id" element={<ResepDetail />}></Route>
      
      {/* Public Only Routes - Hanya bisa diakses kalau belum login */}
      <Route path="/sign-in" element={<PublicOnlyRoute><SignIn /></PublicOnlyRoute>}></Route>
      <Route path="/sign-up" element={<PublicOnlyRoute><SignUp /></PublicOnlyRoute>}></Route>
      <Route path="/admin" element={<PublicOnlyRoute><LoginAdmin /></PublicOnlyRoute>}></Route>
      
      {/* Protected Routes - Butuh login user */}
      <Route path="/pilih-makanan" element={<ProtectedRoute><PilihMakanan /></ProtectedRoute>}></Route>
      <Route path="/pilih-makanan/detail" element={<ProtectedRoute><KeranjangMakanan /></ProtectedRoute>}></Route>
      <Route path="/tracking-nutrisi" element={<ProtectedRoute><TrackingNutrisi /></ProtectedRoute>}></Route>
      <Route path="/karbon" element={<ProtectedRoute><TrackingKarbon /></ProtectedRoute>}></Route>
      <Route path="/rekomendasi" element={<ProtectedRoute><RekomendasiMakanan /></ProtectedRoute>}></Route>
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
      <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>}></Route>
      <Route path="/akun" element={<ProtectedRoute><Akun /></ProtectedRoute>}></Route>
      
      {/* Admin Routes - Butuh login admin */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>}></Route>
      <Route path="/admin/foods" element={<AdminRoute><AdminFoodManagement /></AdminRoute>}></Route>
      <Route path="/admin/disease-template" element={<AdminRoute><AdminDiseaseTemplate /></AdminRoute>}></Route>
      <Route path="/admin/patient-assignment" element={<AdminRoute><AdminPatientAssignment /></AdminRoute>}></Route>
      <Route path="/admin/weekly-plan" element={<AdminRoute><AdminWeeklyPlan /></AdminRoute>}></Route>
      <Route path="/admin/resep-management" element={<AdminRoute><AdminResepManagement /></AdminRoute>}></Route>
      
      {/* Fallback Routes */}
      <Route path="/unauthorized" element={<NotFound notfound={false}/>}></Route>
      <Route path="/layout" element={<Layout />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
