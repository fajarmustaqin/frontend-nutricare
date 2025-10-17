/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "../style/historykarbon.css";
import { getCookie } from "../helpers";
import "react-datepicker/dist/react-datepicker.css";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../style/PieChart.css";
import { useDispatch, useSelector } from "react-redux";
import { getKeranjang } from "../redux/actions/action.keranjang";
import Layout from "../layouting/Layout";
import { Post_data_to_history } from "../redux/actions/actions.tohistory";
import { Link, useNavigate } from "react-router-dom";
import { GetPorsi, TambahPorsi, KurangiPorsi } from "../redux/actions/actionPorsiMakanan";
import { getTracking } from "../redux/actions/action.tracking";
import LoadingComponent from "../components/Loading";


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

// ModernTrackingCard Component
const ModernTrackingCard = ({ image, namamakanan, infoporsi, kuantitas, modals = true, porsirekomendasi, id, dispatch }) => {
	return (
		<div className="modern-tracking-card">
			<div className="card-content">
				<div className="food-image-section">
					<img
						src={image}
						alt={namamakanan}
						className="food-image"
					/>
					<div className="image-overlay">
						<span className="portion-info">{infoporsi}</span>
					</div>
				</div>
				
				<div className="food-details">
					<div className="food-info">
						<h5 className="food-name">{namamakanan}</h5>
						<p className="food-portion">{infoporsi}</p>
					</div>
					
					<div className="quantity-controls">
						<button
							className="control-btn minus-btn"
							onClick={() => dispatch(KurangiPorsi(id))}
						>
							<i className="fas fa-minus"></i>
						</button>
						<div className="quantity-display">
							<span className="quantity-number">{kuantitas || 0}</span>
						</div>
						<button
							className="control-btn plus-btn"
							onClick={() => dispatch(TambahPorsi(id))}
						>
							<i className="fas fa-plus"></i>
						</button>
					</div>
				</div>
			</div>

			<style jsx>{`
				.modern-tracking-card {
					background: white;
					border-radius: 20px;
					box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
					overflow: hidden;
					transition: all 0.3s ease;
				}

				.modern-tracking-card:hover {
					transform: translateY(-5px);
					box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
				}

				.card-content {
					display: flex;
					gap: 20px;
					padding: 20px;
				}

				.food-image-section {
					position: relative;
					flex-shrink: 0;
				}

				.food-image {
					width: 100px;
					height: 100px;
					object-fit: cover;
					border-radius: 15px;
				}

				.image-overlay {
					position: absolute;
					bottom: 5px;
					left: 5px;
					right: 5px;
					background: rgba(0, 0, 0, 0.7);
					color: white;
					padding: 5px 10px;
					border-radius: 10px;
					text-align: center;
				}

				.portion-info {
					font-size: 0.7rem;
					font-weight: 600;
				}

				.food-details {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.food-info {
					flex: 1;
				}

				.food-name {
					font-size: 1.1rem;
					font-weight: 700;
					color: #2d3748;
					margin-bottom: 8px;
					line-height: 1.3;
				}

				.food-portion {
					font-size: 0.85rem;
					color: #718096;
					margin: 0;
				}

				.quantity-controls {
					display: flex;
					align-items: center;
					gap: 15px;
					background: #f8fafc;
					padding: 10px 15px;
					border-radius: 15px;
				}

				.control-btn {
					width: 35px;
					height: 35px;
					border: none;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					transition: all 0.3s ease;
					font-size: 0.9rem;
				}

				.minus-btn {
					background: #fed7d7;
					color: #e53e3e;
				}

				.plus-btn {
					background: #c6f6d5;
					color: #38a169;
				}

				.control-btn:hover {
					transform: scale(1.1);
				}

				.quantity-display {
					min-width: 40px;
					text-align: center;
				}

				.quantity-number {
					font-size: 1.3rem;
					font-weight: 700;
					color: #2d3748;
				}

				@media (max-width: 768px) {
					.card-content {
						flex-direction: column;
						text-align: center;
					}

					.food-image {
						width: 80px;
						height: 80px;
					}

					.food-details {
						flex-direction: column;
						gap: 15px;
					}
				}
			`}</style>
		</div>
	);
};

