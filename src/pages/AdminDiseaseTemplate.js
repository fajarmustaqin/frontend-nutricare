import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../layouting/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";
import axios from "axios";

export default function AdminDiseaseTemplate() {
  const Navigate = useNavigate();
  const token = getCookie("token");
  const { REACT_APP_API_URL } = process.env;

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({
    namaPenyakit: '',
    kodeICD: '',
    deskripsi: '',
    kategoriPenyakit: 'Metabolik',
    tingkatKeparahan: 'Sedang',
    panduanUmum: '',
    kontraindikasiMakanan: [],
    templateMingguan: []
  });

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const categories = ["Metabolik", "Kardiovaskular", "Ginjal", "Pencernaan", "Post-Operasi", "Lainnya"];
  const severities = ["Ringan", "Sedang", "Berat", "Kritis"];

  const fetchTemplates = useCallback(async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.get(`${REACT_APP_API_URL}/disease-template`, { headers });
      setTemplates(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setLoading(false);
    }
  }, [token, REACT_APP_API_URL]);

  useEffect(() => {
    if (!token) {
      Navigate("/admin");
    } else {
      fetchTemplates();
    }
  }, [token, Navigate, fetchTemplates]);

  const initializeDefaultTemplate = () => {
    const defaultDaily = days.map(hari => ({
      hari,
      kaloriPerKg: 25,
      persentaseKarbohidrat: 55,
      persentaseProtein: 15,
      persentaseLemak: 30,
      catatanMedis: '',
      pantanganMakanan: [],
      rekomendasiMakanan: []
    }));

    setCurrentTemplate(prev => ({
      ...prev,
      templateMingguan: defaultDaily
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (editMode) {
        await axios.patch(`${REACT_APP_API_URL}/disease-template/${currentTemplate._id}`, currentTemplate, { headers });
        console.log('✅ Disease template updated successfully');
      } else {
        await axios.post(`${REACT_APP_API_URL}/disease-template`, currentTemplate, { headers });
        console.log('✅ Disease template created successfully');
      }

      setShowModal(false);
      setEditMode(false);
      resetForm();
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (template) => {
    setCurrentTemplate(template);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (templateId, diseaseName) => {
    if (window.confirm(`Hapus template "${diseaseName}"?`)) {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        await axios.delete(`${REACT_APP_API_URL}/disease-template/${templateId}`, { headers });
        console.log('✅ Disease template deleted successfully');
        fetchTemplates();
      } catch (error) {
        console.error('Error deleting template:', error);
        alert('Error deleting template: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleAddNew = () => {
    resetForm();
    initializeDefaultTemplate();
    setEditMode(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentTemplate({
      namaPenyakit: '',
      kodeICD: '',
      deskripsi: '',
      kategoriPenyakit: 'Metabolik',
      tingkatKeparahan: 'Sedang',
      panduanUmum: '',
      kontraindikasiMakanan: [],
      templateMingguan: []
    });
  };

  const updateDailyTemplate = (dayIndex, field, value) => {
    const updatedTemplate = [...currentTemplate.templateMingguan];
    if (!updatedTemplate[dayIndex]) {
      updatedTemplate[dayIndex] = {
        hari: days[dayIndex],
        kaloriPerKg: 25,
        persentaseKarbohidrat: 55,
        persentaseProtein: 15,
        persentaseLemak: 30,
        catatanMedis: '',
        pantanganMakanan: [],
        rekomendasiMakanan: []
      };
    }
    updatedTemplate[dayIndex][field] = value;
    setCurrentTemplate(prev => ({ ...prev, templateMingguan: updatedTemplate }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading disease templates...</p>
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
                <h2 className="fw-bold text-primary">🦠 Kebutuhan Kalori & Gizi per Jenis Pasien</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Kebutuhan Gizi Pasien</li>
                  </ol>
                </nav>
              </div>
              <div>
                <Link to="/admin/patient-assignment" className="btn btn-info me-2">
                  👤 Assign ke Pasien
                </Link>
                <button 
                  className="btn btn-success"
                  onClick={handleAddNew}
                >
                  <i className="fas fa-plus"></i> Kebutuhan Gizi Baru
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Templates by Category */}
        {categories.map(category => {
          const categoryTemplates = templates.filter(t => t.kategoriPenyakit === category);
          if (categoryTemplates.length === 0) return null;

          return (
            <div key={category} className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">📋 {category} ({categoryTemplates.length} kebutuhan gizi)</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {categoryTemplates.map((template) => (
                        <div key={template._id} className="col-lg-6 mb-3">
                          <div className="card border-start border-4 border-primary">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h6 className="fw-bold">{template.namaPenyakit}</h6>
                                  <p className="text-muted small mb-2">{template.deskripsi}</p>
                                  <div className="d-flex gap-2 mb-2">
                                    <span className="badge bg-secondary">{template.tingkatKeparahan}</span>
                                    {template.kodeICD && (
                                      <span className="badge bg-info">ICD: {template.kodeICD}</span>
                                    )}
                                  </div>
                                  <div className="small text-muted">
                                    Avg: {Math.round(template.templateMingguan.reduce((sum, day) => sum + day.kaloriPerKg, 0) / 7)} kcal/kg
                                  </div>
                                </div>
                                <div className="dropdown">
                                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                                    Actions
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <button className="dropdown-item" onClick={() => handleEdit(template)}>
                                        <i className="fas fa-edit me-2"></i>Edit
                                      </button>
                                    </li>
                                    <li>
                                      <button className="dropdown-item text-danger" onClick={() => handleDelete(template._id, template.namaPenyakit)}>
                                        <i className="fas fa-trash me-2"></i>Delete
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Modal for Add/Edit Template */}
        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editMode ? 'Edit Kebutuhan Gizi Pasien' : 'Buat Kebutuhan Gizi Pasien Baru'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {/* Basic Disease Info */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Nama Penyakit *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={currentTemplate.namaPenyakit}
                          onChange={(e) => setCurrentTemplate(prev => ({ ...prev, namaPenyakit: e.target.value }))}
                          placeholder="Diabetes Mellitus Type 2"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Kode ICD</label>
                        <input
                          type="text"
                          className="form-control"
                          value={currentTemplate.kodeICD}
                          onChange={(e) => setCurrentTemplate(prev => ({ ...prev, kodeICD: e.target.value }))}
                          placeholder="E11.9"
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Kategori Penyakit *</label>
                        <select
                          className="form-control"
                          value={currentTemplate.kategoriPenyakit}
                          onChange={(e) => setCurrentTemplate(prev => ({ ...prev, kategoriPenyakit: e.target.value }))}
                          required
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Tingkat Keparahan *</label>
                        <select
                          className="form-control"
                          value={currentTemplate.tingkatKeparahan}
                          onChange={(e) => setCurrentTemplate(prev => ({ ...prev, tingkatKeparahan: e.target.value }))}
                          required
                        >
                          {severities.map(sev => (
                            <option key={sev} value={sev}>{sev}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Deskripsi Penyakit *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={currentTemplate.deskripsi}
                        onChange={(e) => setCurrentTemplate(prev => ({ ...prev, deskripsi: e.target.value }))}
                        placeholder="Deskripsi kondisi medis dan pendekatan diet..."
                        required
                      />
                    </div>

                    {/* Weekly Template */}
                    <h6 className="fw-bold mb-3">📅 Kebutuhan Kalori Mingguan (per kg berat badan)</h6>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-primary">
                          <tr>
                            <th>Hari</th>
                            <th>Kalori/kg</th>
                            <th>Karbo %</th>
                            <th>Protein %</th>
                            <th>Lemak %</th>
                            <th>Total %</th>
                            <th>Catatan Medis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {days.map((day, index) => {
                            const dayTemplate = currentTemplate.templateMingguan[index] || {
                              hari: day,
                              kaloriPerKg: 25,
                              persentaseKarbohidrat: 55,
                              persentaseProtein: 15,
                              persentaseLemak: 30,
                              catatanMedis: ''
                            };
                            
                            const totalPercentage = dayTemplate.persentaseKarbohidrat + dayTemplate.persentaseProtein + dayTemplate.persentaseLemak;
                            
                            return (
                              <tr key={day}>
                                <td className="fw-bold">{day}</td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayTemplate.kaloriPerKg}
                                    onChange={(e) => updateDailyTemplate(index, 'kaloriPerKg', Number(e.target.value))}
                                    min="15"
                                    max="50"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayTemplate.persentaseKarbohidrat}
                                    onChange={(e) => updateDailyTemplate(index, 'persentaseKarbohidrat', Number(e.target.value))}
                                    min="0"
                                    max="100"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayTemplate.persentaseProtein}
                                    onChange={(e) => updateDailyTemplate(index, 'persentaseProtein', Number(e.target.value))}
                                    min="0"
                                    max="100"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={dayTemplate.persentaseLemak}
                                    onChange={(e) => updateDailyTemplate(index, 'persentaseLemak', Number(e.target.value))}
                                    min="0"
                                    max="100"
                                  />
                                </td>
                                <td>
                                  <span className={`badge ${totalPercentage === 100 ? 'bg-success' : 'bg-warning'}`}>
                                    {totalPercentage}%
                                  </span>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={dayTemplate.catatanMedis}
                                    onChange={(e) => updateDailyTemplate(index, 'catatanMedis', e.target.value)}
                                    placeholder="Catatan medis..."
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Info:</strong> Total persentase makronutrien harus = 100%. 
                      Kalori per kg akan dikalikan dengan berat pasien saat assignment.
                    </div>
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
                      {editMode ? 'Update Kebutuhan Gizi' : 'Buat Kebutuhan Gizi'}
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
