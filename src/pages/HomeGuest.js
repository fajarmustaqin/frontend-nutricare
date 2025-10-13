import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
// import CardResep from "../components/CardResep"; // Not used in new design
import Layout from "../layouting/Layout";
import { getResep } from "../redux/actions/action.resep";
import "../style/card-makanan.css"

export default function HomeGuest() {
  // Using CSS icons instead of external images to avoid copyright
  const features = [
    {
      icon: "🍽️",
      title: "Pilih Makanan",
      desc: "Pilih makanan dan hitung kalori makanan yang anda konsumsi",
      color: "#28a745"
    },
    {
      icon: "📊",
      title: "Tracking Nutrisi", 
      desc: "Rekam nutrisi yang sudah anda konsumsi setiap hari",
      color: "#007bff"
    },
    {
      icon: "⭐",
      title: "Rekomendasi Makanan",
      desc: "Temukan rekomendasi makanan sesuai dengan kebutuhan kalori anda",
      color: "#ffc107"
    },
    {
      icon: "🌱",
      title: "Dampak Karbon",
      desc: "Informasi dampak karbon dan cara mengurangi efeknya bagi bumi",
      color: "#20c997"
    }
  ]

  const dispatch = useDispatch();

  const resepState = useSelector((state) => state.ResepReducer);
  const { resep } = resepState;

  useEffect(() => {
    dispatch(getResep());
  }, [dispatch]);

  return(
    <Layout>
      {/* Hero Section */}
      <main className="position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        marginTop: '-85px',
        paddingTop: '85px'
      }}>
        <div className="container-fluid py-5">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-lg-8 col-md-10 text-center text-white">
              {/* Logo/Brand */}
              <div className="mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle p-3 mb-3" style={{width: '80px', height: '80px'}}>
                  <span style={{fontSize: '2rem'}}>🥗</span>
                </div>
                <h1 className="display-4 fw-bold mb-2">NutriCare</h1>
                <p className="lead opacity-90">Hospital Nutrition Management System</p>
              </div>

              {/* Main Content */}
              <div className="mb-5">
                <h2 className="h3 mb-4">Kelola Nutrisi Anda dengan Bijak</h2>
                <p className="fs-5 mb-4 opacity-90">
                  Platform terpadu untuk tracking nutrisi, menghitung kalori, dan memantau dampak karbon dari makanan Anda
                </p>
                
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link to="/sign-up">
                    <Button btnclass="btn btn-light btn-lg px-4 py-3 rounded-pill fw-semibold">
                      🚀 Mulai Sekarang
                    </Button>
                  </Link>
                  <Link to="/sign-in">
                    <Button btnclass="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-semibold">
                      📱 Masuk
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="row text-center mt-5">
                <div className="col-md-4">
                  <div className="h2 fw-bold">10+</div>
                  <div className="small opacity-75">Jenis Makanan</div>
                </div>
                <div className="col-md-4">
                  <div className="h2 fw-bold">100+</div>
                  <div className="small opacity-75">Users Aktif</div>
                </div>
                <div className="col-md-4">
                  <div className="h2 fw-bold">24/7</div>
                  <div className="small opacity-75">Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{zIndex: -1}}>
          <div className="position-absolute" style={{
            top: '10%', 
            right: '10%', 
            width: '200px', 
            height: '200px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          <div className="position-absolute" style={{
            bottom: '20%', 
            left: '15%', 
            width: '150px', 
            height: '150px', 
            background: 'rgba(255,255,255,0.08)', 
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse'
          }}></div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Fitur Unggulan</h2>
            <p className="lead text-muted">Kelola kesehatan dan lingkungan dengan satu platform</p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-6">
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-3 me-3"
                        style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: feature.color + '20',
                          fontSize: '1.5rem'
                        }}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fw-bold mb-2" style={{color: feature.color}}>
                          {feature.title}
                        </h5>
                        <p className="text-muted mb-0">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Resep Sehat</h2>
            <p className="lead text-muted mb-4">Temukan inspirasi masakan sehat untuk hidup yang lebih baik</p>
            <Link 
              className="btn btn-outline-primary btn-lg rounded-pill px-4" 
              to="/resep"
            >
              Lihat Semua Resep →
            </Link>
          </div>

          <div className="row justify-content-center g-4">
            {resep.slice(-3).map((data) => (
              <div className="col-12 col-sm-6 col-lg-4" key={data._id}>
                <Link className="text-decoration-none" to={`/resep/detail/${data._id}`}>
                  <div className="card border-0 shadow-sm hover-card h-100">
                    <div className="position-relative overflow-hidden" style={{height: '200px'}}>
                      <img 
                        src={data.idMakanan?.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={data.idMakanan?.makanan || 'Recipe'}
                        className="card-img-top h-100 object-fit-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Recipe';
                        }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-success rounded-pill">
                          {data.idMakanan?.kaloriMakanan || 0} kcal
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">
                        {data.idMakanan?.makanan || 'Recipe'}
                      </h5>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>🔥 {data.idMakanan?.kaloriMakanan || 0} kcal</span>
                        <span>🌱 {data.idMakanan?.karbon || 0} CO₂</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container text-center text-white">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3">Siap Memulai Hidup Sehat?</h2>
              <p className="lead mb-4 opacity-90">
                Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaat tracking nutrisi dan dampak karbon
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/sign-up">
                  <Button btnclass="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold">
                    Daftar Gratis Sekarang
                  </Button>
                </Link>
                <Link to="/sign-in">
                  <Button btnclass="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-semibold">
                    Sudah Punya Akun?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>
    </Layout>
  )
}