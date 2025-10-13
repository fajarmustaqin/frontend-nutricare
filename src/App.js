import "./App.css";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "./helpers";
import { isAdmin, isAuthenticated } from "./helpers/auth";
import HomeGuest from "./pages/HomeGuest";
import HomeLogin from "./pages/HomeLogin";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getCookie("token");
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect if we're on the home page and haven't redirected yet
    if (location.pathname === "/" && !hasRedirected.current) {
      if (isAuthenticated()) {
        if (isAdmin()) {
          // Redirect admin to dashboard
          hasRedirected.current = true;
          navigate("/admin/dashboard", { replace: true });
        }
        // If user, stay on HomeLogin (current page)
      }
    }
  }, [navigate, location.pathname, token]);

  // If trying to redirect, show loading
  if (isAuthenticated() && isAdmin() && location.pathname === "/" && hasRedirected.current) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {
        token ? <HomeLogin></HomeLogin> : <HomeGuest></HomeGuest>
      }
    </>
  );

}

export default App;
