import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../helpers";
import Layout from "../layouting/Layout";
import { getUSER, logout } from "../redux/actions/action.User";
import "../style/profile.css";

export default function Profile() {
	let token = getCookie("token");
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.UserReducer);
	const { User, loading } = profile;

	useEffect(() => {
		dispatch(getUSER());
	}, [dispatch]);

	const Navigate = useNavigate();
	if (!token) {
		Navigate("/unauthorized");
		return null;
	}

	// Calculate BMI
	const calculateBMI = () => {
		if (User?.berat && User?.tinggi) {
			const heightInMeters = User.tinggi / 100;
			const bmi = User.berat / (heightInMeters * heightInMeters);
			return bmi.toFixed(1);
		}
		return 0;
	};

	const getBMICategory = (bmi) => {
		if (bmi < 18.5) return { text: 'Underweight', class: 'bmi-underweight' };
		if (bmi >= 18.5 && bmi < 25) return { text: 'Normal', class: 'bmi-normal' };
		if (bmi >= 25 && bmi < 30) return { text: 'Overweight', class: 'bmi-overweight' };
		return { text: 'Obese', class: 'bmi-overweight' };
	};

	const bmi = calculateBMI();
	const bmiCategory = getBMICategory(parseFloat(bmi));

	return (
		<Layout>
			{loading ? (
				<div className="profile-loading">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="mt-3 text-muted">Memuat profil...</p>
				</div>
			) : User ? (
				<div className="profile-container">
					<div className="container">
						{/* Profile Header Card */}
						<div className="profile-header-card fade-in-up">
							<div className="profile-header-content">
								<div className="row align-items-center">
									<div className="col-md-4">
										<div className="profile-avatar-section">
											<div className="profile-avatar">
												<i className="fas fa-user"></i>
											</div>
											<h1 className="profile-name">{User?.nama || 'User'}</h1>
											<div className="profile-meta">
												<div className="profile-meta-item">
													<i className="fas fa-birthday-cake"></i>
													<span>{User?.umur || 0} tahun</span>
												</div>
												<div className="profile-meta-item">
													<i className="fas fa-venus-mars"></i>
													<span>{User?.jeniskelamin || '-'}</span>
												</div>
											</div>
											{bmi > 0 && (
												<div className={`bmi-badge ${bmiCategory.class}`}>
													<i className="fas fa-heartbeat"></i>
													BMI: {bmi} ({bmiCategory.text})
												</div>
											)}
										</div>
									</div>
									<div className="col-md-8">
										<div className="stats-grid">
											{/* Weight Card */}
											<div className="stat-card" style={{'--stat-color': '#667eea'}}>
												<div className="stat-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
													⚖️
												</div>
												<div className="stat-label">Berat Badan</div>
												<div className="stat-value">{User?.berat || 0}</div>
												<div className="stat-unit">kilogram</div>
											</div>

											{/* Height Card */}
											<div className="stat-card" style={{'--stat-color': '#f093fb'}}>
												<div className="stat-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
													📏
												</div>
												<div className="stat-label">Tinggi Badan</div>
												<div className="stat-value">{User?.tinggi || 0}</div>
												<div className="stat-unit">centimeter</div>
											</div>

											{/* Activity Card */}
											<div className="stat-card" style={{'--stat-color': '#4facfe'}}>
												<div className="stat-icon" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
													🏃
												</div>
												<div className="stat-label">Aktivitas Fisik</div>
												<div className="stat-value" style={{fontSize: '1.2rem'}}>
													{User?.aktivitasFisik?.keterangan || 'Sedang'}
												</div>
												<div className="stat-unit">Faktor: {User?.aktivitasFisik?.nilai || 1.3}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Nutrition Requirements */}
						<div className="nutrition-info-card fade-in-up" style={{animationDelay: '0.1s'}}>
							<h2 className="nutrition-info-title">
								<span>🎯</span> Kebutuhan Nutrisi Harian
							</h2>
							<div className="nutrition-info-grid">
								<div className="nutrition-info-item">
									<div className="nutrition-info-icon">🔥</div>
									<div className="nutrition-info-label">Total Kalori</div>
									<div className="nutrition-info-value">{(User?.kaloriYgDibutuhkan || 0).toFixed(0)} kcal</div>
								</div>
								<div className="nutrition-info-item">
									<div className="nutrition-info-icon">🍞</div>
									<div className="nutrition-info-label">Karbohidrat</div>
									<div className="nutrition-info-value">{(User?.gizi?.karbohidrat || 0).toFixed(0)} g</div>
								</div>
								<div className="nutrition-info-item">
									<div className="nutrition-info-icon">🥩</div>
									<div className="nutrition-info-label">Protein</div>
									<div className="nutrition-info-value">{(User?.gizi?.protein || 0).toFixed(0)} g</div>
								</div>
								<div className="nutrition-info-item">
									<div className="nutrition-info-icon">🥑</div>
									<div className="nutrition-info-label">Lemak</div>
									<div className="nutrition-info-value">{(User?.gizi?.lemak || 0).toFixed(0)} g</div>
								</div>
							</div>
						</div>

						{/* Action Menu */}
						<div className="action-menu-section">
							<div className="action-menu-grid">
								{/* Account Settings */}
								<Link 
									to="/akun" 
									className="action-menu-card slide-in-left"
									style={{
										'--menu-color': '#667eea',
										'--menu-bg': 'rgba(102, 126, 234, 0.05)',
										animationDelay: '0.2s'
									}}
								>
									<div className="action-menu-left">
										<div className="action-menu-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
											<i className="fas fa-user-cog"></i>
										</div>
										<div className="action-menu-text">
											<h5>Pengaturan Akun</h5>
											<p>Ubah password dan data akun</p>
										</div>
									</div>
									<div className="action-menu-arrow">
										<i className="fas fa-chevron-right"></i>
									</div>
								</Link>

								{/* Edit Profile */}
								<Link 
									to="/editprofile" 
									className="action-menu-card slide-in-left"
									style={{
										'--menu-color': '#f093fb',
										'--menu-bg': 'rgba(240, 147, 251, 0.05)',
										animationDelay: '0.3s'
									}}
								>
									<div className="action-menu-left">
										<div className="action-menu-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
											<i className="fas fa-user-edit"></i>
										</div>
										<div className="action-menu-text">
											<h5>Edit Profil</h5>
											<p>Update data diri dan kesehatan</p>
										</div>
									</div>
									<div className="action-menu-arrow">
										<i className="fas fa-chevron-right"></i>
									</div>
								</Link>


								{/* Logout */}
								<Link 
									to="/" 
									onClick={() => dispatch(logout)}
									className="action-menu-card slide-in-left"
									style={{
										'--menu-color': '#fc5c65',
										'--menu-bg': 'rgba(252, 92, 101, 0.05)',
										animationDelay: '0.3s'
									}}
								>
									<div className="action-menu-left">
										<div className="action-menu-icon" style={{background: 'linear-gradient(135deg, #fc5c65 0%, #eb3349 100%)'}}>
											<i className="fas fa-sign-out-alt"></i>
										</div>
										<div className="action-menu-text">
											<h5>Keluar</h5>
											<p>Logout dari akun anda</p>
										</div>
									</div>
									<div className="action-menu-arrow">
										<i className="fas fa-chevron-right"></i>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="profile-loading">
					<div className="alert alert-danger">
						<h5>Data Profile tidak ditemukan</h5>
						<p>Silakan login kembali</p>
						<Link to="/sign-in" className="btn btn-primary">Login</Link>
					</div>
				</div>
			)}
		</Layout>
	);
}
