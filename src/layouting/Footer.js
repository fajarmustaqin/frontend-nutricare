import "../style/footer.css";

export default function Footer() {
	return (
		<footer className="mt-5 py-5 bg-dark text-white">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 mb-4">
						<div className="d-flex align-items-center mb-3">
							<div className="d-flex align-items-center justify-content-center bg-primary rounded-circle me-2" style={{width: '40px', height: '40px'}}>
								<span className="text-white fw-bold">🥗</span>
							</div>
							<span className="h5 fw-bold mb-0 text-primary">NutriCare</span>
						</div>
						<p className="text-light opacity-75">
							Sistem manajemen nutrisi terintegrasi untuk rumah sakit. 
							Membantu tenaga medis mengelola diet dan nutrisi pasien dengan efektif.
						</p>
					<div className="d-flex gap-3">
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light opacity-75 hover-opacity-100">
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light opacity-75 hover-opacity-100">
							<i className="fab fa-twitter"></i>
						</a>
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light opacity-75 hover-opacity-100">
							<i className="fab fa-instagram"></i>
						</a>
					</div>
					</div>
					
					<div className="col-lg-2 col-md-6 mb-4">
						<h6 className="fw-bold mb-3 text-primary">Fitur</h6>
						<ul className="list-unstyled">
							<li className="mb-2">
								<a href="/pilih-makanan" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Pilih Makanan
								</a>
							</li>
							<li className="mb-2">
								<a href="/tracking-nutrisi" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Tracking Nutrisi
								</a>
							</li>
							<li className="mb-2">
								<a href="/rekomendasi" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Rekomendasi
								</a>
							</li>
							<li className="mb-2">
								<a href="/karbon" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Dampak Karbon
								</a>
							</li>
						</ul>
					</div>
					
					<div className="col-lg-2 col-md-6 mb-4">
						<h6 className="fw-bold mb-3 text-primary">Akun</h6>
						<ul className="list-unstyled">
							<li className="mb-2">
								<a href="/sign-up" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Daftar
								</a>
							</li>
							<li className="mb-2">
								<a href="/sign-in" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Masuk
								</a>
							</li>
							<li className="mb-2">
								<a href="/profile" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Profil
								</a>
							</li>
							<li className="mb-2">
								<a href="/resep" className="text-light opacity-75 text-decoration-none hover-opacity-100">
									Resep
								</a>
							</li>
						</ul>
					</div>
					
					<div className="col-lg-4 col-md-6 mb-4">
						<h6 className="fw-bold mb-3 text-primary">Kontak</h6>
						<div className="d-flex align-items-start mb-2">
							<i className="fas fa-envelope text-primary me-2 mt-1"></i>
							<span className="text-light opacity-75">hello@nutritracker.com</span>
						</div>
						<div className="d-flex align-items-start mb-2">
							<i className="fas fa-phone text-primary me-2 mt-1"></i>
							<span className="text-light opacity-75">+62 123 456 789</span>
						</div>
						<div className="d-flex align-items-start">
							<i className="fas fa-map-marker-alt text-primary me-2 mt-1"></i>
							<span className="text-light opacity-75">Indonesia</span>
						</div>
					</div>
				</div>
				
				<hr className="my-4 opacity-25"/>
				
				<div className="row align-items-center">
					<div className="col-md-6">
						<p className="mb-0 text-light opacity-50">
							© 2024 NutriTracker. All rights reserved.
						</p>
					</div>
				<div className="col-md-6 text-md-end">
					<button type="button" className="btn btn-link text-light opacity-50 text-decoration-none me-3 hover-opacity-100 p-0 border-0">
						Privacy Policy
					</button>
					<button type="button" className="btn btn-link text-light opacity-50 text-decoration-none hover-opacity-100 p-0 border-0">
						Terms of Service
					</button>
				</div>
				</div>
			</div>
		</footer>
	);
}
