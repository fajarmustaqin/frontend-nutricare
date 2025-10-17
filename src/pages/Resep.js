import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CardResep from "../components/CardResep";
import Layout from "../layouting/Layout";
import { getResep } from "../redux/actions/action.resep";
import "../style/card-makanan.css"

export default function Resep() {
  const dispatch = useDispatch();

  const resepState = useSelector((state) => state.ResepReducer);
  const { resep, loading } = resepState;
  const [input, setinput] = useState("");
  const [filterResep, setfilterResep] = useState([]);

  const searchResep = () => {
    let filter = resep.filter((item) => item.idMakanan.makanan.toLowerCase().includes(input));
    setfilterResep(filter);
  };

  useEffect(() => {
    dispatch(getResep());
  }, [dispatch]);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="recipe-hero">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-7">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="gradient-text">Resep</span> Makanan
                  <span className="decoration">👨‍🍳</span>
                </h1>
                <p className="hero-subtitle">
                  Temukan resep lezat dan sehat untuk masakan harianmu
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
                      placeholder="Cari resep favoritmu..."
                      aria-label="Cari resep"
                    />
                  </div>
                  <button
                    className="search-btn"
                    onClick={() => searchResep()}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid Section */}
      <section className="recipe-grid-section">
        <div className="container">
          <div className="recipe-stats">
            <div className="stats-item">
              <span className="stats-number">{resep.length}</span>
              <span className="stats-label">Resep Tersedia</span>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item">
              <span className="stats-number">{filterResep.length > 0 ? filterResep.length : resep.length}</span>
              <span className="stats-label">Hasil Pencarian</span>
            </div>
          </div>

          <div className="section-header">
            <h2 className="section-title">Mau masak apa hari ini?</h2>
            <p className="section-subtitle">Pilih resep yang sesuai dengan selera dan kebutuhan nutrisimu</p>
          </div>

          <div className="recipe-grid">
            {!loading ? (
              filterResep.length > 0 ? (
                filterResep.map((el, index) => {
                  return (
                    <div className="recipe-card-wrapper" key={index}>
                      <Link
                        to={`/resep/detail/${el._id}`}
                        className="recipe-card-link"
                      >
                        <div className="recipe-card modern-recipe-card">
                          <CardResep
                            title={el.idMakanan.makanan}
                            imageUrl={el.idMakanan.image}
                            kalori={el.idMakanan.kaloriMakanan}
                            karbon={el.idMakanan.karbon}
                            key={el._id}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                resep.map((el, index) => {
                  return (
                    <div className="recipe-card-wrapper" key={index}>
                      <Link 
                        to={`/resep/detail/${el._id}`}
                        className="recipe-card-link"
                      >
                        <div className="recipe-card modern-recipe-card">
                          <CardResep
                            title={el.idMakanan.makanan}
                            imageUrl={el.idMakanan.image}
                            kalori={el.idMakanan.kaloriMakanan}
                            karbon={el.idMakanan.karbon}
                            key={el._id}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              )
            ) : (
              <div className="loading-container">
                <div className="loading-spinner">
                  <i className="fas fa-utensils fa-spin"></i>
                  <p>Memuat resep...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .recipe-hero {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          position: relative;
          overflow: hidden;
        }

        .recipe-hero::before {
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
          color: #f59e0b;
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
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: none;
          border-radius: 50px;
          padding: 12px 20px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
        }

        .recipe-grid-section {
          padding: 60px 0;
          background: #f8fafc;
        }

        .recipe-stats {
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
          color: #f59e0b;
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
          background: linear-gradient(to bottom, transparent, #f59e0b, transparent);
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 15px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          position: relative;
        }

        .recipe-card-wrapper {
          position: relative;
        }

        .recipe-card-link {
          text-decoration: none;
          color: inherit;
        }

        .recipe-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .recipe-card:hover {
          transform: translateY(-15px) scale(1.02);
        }

        .modern-recipe-card {
          border-radius: 25px;
          background: white;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .recipe-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f59e0b, #d97706, #fbbf24);
          z-index: 2;
        }

        .loading-container {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 0;
        }

        .loading-spinner {
          text-align: center;
          color: #6b7280;
        }

        .loading-spinner i {
          font-size: 3rem;
          color: #f59e0b;
          margin-bottom: 20px;
        }

        .loading-spinner p {
          font-size: 1.1rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .recipe-stats {
            flex-direction: column;
            gap: 20px;
          }
          
          .stats-divider {
            width: 40px;
            height: 2px;
            background: linear-gradient(to right, transparent, #f59e0b, transparent);
          }
          
          .recipe-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
}