export default function KeranjangMakanan() {
	const Navigate = useNavigate();
	const config = {
		layout: {
			padding: {
				left: 30,
				bottom: 50,
				top: 20,
				right: 30,
			},
		},
		indexAxis: "x",
		plugins: {
			legend: {
				display: false,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				display: false,
				stacked: true,
			},
			x: {
				display: true,
				grid: {
					drawBorder: false,
					display: false,
				},
				stacked: true,
				ticks: {
					display: true,
					maxRotation: 0,
					minRotation: 0,
				},
			},
		},
	};
	const config1 = {
		indexAxis: "x",
		layout: {
			padding: {
				left: 30,
				bottom: 50,
				top: 20,
				right: 30,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
		animation: {
			duration: 0,
		},
		events: [],
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				display: false,
				stacked: true,
			},
			x: {
				display: true,
				grid: {
					drawBorder: false,
					display: false,
				},
				stacked: true,
				ticks: {
					display: true,
					maxRotation: 0,
					minRotation: 0,
				},
			},
		},
	};
	const config2 = {
		indexAxis: "y",
		layout: {
			padding: {
				left: 30,
				bottom: 30,
				top: 20,
				right: 30,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
		animation: {
			duration: 0,
		},
		events: [],
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				display: false,
				stacked: true,
			},
			x: {
				display: false,
				stacked: true,
			},
		},
	};
	const configkalori = {
		indexAxis: "y",
		layout: {
			padding: {
				left: 30,
				bottom: 30,
				top: 20,
				right: 30,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				display: false,
				stacked: true,
			},
			x: {
				display: false,
				stacked: true,
			},
		},
	};
	let local = localStorage.getItem("pilih_makanan") || "[]";
	local = JSON.parse(local);
	let id = [];
	local.map((data) => id.push(data.makananID));

	const dispatch = useDispatch();

	const KeranjangState = useSelector((state) => state.keranjangReducer);
	const Porsi = useSelector((state) => state.PorsiReducer);
	const PorsiState = Porsi.local;

	function Findporsi(ID) {
		let porsi = PorsiState.filter((data) => data.makananID === ID);
		if (porsi.length > 0) {
			porsi = porsi[0].porsi;
			return porsi;
		} else {
			return false;
		}
	}
	let jumlah = PorsiState.map((data) => data.porsi);
	let { keranjang } = KeranjangState;
	let DataKeranjang = keranjang.data;
	let Loading = KeranjangState.loading;
	let Totalprotein,
		Totallemak,
		Totalkarbohidrat,
		Totalkarbon,
		Totalkalori = [];

	function getData() {
		if (DataKeranjang.length !== jumlah.length) {
			let distance = DataKeranjang.length - jumlah.length;
			for (let i = 0; i < distance; i++) {
				jumlah.push(0);
			}
		}

		Totalprotein = DataKeranjang.map((data) => data.protein);
		Totallemak = DataKeranjang.map((data) => data.lemak);
		Totalkarbohidrat = DataKeranjang.map((data) => data.karbohidrat);
		Totalkalori = DataKeranjang.map((data) => data.kaloriMakanan);
		Totalkarbon = DataKeranjang.map((data) => data.karbon);

		Totalprotein = Totalprotein.reduce(function (r, a, i) {
			return r + a * jumlah[i];
		}, 0);
		Totallemak = Totallemak.reduce(function (r, a, i) {
			return r + a * jumlah[i];
		}, 0);
		Totalkarbohidrat = Totalkarbohidrat.reduce(function (r, a, i) {
			return r + a * jumlah[i];
		}, 0);
		Totalkalori = Totalkalori.reduce(function (r, a, i) {
			return r + a * jumlah[i];
		}, 0);
		Totalkarbon = Totalkarbon.reduce(function (r, a, i) {
			return r + a * jumlah[i];
		}, 0);
		Totalkarbohidrat = Totalkarbohidrat.toFixed(2);
		Totallemak = Totallemak.toFixed(2);
		Totalprotein = Totalprotein.toFixed(2);
		Totalkalori = Totalkalori.toFixed(2);
		Totalkarbon = Totalkarbon.toFixed(2);
	}

	const data = (karbohidrat, protein, lemak) => ({
		labels: [
			`Karbohidrat ${Totalkarbohidrat} gr`,
			`Protein ${Totalprotein} gr`,
			`Lemak ${Totallemak} gr`,
		],
		datasets: [
			{
				label: "Dipenuhi",
				data: [karbohidrat, protein, lemak],
				backgroundColor: ["#1B7FD6", "#1B7FD6"],
				borderColor: ["#1B7FD6", "#1B7FD6"],
				borderWidth: 1,
				borderRadius: {
					topLeft: 50,
					topRight: 50,
					bottomLeft: 50,
					bottomRight: 50,
				},
				borderSkipped: false,
				barThickness: 30,
				barPercentage: 0.9,
				categoryPercentage: 1,
			},
			{
				label: "belum terpenuhi",
				data: [100 - karbohidrat, 100 - protein, 100 - lemak],
				backgroundColor: ["transparent"],
				borderColor: ["transparent"],
				borderWidth: 1,
				borderRadius: {
					topLeft: 50,
					topRight: 50,
					bottomLeft: 50,
					bottomRight: 50,
				},
				borderSkipped: false,
				barThickness: 30,
				barPercentage: 0.9,
				categoryPercentage: 1,
			},
		],
	});
	const dataKalori = (Kalori) => ({
		labels: ["Kalori"],
		datasets: [
			{
				label: "Dipenuhi",
				data: [Kalori],
				backgroundColor: ["##F9AC3A"],
				borderColor: ["#F9AC3A"],
				borderWidth: 1,
				borderRadius: {
					topLeft: 50,
					topRight: 50,
					bottomLeft: 50,
					bottomRight: 50,
				},
				borderSkipped: false,
				barThickness: 30,
			},
			{
				label: "belum terpenuhi",
				data: [100 - Kalori],
				backgroundColor: ["transparent"],
				borderColor: ["transparent"],
				borderWidth: 1,
				borderRadius: {
					topLeft: 50,
					topRight: 50,
					bottomLeft: 50,
					bottomRight: 50,
				},
				borderSkipped: false,
				barThickness: 30,
			},
		],
	});
	const data1 = () => ({
		labels: [
			`Karbohidrat ${Totalkarbohidrat} gr`,
			`Protein ${Totalprotein} gr`,
			`Lemak ${Totallemak} gr`,
		],
		datasets: [
			{
				data: [100, 100, 100],
				backgroundColor: ["#CCE6F5"],
				borderColor: ["#CCE6F5"],
				borderWidth: 1,
				borderRadius: {
					topLeft: 50,
					topRight: 50,
					bottomLeft: 50,
					bottomRight: 50,
				},
				borderSkipped: false,
				barThickness: 30,
			},
		],
	});
	const dataKalori2 = () => ({
		labels: ["Kalori"],
		datasets: [
			{
				data: [100],
				backgroundColor: ["#F2F5CC"],
				borderColor: ["#F2F5CC"],
				borderWidth: 1,
				borderRadius: {
					topLeft: 50,
					topRight: 50,
					bottomLeft: 50,
					bottomRight: 50,
				},
				borderSkipped: false,
				barThickness: 30,
			},
		],
	});
	let persenprotein,
		persenkalori,
		persenkarbohidrat,
		persenlemak = 0;
	function protein(protein, maxprotein) {
		persenprotein = (protein / maxprotein) * 100;
		if (persenprotein > 100) {
			persenprotein = 100;
		}
		return persenprotein;
	}
	function lemak(lemak, maxlemak) {
		persenlemak = (lemak / maxlemak) * 100;
		if (persenlemak > 100) {
			persenlemak = 100;
		}
		return persenlemak;
	}
	function karbohidrat(karbohidrat, maxkarbohidrat) {
		persenkarbohidrat = (karbohidrat / maxkarbohidrat) * 100;
		if (persenkarbohidrat > 100) {
			persenkarbohidrat = 100;
		}
		return persenkarbohidrat;
	}
	function kalori(kalori, maxkalori) {
		persenkalori = (kalori / maxkalori) * 100;
		if (persenkalori > 100) {
			persenkalori = 100;
		}
		return persenkalori;
	}

	let postkalori = Totalkalori;
	let postkarbon = Totalkarbon;
	let postmakanan = PorsiState;

	if (!Loading) {
		getData();
		postkalori = Totalkalori;
		postkarbon = Totalkarbon;
		postmakanan = PorsiState;
	}
	// let status = false;;
	useEffect(() => {
		dispatch(getKeranjang(id));
		dispatch(GetPorsi());
	}, [dispatch]);

	const handleSelesai = (postmakanan, postkalori, postkarbon) => {
		dispatch(Post_data_to_history(postmakanan, postkalori, postkarbon));
		dispatch(getTracking())
		Navigate("/tracking-nutrisi");
	};
	let token = getCookie("token");
	if (!token) {
		Navigate("/unauthorized");
	}

	return (
		<Layout>
			{/* Hero Section */}
			<section className="cart-hero">
				<div className="container py-5">
					<div className="row align-items-center">
						<div className="col-12 col-md-8">
							<div className="hero-content">
								<h1 className="hero-title">
									<span className="gradient-text">Keranjang</span> Makanan
									<span className="decoration">🛒</span>
								</h1>
								<p className="hero-subtitle">
									Review makanan pilihanmu dan selesaikan tracking nutrisi hari ini
								</p>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="cart-summary">
								<div className="summary-item">
									<span className="summary-label">Total Item</span>
									<span className="summary-value">{DataKeranjang?.length || 0}</span>
								</div>
								<div className="summary-divider"></div>
								<div className="summary-item">
									<span className="summary-label">Total Kalori</span>
									<span className="summary-value">{Totalkalori || 0}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{!Loading ? (
				<div className="cart-container">
					<div className="container">
						<div className="row">
							{/* Food Items */}
							<div className="col-12 col-lg-7">
								<div className="cart-section">
									<div className="section-header">
										<h3 className="section-title">
											<i className="fas fa-utensils me-2"></i>
											Makanan Dipilih
										</h3>
										<span className="item-count">{DataKeranjang.length} item</span>
									</div>
									
									<div className="food-items">
										{DataKeranjang.map((data, index) => (
											<div key={data._id} className="cart-item">
												<ModernTrackingCard
													image={data.image}
													namamakanan={data.makanan}
													modals={false}
													id={data._id}
													protein={data.protein}
													karbohidrat={data.karbohidrat}
													lemak={data.lemak}
													kalori={data.kalori}
													kuantitas={Findporsi(data._id)}
													infoporsi={data.porsi}
													dispatch={dispatch}
												/>
											</div>
										))}
										
										{DataKeranjang.length === 0 && (
											<div className="empty-cart">
												<div className="empty-icon">
													<i className="fas fa-shopping-cart"></i>
												</div>
												<h4>Keranjang Kosong</h4>
												<p>Belum ada makanan yang dipilih</p>
												<Link to="/pilih-makanan" className="btn btn-primary">
													<i className="fas fa-plus me-2"></i>
													Tambah Makanan
												</Link>
											</div>
										)}
									</div>
									
									{DataKeranjang.length > 0 && (
										<div className="add-more-container">
											<Link to="/pilih-makanan" className="add-more-btn">
												<i className="fas fa-plus"></i>
												Tambah Makanan Lain
											</Link>
										</div>
									)}
								</div>
							</div>

							{/* Nutrition Summary */}
							<div className="col-12 col-lg-5">
								<div className="nutrition-section">
									<div className="section-header">
										<h3 className="section-title">
											<i className="fas fa-chart-pie me-2"></i>
											Ringkasan Nutrisi
										</h3>
									</div>

									{/* Nutrition Charts */}
									<div className="charts-container">
										{/* Makronutrien Chart */}
										<div className="chart-wrapper macronutrients">
											<h5 className="chart-title">Makronutrien</h5>
											<div className="chart-container macronutrients-chart" style={{ height: "250px" }}>
												<div className="chart-layer background-layer">
													<Bar data={data1()} options={config1} />
												</div>
												<div className="chart-layer foreground-layer">
													<Bar
														data={data(
															karbohidrat(Totalkarbohidrat, 100),
															protein(Totalprotein, 100),
															lemak(Totalprotein, 100)
														)}
														options={config}
													/>
												</div>
											</div>
										</div>

										{/* Target Kalori Chart */}
										<div className="chart-wrapper calories">
											<h5 className="chart-title">Target Kalori</h5>
											<div className="chart-container calories-chart" style={{ height: "150px" }}>
												<div className="chart-layer background-layer">
													<Bar data={dataKalori2()} options={config2} />
												</div>
												<div className="chart-layer foreground-layer">
													<Bar
														data={dataKalori(kalori(Totalkalori, 500))}
														options={configkalori}
													/>
												</div>
											</div>
										</div>
									</div>

									{/* Action Button */}
									{local.length > 0 ? (
										<div className="action-container">
											<button
												className="complete-btn"
												onClick={() =>
													handleSelesai(postmakanan, postkalori, postkarbon)
												}
											>
												<i className="fas fa-check-circle"></i>
												Selesai & Simpan
											</button>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="loading-container">
					<LoadingComponent />
				</div>
			)}

			{/* Modern TrackingCard Component */}
			<style jsx>{`
				.cart-hero {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					position: relative;
					overflow: hidden;
				}

				.cart-hero::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><pattern id="grain" width="100" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.05"/><circle cx="30" cy="5" r="0.5" fill="white" opacity="0.03"/><circle cx="50" cy="15" r="0.8" fill="white" opacity="0.04"/><circle cx="70" cy="8" r="0.6" fill="white" opacity="0.03"/><circle cx="90" cy="12" r="0.7" fill="white" opacity="0.04"/></pattern></defs><rect width="100" height="20" fill="url(%23grain)"/></svg>');
					pointer-events: none;
				}

				.hero-content {
					position: relative;
					z-index: 2;
				}

				.hero-title {
					font-size: 3rem;
					font-weight: 800;
					color: white;
					margin-bottom: 1rem;
					line-height: 1.1;
				}

				.gradient-text {
					background: linear-gradient(45deg, #FFD700, #FFA500);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.decoration {
					display: inline-block;
					margin-left: 1rem;
					animation: bounce 2s infinite;
				}

				@keyframes bounce {
					0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
					40% { transform: translateY(-10px); }
					60% { transform: translateY(-5px); }
				}

				.hero-subtitle {
					font-size: 1.1rem;
					color: rgba(255, 255, 255, 0.9);
					margin-bottom: 0;
				}

				.cart-summary {
					position: relative;
					z-index: 2;
					background: rgba(255, 255, 255, 0.15);
					backdrop-filter: blur(20px);
					border-radius: 20px;
					padding: 30px;
					border: 1px solid rgba(255, 255, 255, 0.2);
				}

				.summary-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.summary-label {
					color: rgba(255, 255, 255, 0.8);
					font-size: 0.9rem;
				}

				.summary-value {
					color: white;
					font-size: 1.5rem;
					font-weight: 700;
				}

				.summary-divider {
					height: 1px;
					background: rgba(255, 255, 255, 0.2);
					margin: 15px 0;
				}

				.cart-container {
					padding: 60px 0;
					background: #f8fafc;
				}

				.cart-section, .nutrition-section {
					background: white;
					border-radius: 25px;
					padding: 30px;
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
					margin-bottom: 30px;
				}

				.section-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30px;
					padding-bottom: 20px;
					border-bottom: 2px solid #f1f5f9;
				}

				.section-title {
					font-size: 1.3rem;
					font-weight: 700;
					color: #2d3748;
					margin: 0;
				}

				.item-count {
					background: #667eea;
					color: white;
					padding: 6px 15px;
					border-radius: 20px;
					font-size: 0.8rem;
					font-weight: 600;
				}

				.food-items {
					display: flex;
					flex-direction: column;
					gap: 20px;
				}

				.cart-item {
					position: relative;
				}

				.empty-cart {
					text-align: center;
					padding: 60px 20px;
					color: #718096;
				}

				.empty-icon {
					font-size: 4rem;
					color: #cbd5e0;
					margin-bottom: 20px;
				}

				.empty-cart h4 {
					color: #4a5568;
					margin-bottom: 10px;
				}

				.add-more-container {
					text-align: center;
					margin-top: 30px;
					padding-top: 30px;
					border-top: 2px solid #f1f5f9;
				}

				.add-more-btn {
					display: inline-flex;
					align-items: center;
					gap: 10px;
					background: linear-gradient(135deg, #667eea, #764ba2);
					color: white;
					padding: 15px 30px;
					border-radius: 50px;
					text-decoration: none;
					font-weight: 600;
					transition: all 0.3s ease;
				}

				.add-more-btn:hover {
					transform: translateY(-2px);
					box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
					color: white;
					text-decoration: none;
				}

				.charts-container {
					display: flex;
					flex-direction: column;
					gap: 30px;
					margin-bottom: 40px;
				}

				.chart-wrapper {
					background: #f8fafc;
					border-radius: 20px;
					padding: 25px;
					position: relative;
					overflow: hidden;
				}

				.chart-wrapper.macronutrients {
					margin-bottom: 10px;
				}

				.chart-wrapper.calories {
					margin-top: 10px;
				}

				.chart-title {
					font-size: 1.1rem;
					font-weight: 700;
					color: #2d3748;
					margin-bottom: 20px;
					text-align: center;
					position: relative;
					z-index: 10;
					background: #f8fafc;
					padding: 5px 0;
				}

				.chart-container {
					position: relative;
					width: 100%;
					height: 100%;
					min-height: inherit;
				}

				.chart-container.macronutrients-chart {
					position: relative;
					isolation: isolate;
				}

				.chart-container.calories-chart {
					position: relative;
					isolation: isolate;
				}

				.chart-layer {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					width: 100%;
					height: 100%;
				}

				.chart-layer.background-layer {
					z-index: 1;
				}

				.chart-layer.foreground-layer {
					z-index: 2;
				}

				.action-container {
					text-align: center;
					padding-top: 30px;
					border-top: 2px solid #f1f5f9;
				}

				.complete-btn {
					background: linear-gradient(135deg, #10b981, #059669);
					color: white;
					border: none;
					padding: 18px 40px;
					border-radius: 50px;
					font-size: 1.1rem;
					font-weight: 700;
					display: inline-flex;
					align-items: center;
					gap: 12px;
					cursor: pointer;
					transition: all 0.3s ease;
				}

				.complete-btn:hover {
					transform: translateY(-3px);
					box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
				}

				.loading-container {
					display: flex;
					justify-content: center;
					align-items: center;
					min-height: 60vh;
				}

				@media (max-width: 768px) {
					.hero-title {
						font-size: 2.2rem;
					}
					
					.cart-summary {
						margin-top: 30px;
					}
					
					.cart-section, .nutrition-section {
						padding: 20px;
						margin-bottom: 20px;
					}
					
					.section-header {
						flex-direction: column;
						gap: 15px;
						text-align: center;
					}
				}
			`}</style>
		</Layout>
	);
}
