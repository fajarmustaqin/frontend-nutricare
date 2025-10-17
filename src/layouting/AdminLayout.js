import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "./Footer";

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Add admin-page class to body
    document.body.classList.add('admin-page');
    
    return () => {
      // Remove admin-page class when component unmounts
      document.body.classList.remove('admin-page');
    };
  }, []);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={`admin-main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <div className="admin-topbar">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button 
                className="sidebar-toggle-btn d-lg-none"
                onClick={() => document.querySelector('.admin-sidebar').classList.toggle('mobile-open')}
              >
                <i className="fas fa-bars"></i>
              </button>
              <div className="page-title">
                <h4 className="mb-0 fw-bold text-dark">Hospital Admin Panel</h4>
                <small className="text-muted">NutriCare Management System</small>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              {/* Notifications */}
              <div className="dropdown">
                <button className="btn btn-light btn-sm position-relative" data-bs-toggle="dropdown">
                  <i className="fas fa-bell"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><h6 className="dropdown-header">Notifications</h6></li>
                  <li><button className="dropdown-item">
                    <i className="fas fa-user-plus text-success me-2"></i>
                    New patient registered
                  </button></li>
                  <li><button className="dropdown-item">
                    <i className="fas fa-calendar text-warning me-2"></i>
                    Diet plan expiring soon
                  </button></li>
                  <li><button className="dropdown-item">
                    <i className="fas fa-chart-line text-info me-2"></i>
                    Weekly report ready
                  </button></li>
                </ul>
              </div>

              {/* System Status */}
              <div className="system-status">
                <span className="status-indicator online"></span>
                <span className="status-text d-none d-md-inline">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Layout Styles */}
      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        .admin-main-content {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .admin-main-content.sidebar-collapsed {
          margin-left: 80px;
        }

        .admin-topbar {
          background: white;
          padding: 1rem 2rem;
          border-bottom: 1px solid #e9ecef;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 1020;
        }

        .sidebar-toggle-btn {
          background: none;
          border: none;
          color: #6c757d;
          font-size: 1.2rem;
          margin-right: 1rem;
          padding: 0.5rem;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .sidebar-toggle-btn:hover {
          background: #f8f9fa;
          color: #495057;
        }

        .page-title h4 {
          color: #2c3e50;
        }

        .system-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .status-indicator.online {
          background: #28a745;
        }

        .status-text {
          color: #6c757d;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .admin-content {
          flex: 1;
          padding: 0;
          background: #f8f9fa;
        }

        /* Mobile Responsive */
        @media (max-width: 991px) {
          .admin-main-content {
            margin-left: 0;
          }

          .admin-main-content.sidebar-collapsed {
            margin-left: 0;
          }

          .admin-topbar {
            padding: 1rem;
          }
        }

        /* Animations */
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Custom Scrollbar */
        .admin-content::-webkit-scrollbar {
          width: 6px;
        }

        .admin-content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .admin-content::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .admin-content::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}
