import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { getCookie } from "../helpers";
import { isAdmin } from "../helpers/auth";
import "../style/header.css";
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	function WebLink({ children, to, ...props }) {
		let resolved = useResolvedPath(to);
		let match = useMatch({ path: resolved.pathname, end: true });
		return (
				<Link
				className={`nav-link position-relative px-3 py-2 rounded-pill transition-all ${match ? "active-link" : "hover-link"}`}
					to={to}
					{...props}
				>
					{children}
				{match && <div className="active-indicator"></div>}
				</Link>
		);
	}

	const isLogin = getCookie("token");
	const userIsAdmin = isAdmin();

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Hide navbar on admin pages since they use sidebar
	if (location.pathname.startsWith('/admin/')) {
		return null;
	}

	return (
		<>
			{/* Modern Glass Navbar */}
			<nav className={`navbar navbar-expand-lg fixed-top transition-all ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
				<div className="container">
					{/* Brand */}
					<Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
						<div className="brand-logo d-flex align-items-center justify-content-center rounded-circle me-2">
							<span className="brand-emoji">🥗</span>
						</div>
							<span className="brand-text fw-bold">NutriCare</span>
					</Link>

					{/* Mobile Menu Button */}
					<button 
						className="navbar-toggler border-0 p-0"
						type="button"
						onClick={toggleMobileMenu}
						aria-label="Toggle navigation"
					>
						<div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>

					{/* Desktop Navigation - Hide for admin pages */}
					{!location.pathname.startsWith('/admin/') && (
						<div className="collapse navbar-collapse">
							<ul className="navbar-nav mx-auto">
							<li className="nav-item">
									<WebLink to="/">
										<i className="fas fa-home me-2"></i>
									Beranda
								</WebLink>
							</li>
							<li className="nav-item">
									<WebLink to="/pilih-makanan">
										<i className="fas fa-utensils me-2"></i>
										Pilih Makanan
									</WebLink>
								</li>
								<li className="nav-item">
									<WebLink to="/resep">
										<i className="fas fa-book me-2"></i>
										Resep
									</WebLink>
								</li>
								<li className="nav-item">
									<WebLink to="/karbon">
										<i className="fas fa-leaf me-2"></i>
										Dampak Karbon
									</WebLink>
								</li>
								{isLogin && !userIsAdmin && (
									<li className="nav-item">
										<WebLink to="/tracking-nutrisi">
											<i className="fas fa-chart-line me-2"></i>
											Tracking
										</WebLink>
									</li>
								)}
							</ul>
						</div>
					)}

						{/* Auth Buttons */}
						<div className="d-flex align-items-center gap-2">
							{isLogin ? (
								<div className="dropdown">
									<button 
										className="btn btn-link dropdown-toggle border-0 p-0 d-flex align-items-center text-decoration-none" 
										type="button" 
										data-bs-toggle="dropdown"
									>
										<div className="user-avatar d-flex align-items-center justify-content-center rounded-circle me-2">
											<i className="fas fa-user"></i>
										</div>
										<span className="text-white">Profile</span>
									</button>
									<ul className="dropdown-menu dropdown-menu-end glass-dropdown">
										{userIsAdmin ? (
											<li>
												<Link className="dropdown-item" to="/admin/dashboard">
													<i className="fas fa-cog me-2"></i>
													Admin Dashboard
									</Link>
											</li>
										) : (
											<li>
												<Link className="dropdown-item" to="/profile">
													<i className="fas fa-user me-2"></i>
													My Profile
												</Link>
											</li>
										)}
										<li><hr className="dropdown-divider"/></li>
										<li>
											<button 
												className="dropdown-item text-danger"
												onClick={() => {
													document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
													window.location.href = "/";
												}}
											>
												<i className="fas fa-sign-out-alt me-2"></i>
												Logout
											</button>
							</li>
						</ul>
					</div>
							) : (
								<>
							<Link to="/sign-in">
										<Button btnclass="btn btn-outline-light btn-sm rounded-pill px-3">
											Masuk
										</Button>
									</Link>
									<Link to="/sign-up">
										<Button btnclass="btn btn-light btn-sm rounded-pill px-3 text-primary fw-semibold">
											Daftar
										</Button>
							</Link>
								</>
						)}
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			<div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
				<div className="mobile-menu-content">
					<div className="mobile-menu-header">
						<Link to="/" className="d-flex align-items-center text-decoration-none" onClick={() => setIsMobileMenuOpen(false)}>
							<div className="brand-logo d-flex align-items-center justify-content-center rounded-circle me-2">
								<span className="brand-emoji">🥗</span>
						</div>
							<span className="brand-text fw-bold text-white">NutriTracker</span>
						</Link>
						<button 
							className="close-btn"
							onClick={toggleMobileMenu}
							aria-label="Close menu"
						>
							<i className="fas fa-times"></i>
						</button>
						</div>
					
					<div className="mobile-menu-body">
						<Link to="/" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
							<i className="fas fa-home"></i>
							<span>Beranda</span>
						</Link>
						<Link to="/pilih-makanan" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
							<i className="fas fa-utensils"></i>
							<span>Pilih Makanan</span>
						</Link>
						<Link to="/resep" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
							<i className="fas fa-book"></i>
							<span>Resep</span>
						</Link>
						<Link to="/karbon" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
							<i className="fas fa-leaf"></i>
							<span>Dampak Karbon</span>
						</Link>
						{isLogin && !userIsAdmin && (
							<Link to="/tracking-nutrisi" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
								<i className="fas fa-chart-line"></i>
								<span>Tracking</span>
							</Link>
						)}
						
						<div className="mobile-menu-divider"></div>
						
						{isLogin ? (
							<>
								{userIsAdmin ? (
									<Link to="/admin/dashboard" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
										<i className="fas fa-cog"></i>
										<span>Admin Dashboard</span>
									</Link>
								) : (
									<Link to="/profile" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
										<i className="fas fa-user"></i>
										<span>My Profile</span>
									</Link>
								)}
								<button 
									className="mobile-nav-item text-danger border-0 bg-transparent w-100 text-start"
									onClick={() => {
										document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
										setIsMobileMenuOpen(false);
										window.location.href = "/";
									}}
								>
									<i className="fas fa-sign-out-alt"></i>
									<span>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to="/sign-in" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
									<i className="fas fa-sign-in-alt"></i>
									<span>Masuk</span>
								</Link>
								<Link to="/sign-up" className="mobile-nav-item primary" onClick={() => setIsMobileMenuOpen(false)}>
									<i className="fas fa-user-plus"></i>
									<span>Daftar</span>
								</Link>
							</>
						)}
						</div>
					</div>
				</div>

			{/* Navbar Styles */}
			<style>{`
				.navbar {
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					transition: all 0.3s ease;
					z-index: 1050;
				}
				
				.navbar-transparent {
					background: rgba(255, 255, 255, 0.1);
					border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				}
				
				.navbar-scrolled {
					background: rgba(255, 255, 255, 0.95);
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
				}
				
				.brand-logo {
					width: 40px;
					height: 40px;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					transition: transform 0.3s ease;
				}
				
				.brand-logo:hover {
					transform: scale(1.1);
				}
				
				.brand-emoji {
					font-size: 1.2rem;
				}
				
				.brand-text {
					color: #667eea;
					font-size: 1.25rem;
				}
				
				.navbar-scrolled .brand-text {
					color: #333;
				}
				
				.nav-link {
					color: rgba(255, 255, 255, 0.9) !important;
					font-weight: 500;
					transition: all 0.3s ease;
					position: relative;
					overflow: hidden;
				}
				
				.navbar-scrolled .nav-link {
					color: #333 !important;
				}
				
				.hover-link:hover {
					color: #fff !important;
					background: rgba(255, 255, 255, 0.1);
					transform: translateY(-2px);
				}
				
				.navbar-scrolled .hover-link:hover {
					color: #667eea !important;
					background: rgba(102, 126, 234, 0.1);
				}
				
				.active-link {
					color: #fff !important;
					background: rgba(255, 255, 255, 0.2);
				}
				
				.navbar-scrolled .active-link {
					color: #667eea !important;
					background: rgba(102, 126, 234, 0.15);
				}
				
				.active-indicator {
					position: absolute;
					bottom: -2px;
					left: 50%;
					transform: translateX(-50%);
					width: 6px;
					height: 6px;
					background: #fff;
					border-radius: 50%;
				}
				
				.navbar-scrolled .active-indicator {
					background: #667eea;
				}
				
				.user-avatar {
					width: 35px;
					height: 35px;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: white;
				}
				
				.dropdown-toggle {
					color: white !important;
					transition: all 0.3s ease;
				}
				
				.dropdown-toggle:hover {
					color: #667eea !important;
					background: rgba(255, 255, 255, 0.1) !important;
					border-radius: 8px;
				}
				
				.navbar-scrolled .dropdown-toggle {
					color: #333 !important;
				}
				
				.navbar-scrolled .dropdown-toggle:hover {
					color: #667eea !important;
					background: rgba(102, 126, 234, 0.1) !important;
				}
				
				.glass-dropdown {
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					background: rgba(255, 255, 255, 0.95);
					border: 1px solid rgba(255, 255, 255, 0.2);
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				}
				
				.hamburger {
					width: 30px;
					height: 20px;
					position: relative;
					cursor: pointer;
					transition: all 0.3s ease;
				}
				
				.hamburger span {
					display: block;
					position: absolute;
					height: 3px;
					width: 100%;
					background: #fff;
					border-radius: 3px;
					opacity: 1;
					left: 0;
					transform: rotate(0deg);
					transition: 0.25s ease-in-out;
				}
				
				.navbar-scrolled .hamburger span {
					background: #333;
				}
				
				.hamburger span:nth-child(1) {
					top: 0px;
				}
				
				.hamburger span:nth-child(2) {
					top: 8px;
				}
				
				.hamburger span:nth-child(3) {
					top: 16px;
				}
				
				.hamburger.active span:nth-child(1) {
					top: 8px;
					transform: rotate(135deg);
				}
				
				.hamburger.active span:nth-child(2) {
					opacity: 0;
					left: -60px;
				}
				
				.hamburger.active span:nth-child(3) {
					top: 8px;
					transform: rotate(-135deg);
				}
				
				.mobile-menu-overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100vh;
					background: linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%);
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					z-index: 9999;
					transform: translateX(-100%);
					transition: transform 0.3s ease;
				}
				
				.mobile-menu-overlay.active {
					transform: translateX(0);
				}
				
				.mobile-menu-content {
					height: 100%;
					display: flex;
					flex-direction: column;
					padding: 2rem;
				}
				
				.mobile-menu-header {
					display: flex;
					justify-content: between;
					align-items: center;
					margin-bottom: 3rem;
				}
				
				.close-btn {
					background: none;
					border: none;
					color: white;
					font-size: 1.5rem;
					cursor: pointer;
					margin-left: auto;
				}
				
				.mobile-menu-body {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}
				
				.mobile-nav-item {
					display: flex;
					align-items: center;
					padding: 1rem;
					color: white;
					text-decoration: none;
					border-radius: 15px;
					transition: all 0.3s ease;
					background: rgba(255, 255, 255, 0.1);
					backdrop-filter: blur(10px);
					border: 1px solid rgba(255, 255, 255, 0.1);
				}
				
				.mobile-nav-item:hover {
					background: rgba(255, 255, 255, 0.2);
					transform: translateX(10px);
					color: white;
				}
				
				.mobile-nav-item.primary {
					background: rgba(255, 255, 255, 0.9);
					color: #667eea;
				}
				
				.mobile-nav-item i {
					width: 20px;
					margin-right: 1rem;
				}
				
				.mobile-menu-divider {
					height: 1px;
					background: rgba(255, 255, 255, 0.2);
					margin: 1rem 0;
				}
				
				.transition-all {
					transition: all 0.3s ease;
				}
				
				/* Hide default mobile nav */
				.nav-mobile {
					display: none;
				}
				
				@media (max-width: 991px) {
					.navbar-nav {
						display: none;
					}
				}
			`}</style>
		</>
	);
}