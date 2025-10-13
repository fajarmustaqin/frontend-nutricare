import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../layouting/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";
import axios from "axios";

export default function AdminWeeklyPlan() {
  const Navigate = useNavigate();
  const token = getCookie("token");
  const { REACT_APP_API_URL } = process.env;

  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [currentPlan, setCurrentPlan] = useState({
    userID: '',
    mingguKe: '',
    tahun: new Date().getFullYear(),
    tanggalMulai: '',
    tanggalSelesai: '',
    catatan: '',
    planHarian: []
  });

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const fetchWeeklyPlans = useCallback(async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.get(`${REACT_APP_API_URL}/weekly-plan`, { headers });
      setWeeklyPlans(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weekly plans:', error);
      setLoading(false);
    }
  }, [token, REACT_APP_API_URL]);

  const fetchUsers = useCallback(async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      console.log('📤 Fetching users for dropdown...');
      
      const response = await axios.get(`${REACT_APP_API_URL}/users`, { headers });
      console.log('📥 Users fetched:', response.data.length, 'users');
      console.log('👥 Users data:', response.data);
      
      setUsers(response.data);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      console.error('📄 Error response:', error.response?.data);
      
      if (error.response?.status === 403) {
        alert('Access denied. Only admin can view users.');
      } else {
        alert('Error loading users: ' + (error.response?.data?.message || error.message));
      }
    }
  }, [token, REACT_APP_API_URL]);

  useEffect(() => {
    if (!token) {
      Navigate("/admin");
    } else {
      fetchWeeklyPlans();
      fetchUsers();
    }
  }, [token, Navigate, fetchWeeklyPlans, fetchUsers]);

  const generateDefaultPlan = async (userId) => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.get(`${REACT_APP_API_URL}/weekly-plan/generate/${userId}`, { headers });
      
      setCurrentPlan(prev => ({
        ...prev,
        userID: userId,
        planHarian: response.data.planHarian
      }));
      
      console.log('✅ Default plan generated');
    } catch (error) {
      console.error('Error generating default plan:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (editMode) {
        await axios.patch(`${REACT_APP_API_URL}/weekly-plan/${currentPlan._id}`, currentPlan, { headers });
        console.log('✅ Weekly plan updated successfully');
      } else {
        await axios.post(`${REACT_APP_API_URL}/weekly-plan`, currentPlan, { headers });
        console.log('✅ Weekly plan created successfully');
      }

      setShowModal(false);
      setEditMode(false);
      resetForm();
      fetchWeeklyPlans();
    } catch (error) {
      console.error('Error saving weekly plan:', error);
      alert('Error saving plan: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (planId, patientName) => {
    if (window.confirm(`Hapus weekly plan untuk "${patientName}"?`)) {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        await axios.delete(`${REACT_APP_API_URL}/weekly-plan/${planId}`, { headers });
        console.log('✅ Weekly plan deleted successfully');
        fetchWeeklyPlans();
      } catch (error) {
        console.error('Error deleting weekly plan:', error);
        alert('Error deleting plan: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleAddNew = () => {
    resetForm();
    setEditMode(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentPlan({
      userID: '',
      mingguKe: '',
      tahun: new Date().getFullYear(),
      tanggalMulai: '',
      tanggalSelesai: '',
      catatan: '',
      planHarian: []
    });
    setSelectedUser('');
  };

  const handleUserChange = (userId) => {
    setSelectedUser(userId);
    setCurrentPlan(prev => ({ ...prev, userID: userId }));
    if (userId) {
      generateDefaultPlan(userId);
    }
  };

  const updateDailyPlan = (dayIndex, field, value) => {
    const updatedPlan = [...currentPlan.planHarian];
    if (!updatedPlan[dayIndex]) {
      updatedPlan[dayIndex] = {
        hari: days[dayIndex],
        targetKalori: 0,
        targetKarbohidrat: 0,
        targetProtein: 0,
        targetLemak: 0,
        catatan: ''
      };
    }
    updatedPlan[dayIndex][field] = value;
    setCurrentPlan(prev => ({ ...prev, planHarian: updatedPlan }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading weekly plans...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold text-primary">🏥 Manajemen Diet Pasien Mingguan</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Weekly Plans</li>
                  </ol>
                </nav>
              </div>
              <button 
                className="btn btn-success"
                onClick={handleAddNew}
              >
                <i className="fas fa-plus"></i> Buat Plan Baru
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Rencana Diet Pasien ({weeklyPlans.length} pasien)</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Pasien</th>
                        <th>Minggu/Tahun</th>
                        <th>Periode</th>
                        <th>Status</th>
                        <th>Total Kalori/Hari</th>
                        <th>Created By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyPlans.map((plan) => {
                        const avgCalories = plan.planHarian.reduce((sum, day) => sum + day.targetKalori, 0) / 7;
                        return (
                          <tr key={plan._id}>
                            <td>
                              <strong>{plan.namaPasien}</strong>
                              <br />
                              <small className="text-muted">
                                {plan.userID?.no_hp || plan.userID?.email}
                              </small>
                            </td>
                            <td>Minggu {plan.mingguKe}/{plan.tahun}</td>
                            <td>
                              <small>
                                {new Date(plan.tanggalMulai).toLocaleDateString('id-ID')} - 
                                {new Date(plan.tanggalSelesai).toLocaleDateString('id-ID')}
                              </small>
                            </td>
                            <td>
                              <span className={`badge ${
                                plan.status === 'aktif' ? 'bg-success' : 
                                plan.status === 'selesai' ? 'bg-secondary' : 'bg-warning'
                              }`}>
                                {plan.status}
                              </span>
                            </td>
                            <td>{Math.round(avgCalories)} kcal</td>
                            <td>
                              <small>{plan.createdBy?.email}</small>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(plan)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(plan._id, plan.namaPasien)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Add/Edit Weekly Plan */}
        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editMode ? 'Edit Weekly Plan' : 'Buat Weekly Plan Baru'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {/* Basic Info */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Pilih Pasien/User *</label>
                        <select
                          className="form-control"
                          value={selectedUser}
                          onChange={(e) => handleUserChange(e.target.value)}
                          required
                          disabled={editMode}
                        >
                          <option value="">Pilih User</option>
                          {users.map(user => (
                            <option key={user._id} value={user._id}>
                              {user.nama} ({user.no_hp || user.email})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Minggu Ke *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentPlan.mingguKe}
                          onChange={(e) => setCurrentPlan(prev => ({ ...prev, mingguKe: e.target.value }))}
                          min="1"
                          max="53"
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Tahun *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentPlan.tahun}
                          onChange={(e) => setCurrentPlan(prev => ({ ...prev, tahun: e.target.value }))}
                          min="2024"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Tanggal Mulai *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={currentPlan.tanggalMulai}
                          onChange={(e) => setCurrentPlan(prev => ({ ...prev, tanggalMulai: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Tanggal Selesai *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={currentPlan.tanggalSelesai}
                          onChange={(e) => setCurrentPlan(prev => ({ ...prev, tanggalSelesai: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Catatan Plan</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={currentPlan.catatan}
                        onChange={(e) => setCurrentPlan(prev => ({ ...prev, catatan: e.target.value }))}
                        placeholder="Catatan tambahan untuk weekly plan ini..."
                      />
                    </div>

                    {/* Daily Plans */}
                    <h6 className="fw-bold mb-3">📊 Target Kalori Harian (Senin - Minggu)</h6>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Hari</th>
                            <th>Target Kalori</th>
                            <th>Karbohidrat (g)</th>
                            <th>Protein (g)</th>
                            <th>Lemak (g)</th>
                            <th>Catatan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {days.map((day, index) => {
                            const dayPlan = currentPlan.planHarian[index] || {
                              hari: day,
                              targetKalori: 0,
                              targetKarbohidrat: 0,
                              targetProtein: 0,
                              targetLemak: 0,
                              catatan: ''
                            };
                            
                            return (
                              <tr key={day}>
                                <td className="fw-bold">{day}</td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayPlan.targetKalori}
                                    onChange={(e) => updateDailyPlan(index, 'targetKalori', Number(e.target.value))}
                                    placeholder="2000"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayPlan.targetKarbohidrat}
                                    onChange={(e) => updateDailyPlan(index, 'targetKarbohidrat', Number(e.target.value))}
                                    placeholder="300"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayPlan.targetProtein}
                                    onChange={(e) => updateDailyPlan(index, 'targetProtein', Number(e.target.value))}
                                    placeholder="75"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayPlan.targetLemak}
                                    onChange={(e) => updateDailyPlan(index, 'targetLemak', Number(e.target.value))}
                                    placeholder="55"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={dayPlan.catatan}
                                    onChange={(e) => updateDailyPlan(index, 'catatan', e.target.value)}
                                    placeholder="Catatan khusus..."
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {selectedUser && (
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        <strong>Tips:</strong> Klik "Generate Default" untuk mengisi otomatis berdasarkan kebutuhan kalori user.
                        <button 
                          type="button"
                          className="btn btn-sm btn-outline-primary ms-3"
                          onClick={() => generateDefaultPlan(selectedUser)}
                        >
                          🔄 Generate Default
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editMode ? 'Update Plan' : 'Buat Plan'}
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
