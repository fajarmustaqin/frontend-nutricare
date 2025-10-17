/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardMakanan from "../components/CardMakanan";
import MakananModal from "../components/MakananModal";
import Layout from "../layouting/Layout";
import { getMakanan } from "../redux/actions/action.makanan";
import { showModal } from "../redux/actions/action.modal";
import "../style/card-makanan.css";
import eat from "../images/eat.png";
import { getCookie } from "../helpers";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/Loading";

export default function PilihMakanan() {
	const Navigate = useNavigate();
	let token = getCookie("token");
	const dispatch = useDispatch();
	const allMakananState = useSelector((state) => state.allmakananReducer);
	const { allMakanan, loading, error } = allMakananState;
	const [input, setinput] = useState("");
	const [filterMakanan, setfilterMakanan] = useState([]);

	const searchMakanan = () => {
		let filter = allMakanan.filter((item) =>
			item.makanan.toLowerCase().includes(input)
		);
		setfilterMakanan(filter);
	};
	useEffect(() => {
		dispatch(getMakanan());
	}, [dispatch]);

	return (
		<Layout>
			{/* Hero Section */}
			<section className="food-selector-hero">
				<div className="container py-5">
					<div className="row align-items-center">
						<div className="col-12 col-md-7">
							<div className="hero-content">
								<h1 className="hero-title">
									<span className="gradient-text">Pilih</span> Makanan
									<span className="decoration">🍽️</span>
								</h1>
								<p className="hero-subtitle">
									Temukan makanan yang tepat untuk kebutuhan nutrisi harianmu
								</p>
							</div>
						</div>
						<div className="col-12 col-md-5">
							<div className="search-container">
								<div className="modern-search-box">
									<div className="search-input-wrapper">
										<i className="fas fa-search search-icon"></i>
										<input
											onChange={(e) => setinput(e.target.value.toLowerCase())}
											type="text"
											className="search-input"
											placeholder="Cari makanan favoritmu..."
											aria-label="Cari makanan"
										/>
									</div>
									<button
										className="search-btn"
										onClick={() => searchMakanan()}
									>
										<i className="fas fa-search"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
					
					{/* Keranjang Button */}
					<div className="cart-section">
						<Link to="/pilih-makanan/detail" className="cart-btn">
							<div className="cart-icon">
								<i className="fas fa-shopping-basket"></i>
								<span className="cart-badge">0</span>
							</div>
							<span className="cart-text">Keranjang</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Food Grid Section */}
			<section className="food-grid-section">
				<div className="container">
					<div className="food-stats">
						<div className="stats-item">
							<span className="stats-number">{allMakanan.length}</span>
							<span className="stats-label">Makanan Tersedia</span>
						</div>
						<div className="stats-divider"></div>
						<div className="stats-item">
							<span className="stats-number">{filterMakanan.length > 0 ? filterMakanan.length : allMakanan.length}</span>
							<span className="stats-label">Hasil Pencarian</span>
						</div>
					</div>

					<div className="food-grid">
						{!loading
							? filterMakanan.length > 0
								? filterMakanan.map((el, index) => {
										return (
											<div className="food-card-wrapper" key={index}>
												<div 
													onClick={() => dispatch(showModal(el._id))} 
													className="food-card modern-food-card"
												>
													<CardMakanan 
														makanan={el.makanan} 
														image={el.image} 
														penyetaraanPorsi={el.porsi} 
														kalori={el.kaloriMakanan} 
														karbon={el.karbon} 
														key={el._id}
													/>
												</div>
											</div>
										);
									})
								: allMakanan.map((el, index) => {
										return (
											<div className="food-card-wrapper" key={index}>
												<div 
													onClick={() => dispatch(showModal(el._id))} 
													className="food-card modern-food-card"
												>
													<CardMakanan 
														makanan={el.makanan} 
														image={el.image} 
														penyetaraanPorsi={el.porsi} 
														kalori={el.kaloriMakanan} 
														karbon={el.karbon} 
														key={el._id}
													/>
												</div>
											</div>
										);
									})
								: <LoadingComponent />}
					</div>
				</div>
			</section>

			<MakananModal pilih={true}></MakananModal>

			<style jsx>{`
				.food-selector-hero {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					position: relative;
					overflow: hidden;
				}

				.food-selector-hero::before {
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
					font-size: 3.5rem;
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
					font-size: 1.2rem;
					color: rgba(255, 255, 255, 0.9);
					margin-bottom: 2rem;
				}

				.search-container {
					position: relative;
					z-index: 2;
				}

				.modern-search-box {
					display: flex;
					background: rgba(255, 255, 255, 0.95);
					border-radius: 50px;
					padding: 8px;
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
					backdrop-filter: blur(20px);
				}

				.search-input-wrapper {
					flex: 1;
					position: relative;
					display: flex;
					align-items: center;
				}

				.search-icon {
					position: absolute;
					left: 20px;
					color: #667eea;
					font-size: 1.1rem;
					z-index: 3;
				}

				.search-input {
					width: 100%;
					padding: 15px 50px 15px 50px;
					border: none;
					background: transparent;
					font-size: 1rem;
					color: #333;
					outline: none;
				}

				.search-input::placeholder {
					color: rgba(0, 0, 0, 0.5);
				}

				.search-btn {
					background: linear-gradient(135deg, #667eea, #764ba2);
					border: none;
					border-radius: 50px;
					padding: 12px 20px;
					color: white;
					cursor: pointer;
					transition: all 0.3s ease;
				}

				.search-btn:hover {
					transform: scale(1.05);
					box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
				}

				.cart-section {
					display: flex;
					justify-content: center;
					margin-top: 30px;
					position: relative;
					z-index: 2;
				}

				.cart-btn {
					display: flex;
					align-items: center;
					gap: 10px;
					background: rgba(255, 255, 255, 0.2);
					padding: 15px 25px;
					border-radius: 50px;
					color: white;
					text-decoration: none;
					backdrop-filter: blur(20px);
					border: 2px solid rgba(255, 255, 255, 0.3);
					transition: all 0.3s ease;
				}

				.cart-btn:hover {
					background: rgba(255, 255, 255, 0.3);
					transform: translateY(-3px);
					color: white;
					text-decoration: none;
				}

				.cart-icon {
					position: relative;
					font-size: 1.5rem;
				}

				.cart-badge {
					position: absolute;
					top: -8px;
					right: -8px;
					background: #ff4757;
					color: white;
					border-radius: 50%;
					width: 20px;
					height: 20px;
					font-size: 0.7rem;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.food-grid-section {
					padding: 60px 0;
					background: #f8fafc;
				}

				.food-stats {
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 40px;
					margin-bottom: 50px;
					padding: 30px;
					background: white;
					border-radius: 20px;
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
				}

				.stats-item {
					text-align: center;
				}

				.stats-number {
					display: block;
					font-size: 2.5rem;
					font-weight: 800;
					color: #667eea;
					margin-bottom: 5px;
				}

				.stats-label {
					font-size: 0.9rem;
					color: #64748b;
					text-transform: uppercase;
					letter-spacing: 1px;
				}

				.stats-divider {
					width: 2px;
					height: 40px;
					background: linear-gradient(to bottom, transparent, #667eea, transparent);
				}

				.food-grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
					gap: 30px;
					position: relative;
				}

				.food-card-wrapper {
					position: relative;
				}

				.food-card {
					position: relative;
					overflow: hidden;
					cursor: pointer;
					transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
				}

				.food-card:hover {
					transform: translateY(-15px) scale(1.02);
				}

				.modern-food-card {
					border-radius: 25px;
					background: white;
					box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
					overflow: hidden;
					border: 1px solid rgba(255, 255, 255, 0.2);
				}

				.food-card::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					height: 4px;
					background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
					z-index: 2;
				}

				@media (max-width: 768px) {
					.hero-title {
						font-size: 2.5rem;
					}
					
					.cart-section {
						margin-top: 20px;
					}
					
					.food-stats {
						flex-direction: column;
						gap: 20px;
					}
					
					.stats-divider {
						width: 40px;
						height: 2px;
						background: linear-gradient(to right, transparent, #667eea, transparent);
					}
					
					.food-grid {
						grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
						gap: 20px;
					}
				}
			`}</style>
		</Layout>
	);
}
