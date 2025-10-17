import "../style/footer.css";

export default function Footer() {
	return (
		<footer className="simple-footer">
			<div className="container">
				<div className="footer-content">
							<p className="copyright-text">
								© 2025 NutriCare. All rights reserved.
							</p>
				</div>
			</div>

			<style jsx>{`
				.simple-footer {
					background: #f8f9fa;
					border-top: 1px solid #e9ecef;
					padding: 20px 0;
					margin-top: auto;
				}

				.footer-content {
					text-align: center;
				}

				.copyright-text {
					color: #6c757d;
					font-size: 0.9rem;
					margin: 0;
					font-weight: 400;
				}
			`}</style>
		</footer>
	);
}
