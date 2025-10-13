import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCookie } from "../helpers";
import Layout from "../layouting/Layout";
import { getAkun } from "../redux/actions/action.akun";
import "../style/profile.css";
import AkunGoogle from "./AkunGoogle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Akun() {
	const token = getCookie("token");
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const akunState = useSelector((state) => state.akunReducers);
	const { akun, loading } = akunState;
	const { REACT_APP_API_URL } = process.env;

	// State for password change
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false
	});
	const [passwordData, setPasswordData] = useState({
		current_password: '',
		new_password: '',
		confirm_password: ''
	});
	const [alert, setAlert] = useState({ show: false, message: '', type: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		dispatch(getAkun());
	}, [dispatch]);

	useEffect(() => {
		if (alert.show) {
			const timer = setTimeout(() => {
				setAlert({ show: false, message: '', type: '' });
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [alert.show]);

	if (!token) {
		Navigate("/unauthorized");
	}

	const handleInputChange = (e) => {
		setPasswordData({
			...passwordData,
			[e.target.name]: e.target.value
		});
	};

	const togglePasswordVisibility = (field) => {
		setShowPassword({
			...showPassword,
			[field]: !showPassword[field]
		});
	};

	const handleChangePassword = async (e) => {
		e.preventDefault();
		
		// Validation
		if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
			setAlert({ show: true, message: 'Semua field harus diisi', type: 'danger' });
			return;
		}

		if (passwordData.new_password.length < 6) {
			setAlert({ show: true, message: 'Password baru minimal 6 karakter', type: 'danger' });
			return;
		}

		if (passwordData.new_password !== passwordData.confirm_password) {
			setAlert({ show: true, message: 'Konfirmasi password tidak cocok', type: 'danger' });
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await axios.patch(
				`${REACT_APP_API_URL}/akun/change-password`,
				passwordData,
				{ headers: { 'Authorization': `Bearer ${token}` } }
			);

			setAlert({ show: true, message: response.data.message || 'Password berhasil diubah!', type: 'success' });
			
			// Reset form
			setPasswordData({
				current_password: '',
				new_password: '',
				confirm_password: ''
			});

		} catch (error) {
			console.error('Change password error:', error);
			const errorMessage = error.response?.data?.message || 'Gagal mengubah password';
			setAlert({ show: true, message: errorMessage, type: 'danger' });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Layout>
			{!loading && akun ? (
				akun.email ? (
					<AkunGoogle email={akun.email}></AkunGoogle>
				) : (
					<div className="container-fluid">
						<div className="container py-4">
							<Link
								className="text-decoration-none text-black py-3 d-flex align-items-center"
								to="/profile"
							>
								<i className="fas fa-chevron-left me-2"></i>
								<h5 className="my-auto fw-bold">Pengaturan Akun</h5>
							</Link>
						</div>

						<div className="container">
							<div className="row justify-content-center">
								<div className="col-12 col-md-8 col-lg-6">
									<div className="card shadow-sm">
										<div className="card-body p-4">
											{/* Profile Picture */}
											<div className="text-center mb-4">
												<img
													src="https://www.pinclipart.com/picdir/big/220-2207735_avatars-clipart-generic-user-woman-people-icon-png.png"
													className="rounded-circle"
													height="100px"
													width="100px"
													alt="user avatar"
												/>
												<h6 className="mt-3 mb-1">Ubah Password</h6>
												<p className="text-muted small">No. Telepon: {akun.no_hp}</p>
											</div>

											{/* Alert */}
											{alert.show && (
												<div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
													{alert.message}
													<button 
														type="button" 
														className="btn-close" 
														onClick={() => setAlert({ show: false, message: '', type: '' })}
													></button>
												</div>
											)}

											{/* Change Password Form */}
											<form onSubmit={handleChangePassword}>
												{/* Current Password */}
												<div className="mb-3">
													<label htmlFor="current_password" className="form-label">
														<i className="fas fa-lock me-2"></i>
														Password Saat Ini
													</label>
													<div className="input-group">
														<input
															type={showPassword.current ? "text" : "password"}
															className="form-control"
															id="current_password"
															name="current_password"
															value={passwordData.current_password}
															onChange={handleInputChange}
															placeholder="Masukkan password saat ini"
															required
														/>
														<button
															className="btn btn-outline-secondary"
															type="button"
															onClick={() => togglePasswordVisibility('current')}
														>
															<i className={`fas fa-eye${showPassword.current ? '-slash' : ''}`}></i>
														</button>
													</div>
												</div>

												{/* New Password */}
												<div className="mb-3">
													<label htmlFor="new_password" className="form-label">
														<i className="fas fa-key me-2"></i>
														Password Baru
													</label>
													<div className="input-group">
														<input
															type={showPassword.new ? "text" : "password"}
															className="form-control"
															id="new_password"
															name="new_password"
															value={passwordData.new_password}
															onChange={handleInputChange}
															placeholder="Masukkan password baru (min. 6 karakter)"
															required
														/>
														<button
															className="btn btn-outline-secondary"
															type="button"
															onClick={() => togglePasswordVisibility('new')}
														>
															<i className={`fas fa-eye${showPassword.new ? '-slash' : ''}`}></i>
														</button>
													</div>
													<small className="text-muted">Minimal 6 karakter</small>
												</div>

												{/* Confirm Password */}
												<div className="mb-4">
													<label htmlFor="confirm_password" className="form-label">
														<i className="fas fa-check-circle me-2"></i>
														Konfirmasi Password Baru
													</label>
													<div className="input-group">
														<input
															type={showPassword.confirm ? "text" : "password"}
															className="form-control"
															id="confirm_password"
															name="confirm_password"
															value={passwordData.confirm_password}
															onChange={handleInputChange}
															placeholder="Ulangi password baru"
															required
														/>
														<button
															className="btn btn-outline-secondary"
															type="button"
															onClick={() => togglePasswordVisibility('confirm')}
														>
															<i className={`fas fa-eye${showPassword.confirm ? '-slash' : ''}`}></i>
														</button>
													</div>
												</div>

												{/* Submit Button */}
												<div className="d-grid gap-2">
													<button 
														type="submit" 
														className="btn btn-primary"
														disabled={isSubmitting}
													>
														{isSubmitting ? (
															<>
																<span className="spinner-border spinner-border-sm me-2" role="status"></span>
																Mengubah Password...
															</>
														) : (
															<>
																<i className="fas fa-save me-2"></i>
																Simpan Perubahan
															</>
														)}
													</button>
													<Link to="/profile" className="btn btn-outline-secondary">
														<i className="fas fa-times me-2"></i>
														Batal
													</Link>
												</div>
											</form>

											{/* Tips */}
											<div className="alert alert-info mt-4 mb-0">
												<h6 className="alert-heading">
													<i className="fas fa-info-circle me-2"></i>
													Tips Password Aman
												</h6>
												<ul className="mb-0 small">
													<li>Gunakan kombinasi huruf, angka, dan simbol</li>
													<li>Minimal 6 karakter (disarankan 8+)</li>
													<li>Jangan gunakan password yang mudah ditebak</li>
													<li>Ganti password secara berkala</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			) : (
				<div className="container text-center py-5">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="mt-3">Memuat data akun...</p>
				</div>
			)}
		</Layout>
	);
}
