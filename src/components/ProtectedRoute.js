import { Navigate } from 'react-router-dom';
import { getCookie } from '../helpers';
import { isAdmin } from '../helpers/auth';

// Protected Route - Hanya bisa diakses kalau sudah login
export const ProtectedRoute = ({ children }) => {
  const token = getCookie('token');
  
  if (!token) {
    // Belum login, redirect ke sign-in
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
};

// Admin Route - Hanya bisa diakses oleh admin
export const AdminRoute = ({ children }) => {
  const token = getCookie('token');
  const userIsAdmin = isAdmin();
  
  if (!token) {
    // Belum login, redirect ke admin login
    return <Navigate to="/admin" replace />;
  }
  
  if (!userIsAdmin) {
    // Bukan admin, redirect ke unauthorized
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

// Public Only Route - Hanya bisa diakses kalau belum login
export const PublicOnlyRoute = ({ children }) => {
  const token = getCookie('token');
  const userIsAdmin = isAdmin();
  
  if (token) {
    // Sudah login, redirect ke home atau dashboard
    if (userIsAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return children;
};

