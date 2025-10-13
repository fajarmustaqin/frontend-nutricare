import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "../layouting/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";
import axios from "axios";

export default function AdminDashboard() {
  const Navigate = useNavigate();
  const token = getCookie("token");
  const { REACT_APP_API_URL } = process.env;
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoods: 0,
    totalTemplates: 0,
    activePlans: 0,
    totalRecipes: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Fetch all stats in parallel
      const [usersRes, foodsRes, templatesRes, plansRes, recipesRes] = await Promise.all([
        axios.get(`${REACT_APP_API_URL}/users`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${REACT_APP_API_URL}/food`).catch(() => ({ data: [] })),
        axios.get(`${REACT_APP_API_URL}/disease-template`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${REACT_APP_API_URL}/weekly-plan`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${REACT_APP_API_URL}/resep`).catch(() => ({ data: [] }))
      ]);

      setStats({
        totalUsers: usersRes.data.length,
        totalFoods: foodsRes.data.length,
        totalTemplates: templatesRes.data.length,
        activePlans: plansRes.data.filter(plan => plan.status === 'aktif').length,
        totalRecipes: recipesRes.data.length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  }, [token, REACT_APP_API_URL]);

  useEffect(() => {
    if (!token) {
      Navigate("/admin");
    } else {
      fetchStats();
    }
  }, [token, Navigate, fetchStats]);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Navigate("/admin");
  };

  const quickActions = [
    {
      title: "Buat Template Penyakit",
      description: "Tambah template diet untuk penyakit baru",
      link: "/admin/disease-template",
      icon: "🦠",
      color: "#e83e8c",
      action: "Buat Template"
    },
    {
      title: "Assign ke Pasien",
      description: "Assign template diet ke pasien",
      link: "/admin/patient-assignment", 
      icon: "👤",
      color: "#6610f2",
      action: "Assign Now"
    },
    {
      title: "Tambah Makanan",
      description: "Tambah data makanan ke database",
      link: "/admin/foods",
      icon: "🍽️",
      color: "#28a745",
      action: "Add Food"
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mt-5">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="fw-bold text-primary mb-1">🏥 Admin Dashboard</h1>
                <p className="text-muted mb-0">NutriCare Hospital Management System</p>
              </div>
              <div>
                <span className="badge bg-success fs-6 me-3">
                  <i className="fas fa-circle me-1"></i>
                  System Online
                </span>
                <button 
                  className="btn btn-outline-danger" 
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Alert */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-primary border-0 shadow-sm">
              <div className="d-flex align-items-center">
                <i className="fas fa-info-circle fs-4 me-3"></i>
                <div>
                  <h5 className="alert-heading mb-1">Selamat Datang, Admin!</h5>
                  <p className="mb-0">
                    Gunakan navbar di atas untuk mengakses fitur manajemen. 
                    Semua menu admin sudah tersedia di navigation bar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="display-6 text-primary mb-2">👥</div>
                <h3 className="fw-bold text-primary">{stats.totalUsers}</h3>
                <p className="text-muted mb-0">Total Pasien</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="display-6 text-success mb-2">🍽️</div>
                <h3 className="fw-bold text-success">{stats.totalFoods}</h3>
                <p className="text-muted mb-0">Data Makanan</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="display-6 text-warning mb-2">🦠</div>
                <h3 className="fw-bold text-warning">{stats.totalTemplates}</h3>
                <p className="text-muted mb-0">Template Penyakit</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="display-6 text-info mb-2">📅</div>
                <h3 className="fw-bold text-info">{stats.activePlans}</h3>
                <p className="text-muted mb-0">Plans Aktif</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="display-6 text-secondary mb-2">📖</div>
                <h3 className="fw-bold text-secondary">{stats.totalRecipes}</h3>
                <p className="text-muted mb-0">Resep</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="display-6 text-danger mb-2">🏥</div>
                <h3 className="fw-bold text-danger">1</h3>
                <p className="text-muted mb-0">Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row mb-4">
          <div className="col-12">
            <h4 className="fw-bold mb-3">⚡ Quick Actions</h4>
            <div className="row">
              {quickActions.map((action, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-3">
                  <div className="card border-0 shadow-sm h-100 hover-card">
                    <div className="card-body">
                      <div className="d-flex align-items-start">
                        <div 
                          className="d-flex align-items-center justify-content-center rounded-3 me-3"
                          style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: action.color + '20',
                            fontSize: '1.2rem'
                          }}
                        >
                          {action.icon}
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-2" style={{color: action.color}}>
                            {action.title}
                          </h6>
                          <p className="text-muted small mb-3">{action.description}</p>
                          <Link 
                            to={action.link}
                            className="btn btn-sm rounded-pill px-3"
                            style={{
                              backgroundColor: action.color,
                              borderColor: action.color,
                              color: 'white'
                            }}
                          >
                            {action.action}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0">🔧 System Status</h6>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Database Connection</span>
                  <span className="badge bg-success">Connected</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>API Server</span>
                  <span className="badge bg-success">Running</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Frontend App</span>
                  <span className="badge bg-success">Active</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Last Updated</span>
                  <span className="text-muted small">{new Date().toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0">📋 Navigation Guide</h6>
              </div>
              <div className="card-body">
                <div className="small">
                  <p className="mb-2">
                    <strong>📊 Dashboard:</strong> Overview dan statistik sistem
                  </p>
                  <p className="mb-2">
                    <strong>🍽️ Kelola Makanan:</strong> CRUD data makanan dan upload image
                  </p>
                  <p className="mb-2">
                    <strong>🦠 Template Penyakit:</strong> Buat template diet per penyakit
                  </p>
                  <p className="mb-2">
                    <strong>👤 Assignment Pasien:</strong> Assign template ke pasien
                  </p>
                  <p className="mb-0">
                    <strong>📅 Monitor Plans:</strong> Lihat dan edit active plans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity (if needed) */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0">📈 Hospital Overview</h6>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-3">
                    <div className="border-end">
                      <h4 className="text-primary fw-bold">{stats.activePlans}</h4>
                      <p className="text-muted small mb-0">Active Diet Plans</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="border-end">
                      <h4 className="text-success fw-bold">{stats.totalTemplates}</h4>
                      <p className="text-muted small mb-0">Disease Templates</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="border-end">
                      <h4 className="text-warning fw-bold">{stats.totalUsers}</h4>
                      <p className="text-muted small mb-0">Registered Patients</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-info fw-bold">{stats.totalFoods}</h4>
                    <p className="text-muted small mb-0">Food Database</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}