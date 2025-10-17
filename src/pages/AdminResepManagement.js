import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../layouting/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";
import axios from "axios";

export default function AdminResepManagement() {
  const Navigate = useNavigate();
  const token = getCookie("token");
  const { REACT_APP_API_URL } = process.env;
  
  const [reseps, setReseps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingResep, setEditingResep] = useState(null);
  const [foods, setFoods] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    idMakanan: "",
    namaResep: "",
    deskripsi: "",
    langkahLangkah: "",
    waktuPersiapan: "",
    tingkatKesulitan: "Mudah"
  });

  const fetchReseps = useCallback(async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/resep`);
      setReseps(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reseps:', error);
      setLoading(false);
    }
  }, [REACT_APP_API_URL]);

  const fetchFoods = useCallback(async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/food`);
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  }, [REACT_APP_API_URL]);

  useEffect(() => {
    if (!token) {
      Navigate("/admin");
    } else {
      fetchReseps();
      fetchFoods();
    }
  }, [token, Navigate, fetchReseps, fetchFoods]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      if (editingResep) {
        // Update existing resep
        await axios.put(`${REACT_APP_API_URL}/resep/${editingResep._id}`, formData, { headers });
      } else {
        // Create new resep
        await axios.post(`${REACT_APP_API_URL}/resep`, formData, { headers });
      }
      
      setShowAddModal(false);
      setEditingResep(null);
      setFormData({
        idMakanan: "",
        namaResep: "",
        deskripsi: "",
        langkahLangkah: "",
        waktuPersiapan: "",
        tingkatKesulitan: "Mudah"
      });
      fetchReseps();
    } catch (error) {
      console.error('Error saving resep:', error);
      alert('Error saving resep');
    }
  };

  const handleEdit = (resep) => {
    setEditingResep(resep);
    setFormData({
      idMakanan: resep.idMakanan?._id || "",
      namaResep: resep.namaResep || "",
      deskripsi: resep.deskripsi || "",
      langkahLangkah: resep.langkahLangkah || "",
      waktuPersiapan: resep.waktuPersiapan || "",
      tingkatKesulitan: resep.tingkatKesulitan || "Mudah"
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resep?')) {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        await axios.delete(`${REACT_APP_API_URL}/resep/${id}`, { headers });
        fetchReseps();
      } catch (error) {
        console.error('Error deleting resep:', error);
        alert('Error deleting resep');
      }
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Navigate("/admin");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading resep management...</p>
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
                <h1 className="fw-bold text-primary mb-1">📖 Manajemen Resep</h1>
                <p className="text-muted mb-0">Kelola resep makanan untuk pasien</p>
              </div>
              <div>
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => {
                    setEditingResep(null);
                    setFormData({
                      idMakanan: "",
                      namaResep: "",
                      deskripsi: "",
                      langkahLangkah: "",
                      waktuPersiapan: "",
                      tingkatKesulitan: "Mudah"
                    });
                    setShowAddModal(true);
                  }}
                >
                  <i className="fas fa-plus me-2"></i>
                  Tambah Resep
                </button>
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

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-6 text-primary mb-2">📖</div>
                <h3 className="fw-bold text-primary">{reseps.length}</h3>
                <p className="text-muted mb-0">Total Resep</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-6 text-success mb-2">🍽️</div>
                <h3 className="fw-bold text-success">{foods.length}</h3>
                <p className="text-muted mb-0">Makanan Tersedia</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-6 text-warning mb-2">⏱️</div>
                <h3 className="fw-bold text-warning">
                  {reseps.filter(r => r.waktuPersiapan && r.waktuPersiapan <= 30).length}
                </h3>
                <p className="text-muted mb-0">Resep Cepat (≤30min)</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-6 text-info mb-2">⭐</div>
                <h3 className="fw-bold text-info">
                  {reseps.filter(r => r.tingkatKesulitan === "Mudah").length}
                </h3>
                <p className="text-muted mb-0">Resep Mudah</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resep Table */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0">📋 Daftar Resep</h6>
              </div>
              <div className="card-body">
                {reseps.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="display-1 text-muted mb-3">📖</div>
                    <h5>Belum ada resep</h5>
                    <p className="text-muted">Klik "Tambah Resep" untuk menambah resep pertama</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Gambar</th>
                          <th>Nama Resep</th>
                          <th>Makanan</th>
                          <th>Waktu Persiapan</th>
                          <th>Kesulitan</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reseps.map((resep) => (
                          <tr key={resep._id}>
                            <td>
                              {resep.idMakanan?.image ? (
                                <img 
                                  src={resep.idMakanan.image} 
                                  alt={resep.namaResep}
                                  className="rounded"
                                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                              ) : (
                                <div 
                                  className="rounded d-flex align-items-center justify-content-center bg-light"
                                  style={{ width: '50px', height: '50px' }}
                                >
                                  📖
                                </div>
                              )}
                            </td>
                            <td>
                              <div>
                                <strong>{resep.namaResep || 'Nama Resep'}</strong>
                                {resep.deskripsi && (
                                  <div className="text-muted small">{resep.deskripsi.substring(0, 50)}...</div>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-primary">
                                {resep.idMakanan?.makanan || 'Makanan'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {resep.waktuPersiapan ? `${resep.waktuPersiapan} menit` : 'N/A'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${
                                resep.tingkatKesulitan === 'Mudah' ? 'bg-success' :
                                resep.tingkatKesulitan === 'Sedang' ? 'bg-warning' : 'bg-danger'
                              }`}>
                                {resep.tingkatKesulitan || 'Mudah'}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEdit(resep)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(resep._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingResep ? 'Edit Resep' : 'Tambah Resep Baru'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Makanan</label>
                        <select 
                          className="form-select"
                          name="idMakanan"
                          value={formData.idMakanan}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Pilih Makanan</option>
                          {foods.map(food => (
                            <option key={food._id} value={food._id}>
                              {food.makanan}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nama Resep</label>
                        <input 
                          type="text"
                          className="form-control"
                          name="namaResep"
                          value={formData.namaResep}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Deskripsi</label>
                      <textarea 
                        className="form-control"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleInputChange}
                        rows="3"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Langkah-langkah</label>
                      <textarea 
                        className="form-control"
                        name="langkahLangkah"
                        value={formData.langkahLangkah}
                        onChange={handleInputChange}
                        rows="4"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Waktu Persiapan (menit)</label>
                        <input 
                          type="number"
                          className="form-control"
                          name="waktuPersiapan"
                          value={formData.waktuPersiapan}
                          onChange={handleInputChange}
                          min="1"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Tingkat Kesulitan</label>
                        <select 
                          className="form-select"
                          name="tingkatKesulitan"
                          value={formData.tingkatKesulitan}
                          onChange={handleInputChange}
                        >
                          <option value="Mudah">Mudah</option>
                          <option value="Sedang">Sedang</option>
                          <option value="Sulit">Sulit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowAddModal(false)}
                    >
                      Batal
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingResep ? 'Update' : 'Simpan'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
