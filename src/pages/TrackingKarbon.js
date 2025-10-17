import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { getCookie } from "../helpers";
import { getByDate, getTracking } from "../redux/actions/action.tracking";
import Layout from "../layouting/Layout";
import MakananModal from "../components/MakananModal";
import "../style/card-makanan.css";
import TrackingCard from "../components/TrackingCard";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import LoadingComponent from "../components/Loading";

export default function TrackingKarbon() {
  const token = getCookie("token")

  const dispatch = useDispatch()
  const trackingState = useSelector((state) => state.trackingReducer);
  const initialState = "Hari ini"
  const [state, setstate] = useState(initialState)
  const [selectedDate, setSelectedDate] = useState(null)
  const [hidden, sethidden] = useState(true);
  const myRefname = useRef(null);
  let today = new Date()

  const { tracking, loading } = trackingState;

  function convert(str) {
    let date = str;
		let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join("-");
	}
  
  const selectTanggal = (date) => {
    sethidden(false);
    myRefname.current.setFocus(true);
    if(date) {
      let newDate = convert(date)
      setSelectedDate(date)
      setstate(newDate)
    }
  }
  
  useEffect(() => {
    if(selectedDate) {
      dispatch(getByDate(state))
    } else {
      dispatch(getTracking());
    }
    if (hidden === false) {
      myRefname.current.setFocus(true);
			sethidden(true);
		}
  }, [dispatch, hidden, selectedDate, state]);

  if(!token) {
    return <Navigate to="/unauthorized" />
  }

  return(
    <Layout>
      {/* Hero Section */}
      <section className="carbon-hero">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-8">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="gradient-text">Tracking</span> Karbon
                  <span className="decoration">🌱</span>
                </h1>
                <p className="hero-subtitle">
                  Pantau dampak karbon dari makanan yang Anda konsumsi hari ini
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="date-selector">
                <div className="dropdown">
                  <button className="modern-date-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="far fa-calendar-alt"></i>
                    <span>{state}</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-center glass-dropdown" aria-labelledby="dropdownMenuButton1">
                    <li 
                      onClick={() => {
                        setstate(initialState);
                        setSelectedDate(null);
                      }}
                    >
                      <p className="dropdown-item pointer mb-0">Hari ini</p>
                    </li>
                    <li onClick={() => selectTanggal()}>
                      <p className="dropdown-item pointer mb-0">Pilih Tanggal</p>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center">
                    <DatePicker
                      className={hidden ? "d-none" : "d-block"}
                      closeOnScroll={true} 
                      selected={selectedDate} 
                      onChange={(date) => selectTanggal(date) } 
                      ref={myRefname}
                      maxDate={today}
                      withPortal
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carbon Stats Section */}
      <section className="carbon-stats">
        <div className="container">
          <div className="carbon-card">
            <div className="carbon-content">
              <div className="carbon-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="carbon-info">
                <h2 className="carbon-value">
                  {!loading && tracking?.tracking?.totKarbon ? tracking.tracking.totKarbon.toFixed(2) : 0}
                </h2>
                <p className="carbon-unit">kg CO<sub>2</sub></p>
                <div className="carbon-description">
                  <p>Total emisi karbon dari konsumsi makanan</p>
                </div>
              </div>
            </div>
            <div className="carbon-visual">
              <div className="carbon-circle">
                <div className="circle-progress">
                  <svg viewBox="0 0 100 100" className="progress-ring">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${tracking?.tracking?.totKarbon ? (tracking.tracking.totKarbon * 10) : 0} 251.2`}
                      strokeDashoffset="62.8"
                      className="progress-circle"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Items Section */}
      {loading ? (
        <div className="loading-container">
          <LoadingComponent customstyle="" />
        </div>
      ) : tracking?.tracking?.makanan ? (
        <TrackingSection makanan={tracking.tracking.makanan} />
      ) : (
        <section className="empty-state">
          <div className="container">
            <div className="empty-content">
              <div className="empty-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Belum Ada Data Karbon</h3>
              {state === initialState ? (
                <p>
                  Anda belum menambahkan makanan untuk hari ini. Silakan tambahkan
                  makanan yang sudah anda konsumsi hari ini dari menu{" "}
                  <Link to="/pilih-makanan" className="text-link">
                    pilih makanan
                  </Link>
                  .
                </p>
              ) : (
                <p>Anda tidak memiliki riwayat makanan pada tanggal {state}.</p>
              )}
              <Link to="/pilih-makanan" className="btn btn-primary action-btn">
                <i className="fas fa-plus me-2"></i>
                Tambah Makanan
              </Link>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .carbon-hero {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          position: relative;
          overflow: hidden;
        }

        .carbon-hero::before {
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

        .date-selector {
          position: relative;
          z-index: 2;
        }

        .modern-date-btn {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          color: white;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: space-between;
        }

        .modern-date-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .glass-dropdown {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .carbon-stats {
          padding: 60px 0;
          background: #f8fafc;
        }

        .carbon-card {
          background: white;
          border-radius: 30px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }

        .carbon-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          opacity: 0.05;
          pointer-events: none;
        }

        .carbon-content {
          display: flex;
          align-items: center;
          gap: 30px;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .carbon-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }

        .carbon-info {
          flex: 1;
        }

        .carbon-value {
          font-size: 3.5rem;
          font-weight: 800;
          color: #10b981;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .carbon-unit {
          font-size: 1.2rem;
          color: #64748b;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .carbon-description p {
          color: #64748b;
          font-size: 1rem;
          margin: 0;
        }

        .carbon-visual {
          position: relative;
          z-index: 2;
        }

        .carbon-circle {
          width: 150px;
          height: 150px;
          position: relative;
        }

        .progress-ring {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .progress-circle {
          transition: stroke-dasharray 0.5s ease;
        }

        .food-items-container {
          padding: 60px 0;
          background: #f8fafc;
        }

        .food-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }

        .empty-state {
          padding: 100px 0;
          background: #f8fafc;
        }

        .empty-content {
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .empty-icon {
          font-size: 5rem;
          color: #cbd5e0;
          margin-bottom: 2rem;
        }

        .empty-content h3 {
          color: #2d3748;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .empty-content p {
          color: #718096;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .text-link {
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
        }

        .text-link:hover {
          text-decoration: underline;
        }

        .action-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 50px;
          padding: 15px 30px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .carbon-card {
            flex-direction: column;
            text-align: center;
            padding: 30px 20px;
          }

          .carbon-content {
            flex-direction: column;
            text-align: center;
          }

          .carbon-value {
            font-size: 2.5rem;
          }

          .carbon-circle {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </Layout>
  )
}

const TrackingSection = ({ makanan }) => {
  return (
    <section className="food-items-container">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">
            <i className="fas fa-leaf me-2"></i>
            Makanan dengan Dampak Karbon
          </h3>
          <span className="item-count">{makanan.length} item</span>
        </div>
        
        <div className="food-card-grid">
          {makanan.map((el, index) => {
            return (
              <div
                className="pointer food-card-wrapper"
                key={`onclick-${index}`}
              >
                <TrackingCard
                  image={el.makananID.image}
                  alt_image={el.makananID.makanan}
                  namamakanan={el.makananID.makanan}
                  infoporsi={el.makananID.porsi}
                  porsirekomendasi={el.porsi}
                  modals={true}
                  key={index}
                  id={el.makananID._id}
                />
              </div>
            );
          })}
        </div>
      </div>

      <MakananModal karbon={true}></MakananModal>

      <style jsx>{`
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f1f5f9;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
        }

        .item-count {
          background: #10b981;
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .food-card-wrapper {
          transition: transform 0.3s ease;
        }

        .food-card-wrapper:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};
