import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../layouting/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";
import axios from "axios";

export default function AdminFoodManagement() {
  const Navigate = useNavigate();
  const token = getCookie("token");
  const { REACT_APP_API_URL } = process.env;

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFood, setCurrentFood] = useState({
    makanan: '',
    image: '',
    kaloriMakanan: '',
    karbohidrat: '',
    protein: '',
    lemak: '',
    karbon: '',
    porsi: '',
    penyetaraanPorsi: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchFoods = useCallback(async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/food`);
      setFoods(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching foods:', error);
      setLoading(false);
    }
  }, [REACT_APP_API_URL]);

  useEffect(() => {
    if (!token) {
      Navigate("/admin");
    } else {
      fetchFoods();
    }
  }, [token, Navigate, fetchFoods]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let foodData = { ...currentFood };

      // Upload image if selected
      if (selectedImage) {
        const uploadedImageUrl = await uploadImage();
        if (uploadedImageUrl) {
          foodData.image = uploadedImageUrl;
        }
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (editMode) {
        // Update food
        await axios.patch(`${REACT_APP_API_URL}/food/${currentFood._id}`, foodData, { headers });
        console.log('✅ Food updated successfully');
      } else {
        // Add new food
        await axios.post(`${REACT_APP_API_URL}/food`, foodData, { headers });
        console.log('✅ Food added successfully');
      }

      // Reset form
      setShowModal(false);
      setEditMode(false);
      setCurrentFood({
        makanan: '',
        image: '',
        kaloriMakanan: '',
        karbohidrat: '',
        protein: '',
        lemak: '',
        karbon: '',
        porsi: '',
        penyetaraanPorsi: ''
      });
      setSelectedImage(null);
      setImagePreview('');
      fetchFoods(); // Refresh list
    } catch (error) {
      console.error('Error saving food:', error);
      alert('Error saving food: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (food) => {
    setCurrentFood(food);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (foodId, foodName) => {
    if (window.confirm(`Are you sure you want to delete "${foodName}"?`)) {
      try {
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        await axios.delete(`${REACT_APP_API_URL}/food/${foodId}`, { headers });
        console.log('✅ Food deleted successfully');
        fetchFoods(); // Refresh list
      } catch (error) {
        console.error('Error deleting food:', error);
        alert('Error deleting food: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleAddNew = () => {
    setCurrentFood({
      makanan: '',
      image: '',
      kaloriMakanan: '',
      karbohidrat: '',
      protein: '',
      lemak: '',
      karbon: '',
      porsi: '',
      penyetaraanPorsi: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFood(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await axios.post(`${REACT_APP_API_URL}/food/upload-image`, formData, { headers });
      console.log('✅ Image uploaded:', response.data.imageUrl);
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + (error.response?.data?.message || error.message));
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading foods...</p>
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
                <h2 className="fw-bold text-primary">🍽️ Food Management</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Food Management</li>
                  </ol>
                </nav>
              </div>
              <button 
                className="btn btn-success"
                onClick={handleAddNew}
              >
                <i className="fas fa-plus"></i> Add New Food
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Food List ({foods.length} items)</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Calories</th>
                        <th>Carbs</th>
                        <th>Protein</th>
                        <th>Fat</th>
                        <th>Carbon</th>
                        <th>Portion</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foods.map((food) => (
                        <tr key={food._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={food.image} 
                                alt={food.makanan}
                                className="me-2"
                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/40x40?text=Food';
                                }}
                              />
                              <strong>{food.makanan}</strong>
                            </div>
                          </td>
                          <td>{food.kaloriMakanan} kcal</td>
                          <td>{food.karbohidrat}g</td>
                          <td>{food.protein}g</td>
                          <td>{food.lemak}g</td>
                          <td>{food.karbon}</td>
                          <td>{food.porsi} ({food.penyetaraanPorsi})</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit(food)}
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(food._id, food.makanan)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Add/Edit Food */}
        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editMode ? 'Edit Food' : 'Add New Food'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Food Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="makanan"
                            value={currentFood.makanan}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Image</label>
                          <div className="row">
                            <div className="col-12 mb-2">
                              <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                              <small className="text-muted">Upload image file (max 5MB) or use URL below</small>
                            </div>
                            <div className="col-12">
                              <input
                                type="url"
                                className="form-control"
                                name="image"
                                value={currentFood.image}
                                onChange={handleInputChange}
                                placeholder="Or paste image URL here"
                              />
                            </div>
                          </div>
                          {/* Image Preview */}
                          {(imagePreview || currentFood.image) && (
                            <div className="mt-2">
                              <img
                                src={imagePreview || currentFood.image}
                                alt="Preview"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  border: '1px solid #ddd'
                                }}
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Calories *</label>
                          <input
                            type="number"
                            className="form-control"
                            name="kaloriMakanan"
                            value={currentFood.kaloriMakanan}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Carbs (g) *</label>
                          <input
                            type="number"
                            step="0.1"
                            className="form-control"
                            name="karbohidrat"
                            value={currentFood.karbohidrat}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Protein (g) *</label>
                          <input
                            type="number"
                            step="0.1"
                            className="form-control"
                            name="protein"
                            value={currentFood.protein}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Fat (g) *</label>
                          <input
                            type="number"
                            step="0.1"
                            className="form-control"
                            name="lemak"
                            value={currentFood.lemak}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Carbon Footprint *</label>
                          <input
                            type="number"
                            step="0.1"
                            className="form-control"
                            name="karbon"
                            value={currentFood.karbon}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Portion *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="porsi"
                            value={currentFood.porsi}
                            onChange={handleInputChange}
                            placeholder="100g"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Portion Equivalent *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="penyetaraanPorsi"
                            value={currentFood.penyetaraanPorsi}
                            onChange={handleInputChange}
                            placeholder="1 centong"
                            required
                          />
                        </div>
                      </div>
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
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Uploading Image...
                        </>
                      ) : (
                        editMode ? 'Update Food' : 'Add Food'
                      )}
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
