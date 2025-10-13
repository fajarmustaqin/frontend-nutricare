import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../layouting/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";
import axios from "axios";

export default function AdminPatientAssignment() {
  const Navigate = useNavigate();
  const token = getCookie("token");
  const { REACT_APP_API_URL } = process.env;

  const [templates, setTemplates] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [weekInfo, setWeekInfo] = useState({
    mingguKe: '',
    tahun: new Date().getFullYear(),
    tanggalMulai: '',
    tanggalSelesai: ''
  });

  const fetchTemplates = useCallback(async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.get(`${REACT_APP_API_URL}/disease-template`, { headers });
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  }, [token, REACT_APP_API_URL]);

  const fetchUsers = useCallback(async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.get(`${REACT_APP_API_URL}/users`, { headers });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  }, [token, REACT_APP_API_URL]);

  useEffect(() => {
    if (!token) {
      Navigate("/admin");
    } else {
      fetchTemplates();
      fetchUsers();
    }
  }, [token, Navigate, fetchTemplates, fetchUsers]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedPatients([]);
  };

  const togglePatientSelection = (patientId) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleAssignPlans = async () => {
    if (!selectedTemplate || selectedPatients.length === 0) {
      alert('Pilih template dan minimal 1 pasien');
      return;
    }

    if (!weekInfo.mingguKe || !weekInfo.tanggalMulai || !weekInfo.tanggalSelesai) {
      alert('Lengkapi informasi minggu');
      return;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      console.log('🏥 Assigning diet plans to patients...');
      
      for (let patientId of selectedPatients) {
        const patient = users.find(u => u._id === patientId);
        
        // Calculate plan based on patient weight and template
        const calculatedResponse = await axios.post(`${REACT_APP_API_URL}/disease-template/calculate`, {
          templateId: selectedTemplate._id,
          patientWeight: patient.berat || 70
        }, { headers });

        const weeklyPlanData = {
          userID: patientId,
          mingguKe: parseInt(weekInfo.mingguKe),
          tahun: parseInt(weekInfo.tahun),
          tanggalMulai: weekInfo.tanggalMulai,
          tanggalSelesai: weekInfo.tanggalSelesai,
          planHarian: calculatedResponse.data.calculatedPlan,
          catatan: `Diet plan untuk ${selectedTemplate.namaPenyakit}. Template: ${selectedTemplate.deskripsi}`
        };

        await axios.post(`${REACT_APP_API_URL}/weekly-plan`, weeklyPlanData, { headers });
        console.log(`✅ Plan assigned to ${patient.nama}`);
      }

      alert(`Diet plan berhasil di-assign ke ${selectedPatients.length} pasien!`);
      
      // Reset form
      setSelectedTemplate(null);
      setSelectedPatients([]);
      setWeekInfo({
        mingguKe: '',
        tahun: new Date().getFullYear(),
        tanggalMulai: '',
        tanggalSelesai: ''
      });

    } catch (error) {
      console.error('Error assigning plans:', error);
      alert('Error assigning plans: ' + (error.response?.data?.message || error.message));
    }
  };

  const getPatientsByDisease = (diseaseName) => {
    return users.filter(user => 
      user.kondisiMedis && user.kondisiMedis.toLowerCase().includes(diseaseName.toLowerCase())
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading data...</p>
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
                <h2 className="fw-bold text-primary">👤 Assignment Diet Plan ke Pasien</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/admin/disease-template">Disease Templates</Link>
                    </li>
                    <li className="breadcrumb-item active">Patient Assignment</li>
                  </ol>
                </nav>
              </div>
              <Link to="/admin/disease-template" className="btn btn-outline-primary">
                🦠 Kelola Template
              </Link>
            </div>
          </div>
        </div>

        {/* Step 1: Select Template */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Step 1: Pilih Template Penyakit</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {templates.map((template) => (
                    <div key={template._id} className="col-lg-4 col-md-6 mb-3">
                      <div 
                        className={`card cursor-pointer ${selectedTemplate?._id === template._id ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                        onClick={() => handleTemplateSelect(template)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body">
                          <h6 className="fw-bold">{template.namaPenyakit}</h6>
                          <div className="d-flex gap-2 mb-2">
                            <span className="badge bg-secondary">{template.kategoriPenyakit}</span>
                            <span className="badge bg-info">{template.tingkatKeparahan}</span>
                          </div>
                          <p className="small text-muted mb-2">{template.deskripsi}</p>
                          <div className="small">
                            Avg: {Math.round(template.templateMingguan.reduce((sum, day) => sum + day.kaloriPerKg, 0) / 7)} kcal/kg
                          </div>
                          {getPatientsByDisease(template.namaPenyakit).length > 0 && (
                            <div className="mt-2">
                              <span className="badge bg-success">
                                {getPatientsByDisease(template.namaPenyakit).length} pasien cocok
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Select Patients & Week Info */}
        {selectedTemplate && (
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Step 2: Pilih Pasien untuk "{selectedTemplate.namaPenyakit}"</h5>
                </div>
                <div className="card-body">
                  {/* Recommended Patients */}
                  {getPatientsByDisease(selectedTemplate.namaPenyakit).length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-success">🎯 Pasien yang Cocok:</h6>
                      <div className="row">
                        {getPatientsByDisease(selectedTemplate.namaPenyakit).map(patient => (
                          <div key={patient._id} className="col-md-6 mb-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedPatients.includes(patient._id)}
                                onChange={() => togglePatientSelection(patient._id)}
                              />
                              <label className="form-check-label">
                                <strong>{patient.nama}</strong> ({patient.no_hp})
                                <br />
                                <small className="text-success">🏥 {patient.kondisiMedis}</small>
                                <br />
                                <small className="text-muted">BB: {patient.berat || 'N/A'} kg</small>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Patients */}
                  <h6 className="text-muted">👥 Semua Pasien:</h6>
                  <div className="row">
                    {users.filter(user => !getPatientsByDisease(selectedTemplate.namaPenyakit).includes(user)).map(patient => (
                      <div key={patient._id} className="col-md-6 mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedPatients.includes(patient._id)}
                            onChange={() => togglePatientSelection(patient._id)}
                          />
                          <label className="form-check-label">
                            <strong>{patient.nama}</strong> ({patient.no_hp || patient.email})
                            <br />
                            {patient.kondisiMedis && (
                              <small className="text-warning">🏥 {patient.kondisiMedis}</small>
                            )}
                            <br />
                            <small className="text-muted">BB: {patient.berat || 'N/A'} kg</small>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Step 3: Info Minggu</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Minggu Ke *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={weekInfo.mingguKe}
                      onChange={(e) => setWeekInfo(prev => ({ ...prev, mingguKe: e.target.value }))}
                      min="1"
                      max="53"
                      placeholder="38"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tahun *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={weekInfo.tahun}
                      onChange={(e) => setWeekInfo(prev => ({ ...prev, tahun: e.target.value }))}
                      min="2024"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tanggal Mulai *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={weekInfo.tanggalMulai}
                      onChange={(e) => setWeekInfo(prev => ({ ...prev, tanggalMulai: e.target.value }))}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tanggal Selesai *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={weekInfo.tanggalSelesai}
                      onChange={(e) => setWeekInfo(prev => ({ ...prev, tanggalSelesai: e.target.value }))}
                    />
                  </div>

                  <div className="alert alert-success">
                    <h6>📊 Summary Assignment:</h6>
                    <p className="mb-1">
                      <strong>Template:</strong> {selectedTemplate?.namaPenyakit || 'Belum dipilih'}
                    </p>
                    <p className="mb-1">
                      <strong>Pasien:</strong> {selectedPatients.length} dipilih
                    </p>
                    <p className="mb-0">
                      <strong>Periode:</strong> Minggu {weekInfo.mingguKe}/{weekInfo.tahun}
                    </p>
                  </div>

                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleAssignPlans}
                    disabled={!selectedTemplate || selectedPatients.length === 0}
                  >
                    🎯 Assign Diet Plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
