/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Layout from "../layouting/Layout";
import { Doughnut } from "react-chartjs-2";
import "../style/PieChart.css";
import "../style/HomeLogin.css";
import { Link } from "react-router-dom";
import { getTracking } from "../redux/actions/action.tracking";

import { getMakanan } from "../redux/actions/action.makanan";
import { useDispatch, useSelector } from "react-redux";
import { getUSER } from "../redux/actions/action.User";
import "../style/card-makanan.css";
import CardResep from "../components/CardResep";
import { getResep } from "../redux/actions/action.resep";
import LoadingComponent from "../components/Loading";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function HomeLogin() {
	const dispatch = useDispatch();

	const allMakananState = useSelector((state) => state.allmakananReducer);
	const HistoryState = useSelector((state) => state.trackingReducer);

	const { allMakanan, loading } = allMakananState;

	const UserState = useSelector((state) => state.UserReducer);
	const UserLoading = UserState.loading;
	const { User } = UserState;

	const resepState = useSelector((state) => state.ResepReducer);
	const { resep } = resepState;
	const resepLoading = resepState.loading;

	const [persenkalori, setpersen] = useState(0);

	const StatsProfile = ({ grid, colors, image, nutrisi, angka }) => (
		<div
			className={grid + " shadow d-flex flex-column"}
			style={{ borderRadius: "5px" }}
		>
			<div
				className="p-3 mx-auto my-3"
				style={{ borderRadius: "50%", backgroundColor: colors }}
			>
				<img
					src={image}
					height={"40px"}
					className="ms-auto me-auto"
					alt={"icon"}
				/>
			</div>

			<h6 className="text-center">{nutrisi}</h6>
			<h6 className="fw-bold text-center mt-2 mb-4">{angka}</h6>
		</div>
	);

	// chart js

	const data = (kalori, maxkalori) => ({
		labels: ["kalori anda"],
		datasets: [
			{
				label: "# of Votes",
				data: [kalori, maxkalori - kalori < 0 ? 0 : maxkalori - kalori],
				backgroundColor: ["#1AA7EC", "transparent"],

				borderColor: ["#1AA7EC", "transparent"],
				borderWidth: 1,
				borderRadius: [100, 100],
			},
		],
	});

	const data1 = {
		labels: ["kalori anda"],
		datasets: [
			{
				label: "# of Votes",
				data: [30],
				backgroundColor: ["#d9d9d9"],
				borderColor: ["white"],
				borderWidth: 1,
				borderRadius: [100],
			},
		],
	};

	const options1 = {
		rotation: 225,
		animation: {
			duration: 0,
		},
		circumference: 270,
		plugins: {
			legend: {
				display: false,
			},
		},
		cutout: "85%",
		responsive: true,
		maintainAspectRatio: true,
	};

	const options = () => ({
		rotation: 225,
		plugins: {
			legend: {
				display: false,
			},
		},
		circumference: 270,
		tooltip: {
			enabled: false,
		},
		cutout: "85%",
		responsive: true,
		maintainAspectRatio: true,
	});

	useEffect(() => {
		dispatch(getUSER());
		dispatch(getMakanan());
		dispatch(getTracking());
		dispatch(getResep());
	}, [dispatch, UserLoading]);

	// Calculate nutrition data
	const currentCalories = HistoryState.tracking?.tracking?.totKalori || 0;
	const targetCalories = User?.kaloriYgDibutuhkan || 2000;
	const caloriePercentage = Math.min(Math.round((currentCalories / targetCalories) * 100), 100);
	
	const currentCarbs = HistoryState.tracking?.totKarbohidrat || 0;
	const targetCarbs = User?.gizi?.karbohidrat || 300;
	const carbsPercentage = Math.min(Math.round((currentCarbs / targetCarbs) * 100), 100);
	
	const currentProtein = HistoryState.tracking?.totProtein || 0;
	const targetProtein = User?.gizi?.protein || 75;
	const proteinPercentage = Math.min(Math.round((currentProtein / targetProtein) * 100), 100);
	
	const currentFat = HistoryState.tracking?.totLemak || 0;
	const targetFat = User?.gizi?.lemak || 67;
	const fatPercentage = Math.min(Math.round((currentFat / targetFat) * 100), 100);

	return (
		<Layout>
			{UserLoading ? (
				<LoadingComponent />
			) : (
				<div className="container py-4 fade-in-up">
					{/* Modern Hero Section */}
					<div className="hero-modern">
						<div className="hero-content">
							<div className="row align-items-center">
								<div className="col-md-8">
									<h1 className="hero-title">
										👋 Halo, {User?.nama || 'User'}!
							</h1>
									<p className="hero-subtitle">
										Apa kabar? Mari kita pantau nutrisi anda hari ini
									</p>
									<div className="hero-stats">
										<div className="hero-stat-item">
											<div className="hero-stat-label">Target Kalori</div>
											<div className="hero-stat-value">{targetCalories.toFixed(0)} <small style={{fontSize: '0.6em'}}>kcal</small></div>
										</div>
										<div className="hero-stat-item">
											<div className="hero-stat-label">Terpenuhi</div>
											<div className="hero-stat-value">{caloriePercentage}%</div>
										</div>
										<div className="hero-stat-item">
											<div className="hero-stat-label">Tracking Hari Ini</div>
											<div className="hero-stat-value">{currentCalories.toFixed(0)} <small style={{fontSize: '0.6em'}}>kcal</small></div>
										</div>
									</div>
						</div>
								<div className="col-md-4 d-none d-md-flex justify-content-center">
						<img
							src="https://i.ibb.co/xzBt8gh/Mesa-de-trabajo-1-EAT-3.png"
										alt="Nutrition Icon"
										style={{ maxHeight: '200px', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}
						/>
								</div>
							</div>
						</div>
					</div>

					{/* Nutrition Tracking Section */}
					<div className="nutrition-section">
						<div className="d-flex justify-content-between align-items-center mb-4">
							<h2 className="section-title">
								<span>📊</span> Tracking Nutrisi Hari Ini
							</h2>
							<Link to="/tracking-nutrisi" className="btn btn-outline-primary rounded-pill px-4">
								<i className="fas fa-chart-line me-2"></i>
								Lihat Detail
						</Link>
					</div>

						{/* Nutrition Cards Grid */}
						<div className="nutrition-grid">
							{/* Calorie Card */}
							<div className="nutrition-card" style={{'--card-color': '#667eea'}}>
								<div className="nutrition-card-header">
									<div className="nutrition-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
										🔥
													</div>
									<div className="nutrition-percentage">{caloriePercentage}%</div>
													</div>
								<div className="nutrition-title">Kalori</div>
								<div className="nutrition-progress">
									<div 
										className="nutrition-progress-bar" 
										style={{
											width: `${caloriePercentage}%`,
											background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
										}}
									></div>
													</div>
								<div className="nutrition-values">
									<span className="value-current">{currentCalories.toFixed(0)} kcal</span>
									<span className="value-target">/ {targetCalories.toFixed(0)} kcal</span>
											</div>
										</div>

							{/* Carbs Card */}
							<div className="nutrition-card" style={{'--card-color': '#f093fb'}}>
								<div className="nutrition-card-header">
									<div className="nutrition-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
										🍞
									</div>
									<div className="nutrition-percentage">{carbsPercentage}%</div>
								</div>
								<div className="nutrition-title">Karbohidrat</div>
								<div className="nutrition-progress">
									<div 
										className="nutrition-progress-bar" 
										style={{
											width: `${carbsPercentage}%`,
											background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)'
										}}
									></div>
								</div>
								<div className="nutrition-values">
									<span className="value-current">{currentCarbs.toFixed(1)} g</span>
									<span className="value-target">/ {targetCarbs.toFixed(1)} g</span>
								</div>
										</div>

							{/* Protein Card */}
							<div className="nutrition-card" style={{'--card-color': '#4facfe'}}>
								<div className="nutrition-card-header">
									<div className="nutrition-icon" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
										🥩
									</div>
									<div className="nutrition-percentage">{proteinPercentage}%</div>
								</div>
								<div className="nutrition-title">Protein</div>
								<div className="nutrition-progress">
									<div 
										className="nutrition-progress-bar" 
										style={{
											width: `${proteinPercentage}%`,
											background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
										}}
									></div>
								</div>
								<div className="nutrition-values">
									<span className="value-current">{currentProtein.toFixed(1)} g</span>
									<span className="value-target">/ {targetProtein.toFixed(1)} g</span>
								</div>
							</div>

							{/* Fat Card */}
							<div className="nutrition-card" style={{'--card-color': '#43e97b'}}>
								<div className="nutrition-card-header">
									<div className="nutrition-icon" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
										🥑
									</div>
									<div className="nutrition-percentage">{fatPercentage}%</div>
								</div>
								<div className="nutrition-title">Lemak</div>
								<div className="nutrition-progress">
									<div 
										className="nutrition-progress-bar" 
										style={{
											width: `${fatPercentage}%`,
											background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)'
										}}
									></div>
								</div>
								<div className="nutrition-values">
									<span className="value-current">{currentFat.toFixed(1)} g</span>
									<span className="value-target">/ {targetFat.toFixed(1)} g</span>
								</div>
							</div>
						</div>
					</div>
					{/* Quick Actions */}
					<div className="mt-5">
						<h2 className="section-title mb-4">
							<span>⚡</span> Quick Actions
						</h2>
						<div className="quick-actions">
							<Link to="/pilih-makanan" className="action-card" style={{'--action-color': '#667eea'}}>
								<div className="action-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
									🍽️
								</div>
								<div className="action-title">Pilih Makanan</div>
								<div className="action-description">Tambah makanan ke tracking harian</div>
							</Link>

							<Link to="/rekomendasi" className="action-card" style={{'--action-color': '#f093fb'}}>
								<div className="action-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
									⭐
								</div>
								<div className="action-title">Rekomendasi</div>
								<div className="action-description">Dapatkan saran makanan sehat</div>
							</Link>

							<Link to="/tracking-nutrisi" className="action-card" style={{'--action-color': '#4facfe'}}>
								<div className="action-icon" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
									📊
								</div>
								<div className="action-title">History Tracking</div>
								<div className="action-description">Lihat riwayat nutrisi anda</div>
							</Link>

							<Link to="/karbon" className="action-card" style={{'--action-color': '#43e97b'}}>
								<div className="action-icon" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
									🌱
								</div>
								<div className="action-title">Dampak Karbon</div>
								<div className="action-description">Pantau jejak karbon makanan</div>
							</Link>
						</div>
					</div>

					{/* Meal Time Recommendations */}
					<div className="mt-5">
						<h2 className="section-title mb-4">
							<span>🍴</span> Rekomendasi Waktu Makan
						</h2>
						<div className="row g-3">
							<div className="col-md-4">
							<Link
								to="/rekomendasi#sarapan"
									className="action-card h-100"
									style={{'--action-color': '#ffa726'}}
								>
									<div className="action-icon" style={{background: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)'}}>
										☀️
									</div>
									<div className="action-title">Sarapan</div>
									<div className="action-description">07:00 - 09:00</div>
							</Link>
							</div>
							<div className="col-md-4">
							<Link
								to="/rekomendasi#makansiang"
									className="action-card h-100"
									style={{'--action-color': '#ef5350'}}
								>
									<div className="action-icon" style={{background: 'linear-gradient(135deg, #ef5350 0%, #e53935 100%)'}}>
										🌤️
									</div>
									<div className="action-title">Makan Siang</div>
									<div className="action-description">12:00 - 14:00</div>
							</Link>
							</div>
							<div className="col-md-4">
							<Link
								to="/rekomendasi#makanmalam"
									className="action-card h-100"
									style={{'--action-color': '#5c6bc0'}}
								>
									<div className="action-icon" style={{background: 'linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%)'}}>
										🌙
									</div>
									<div className="action-title">Makan Malam</div>
									<div className="action-description">18:00 - 20:00</div>
							</Link>
							</div>
						</div>
					</div>

					{/* Recipe Section */}
					<div className="recipe-section mt-5 mb-5">
						<div className="recipe-header">
							<h2 className="section-title">
								<span>📖</span> Resep Populer
							</h2>
							<Link to="/resep" className="btn btn-outline-primary rounded-pill px-4">
								<i className="fas fa-book me-2"></i>
								Lihat Semua
							</Link>
						</div>

						<div className="recipe-grid">
							{!resepLoading && resep?.length > 0
								? resep.slice(-3).map((data, index) => (
										<div key={data._id} className="fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
											<Link
												className="pointer text-decoration-none"
												to={`/resep/detail/${data._id}`}
											>
												<CardResep
													imageUrl={data.idMakanan?.image}
													kalori={data.idMakanan?.kaloriMakanan}
													karbon={data.idMakanan?.karbon}
													title={data.idMakanan?.makanan}
													key={data._id}
												></CardResep>
											</Link>
										</div>
								  ))
								: (
									<div className="col-12 text-center py-5">
										<p className="text-muted">Belum ada resep tersedia</p>
										<Link to="/resep" className="btn btn-primary mt-2">
											Jelajahi Resep
										</Link>
									</div>
								)}
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
}
