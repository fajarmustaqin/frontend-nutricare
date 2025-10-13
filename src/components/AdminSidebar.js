import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      icon: "fas fa-tachometer-alt",
      path: "/admin/dashboard",
      color: "#667eea"
    },
    {
      title: "Kelola Makanan",
      icon: "fas fa-utensils",
      path: "/admin/foods",
      color: "#28a745",
      badge: "CRUD"
    },
    {
      title: "Template Penyakit",
      icon: "fas fa-virus",
      path: "/admin/disease-template",
      color: "#e83e8c",
      badge: "NEW"
    },
    {
      title: "Assignment Pasien",
      icon: "fas fa-user-md",
      path: "/admin/patient-assignment", 
      color: "#6610f2"
    },
    {
      title: "Monitor Diet Plans",
      icon: "fas fa-calendar-week",
      path: "/admin/weekly-plan",
      color: "#fd7e14"
    },
    {
      title: "Manajemen Resep",
      icon: "fas fa-book",
      path: "/resep",
      color: "#17a2b8"
    },
    {
      title: "Tracking Nutrisi",
      icon: "fas fa-chart-line",
      path: "/tracking-nutrisi",
      color: "#6f42c1"
    }
  ];

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/admin");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="d-flex align-items-center">
            <div className="sidebar-logo">
              <span className="logo-emoji">🏥</span>
            </div>
            {!isCollapsed && (
              <div className="sidebar-brand">
                <h5 className="mb-0 fw-bold">NutriCare</h5>
                <small className="text-muted">Admin Panel</small>
              </div>
            )}
          </div>
          <button 
            className="sidebar-toggle d-none d-lg-block"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i className={`fas fa-angle-${isCollapsed ? 'right' : 'left'}`}></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav flex-column">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="nav-link-content">
                    <div className="nav-icon" style={{ color: item.color }}>
                      <i className={item.icon}></i>
                    </div>
                    {!isCollapsed && (
                      <div className="nav-text">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="nav-badge">{item.badge}</span>
                        )}
                      </div>
                    )}
                  </div>
                  {isActive(item.path) && <div className="active-indicator"></div>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="admin-info">
            {!isCollapsed && (
              <div className="admin-profile">
                <div className="admin-avatar">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="admin-details">
                  <div className="admin-name">Administrator</div>
                  <div className="admin-role">System Admin</div>
                </div>
              </div>
            )}
            <button 
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <i className="fas fa-sign-out-alt"></i>
              {!isCollapsed && <span className="ms-2">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="mobile-sidebar-toggle d-lg-none"
        onClick={() => setIsMobileOpen(true)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar Styles */}
      <style jsx>{`
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1040;
          display: flex;
          flex-direction: column;
        }

        .admin-sidebar.collapsed {
          width: 80px;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 80px;
        }

        .sidebar-logo {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
        }

        .collapsed .sidebar-logo {
          margin-right: 0;
        }

        .logo-emoji {
          font-size: 1.5rem;
        }

        .sidebar-brand h5 {
          color: white;
          margin-bottom: 0;
        }

        .sidebar-brand small {
          color: rgba(255, 255, 255, 0.7);
        }

        .sidebar-toggle {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
          overflow-y: auto;
        }

        .sidebar-nav .nav-item {
          margin: 0.25rem 1rem;
        }

        .sidebar-nav .nav-link {
          color: rgba(255, 255, 255, 0.8);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          text-decoration: none;
          margin-bottom: 0.25rem;
        }

        .collapsed .sidebar-nav .nav-link {
          justify-content: center;
          padding: 0.75rem 0.5rem;
        }

        .nav-link-content {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .nav-icon {
          width: 20px;
          text-align: center;
          margin-right: 1rem;
          font-size: 1.1rem;
        }

        .collapsed .nav-icon {
          margin-right: 0;
        }

        .nav-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
        }

        .nav-badge {
          background: #ff6b6b;
          color: white;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 10px;
          font-weight: 600;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(5px);
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .active-indicator {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 30px;
          background: #667eea;
          border-radius: 2px 0 0 2px;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-profile {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .admin-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 0.75rem;
        }

        .admin-details {
          flex: 1;
        }

        .admin-name {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .admin-role {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: rgba(255, 255, 255, 0.8);
          padding: 0.75rem;
          border-radius: 8px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .collapsed .logout-btn {
          padding: 0.75rem 0.5rem;
        }

        .logout-btn:hover {
          background: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
          transform: translateY(-2px);
        }

        .mobile-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1035;
        }

        .mobile-sidebar-toggle {
          position: fixed;
          top: 1rem;
          left: 1rem;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          z-index: 1030;
          transition: all 0.3s ease;
        }

        .mobile-sidebar-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Mobile Responsive */
        @media (max-width: 991px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }

          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
        }

        /* Scrollbar Styling */
        .sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Animation for menu items */
        .nav-item {
          animation: slideInLeft 0.3s ease-out;
          animation-fill-mode: both;
        }

        .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-item:nth-child(2) { animation-delay: 0.15s; }
        .nav-item:nth-child(3) { animation-delay: 0.2s; }
        .nav-item:nth-child(4) { animation-delay: 0.25s; }
        .nav-item:nth-child(5) { animation-delay: 0.3s; }
        .nav-item:nth-child(6) { animation-delay: 0.35s; }
        .nav-item:nth-child(7) { animation-delay: 0.4s; }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Tooltip for collapsed state */
        .collapsed .nav-link {
          position: relative;
        }

        .collapsed .nav-link:hover::after {
          content: attr(data-title);
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          white-space: nowrap;
          margin-left: 0.5rem;
          font-size: 0.85rem;
          z-index: 1000;
        }
      `}</style>
    </>
  );
}
