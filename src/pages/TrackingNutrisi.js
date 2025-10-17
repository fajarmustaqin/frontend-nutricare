import Layout from "../layouting/Layout";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByDate, getTracking } from "../redux/actions/action.tracking";
import TrackingCard from "../components/TrackingCard";
import MakananModal from "../components/MakananModal";
import "../style/card-makanan.css";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

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
import { getUSER } from "../redux/actions/action.User";
import { getCookie } from "../helpers";
import LoadingComponent from "../components/Loading";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);


export default function TrackingNutrisi() {
  const token = getCookie("token")
  const Navigate = useNavigate()
  
  const dispatch = useDispatch();
  const trackingState = useSelector((state) => state.trackingReducer);
  const userState = useSelector((state) => state.UserReducer)
  const initialState = "Hari ini"
  const [state, setstate] = useState(initialState)
  const [selectedDate, setSelectedDate] = useState(null)
  const [hidden, sethidden] = useState(true);
  const myRefname = useRef(null);

  let {User} = userState
  if(User.legth === 0)
    User = null

  let today = new Date()
  const { tracking, loading } = trackingState;
  let karbohidrat = 0, protein = 0, lemak = 0
  let butuhkarbohidrat = 0, butuhprotein = 0, butuhlemak = 0

  if(!loading && tracking && User?.gizi) {
    butuhkarbohidrat = Number((User.gizi?.karbohidrat || 0).toFixed(2))
    butuhprotein = Number((User.gizi?.protein || 0).toFixed(2))
    butuhlemak = Number((User.gizi?.lemak || 0).toFixed(2))

    karbohidrat = tracking.totKarbohidrat || 0
    karbohidrat = User.gizi?.karbohidrat ? karbohidrat/User.gizi.karbohidrat * 100 : 0
    karbohidrat = Number(karbohidrat.toFixed(2))
    
    protein = tracking.totProtein || 0
    protein = User.gizi?.protein ? protein/User.gizi.protein * 100 : 0
    protein = Number(protein.toFixed(2))
    
    lemak = tracking.totLemak || 0
    lemak = User.gizi?.lemak ? lemak/User.gizi.lemak * 100 : 0
    lemak = Number(lemak.toFixed(2))
  }

  if(karbohidrat > 100) {
    karbohidrat = 100
  }
  if(protein > 100) {
    protein = 100
  }
  if(lemak > 100) {
    lemak = 100
  }

  // for chart
  const borderRadiusAllCorners = {
    topLeft: 50,
		topRight: 50,
		bottomLeft: 50,
		bottomRight: 50,
	};
  
  const data = (first, second) => ({
    labels: ["Nutrisi"],
		datasets: [
      {
        label: "Terpenuhi",
				data: [first],
				backgroundColor: ["#F9AC3A"],
				borderColor: ["#F9AC3A"],
				borderWidth: 1,
				borderRadius: borderRadiusAllCorners,
				borderSkipped: false,
				barThickness: 15,
			},
			{
        label: "Belum Terpenuhi",
				data: [second],
				backgroundColor: ["transparent"],
				borderColor: ["transparent"],
				borderWidth: 1,
				borderRadius: borderRadiusAllCorners,
				borderSkipped: false,
				barThickness: 15,
			},
		],
	});
	const maxdata = (total) => ({
    labels: ["Nutrisi"],
		datasets: [
      {
        label: "My First Dataset",
				data: [12],
				backgroundColor: ["white"],
				borderColor: ["white"],
				borderWidth: 1,
				borderRadius: borderRadiusAllCorners,
				borderSkipped: false,
				barThickness: 15,
			},
		],
	});
	const config = {
    indexAxis: "y",
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
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
	const config1 = {
    indexAxis: "y",
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
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
    dispatch(getUSER())
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
    Navigate("/unauthorized")
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="nutrition-hero">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-8">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="gradient-text">Tracking</span> Nutrisi
                  <span className="decoration">🔥</span>
                </h1>
                <p className="hero-subtitle">
                  Pantau asupan nutrisi harian dan capai target gizi yang optimal
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

      {/* Nutrition Stats Section */}
      <section className="nutrition-stats">
        <div className="container">
          <div className="stats-card">
            {/* Calories Section */}
            <div className="calories-section">
              <div className="calories-content">
                <div className="calories-icon">
                  <i className="fas fa-fire"></i>
                </div>
                <div className="calories-info">
                  <h2 className="calories-value">
                    {!loading && tracking?.tracking ? tracking.tracking.totKalori : 0}
                  </h2>
                  <p className="calories-unit">kkal</p>
                  <div className="calories-description">
                    <p>Total kalori yang dikonsumsi hari ini</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Macronutrients Section */}
            <div className="macronutrients-section">
              <h4 className="macronutrients-title">Asupan Makronutrien</h4>
              <div className="macronutrients-grid">
                {/* Karbohidrat */}
                <div className="macro-item">
                  <div className="macro-header">
                    <div className="macro-icon carb-icon">
                      <i className="fas fa-bread-slice"></i>
                    </div>
                    <div className="macro-info">
                      <span className="macro-value">
                        {!loading && tracking && tracking.tracking ? tracking.totKarbohidrat : 0}
                      </span>
                      <span className="macro-target">/ {butuhkarbohidrat}g</span>
                    </div>
                  </div>
                  <div className="macro-chart">
                    <div className="chart-container">
                      <div className="chart-layer background-layer">
                        <Bar data={maxdata(100)} options={config1} />
                      </div>
                      <div className="chart-layer foreground-layer">
                        <Bar data={data(karbohidrat,100-karbohidrat)} options={config} />
                      </div>
                    </div>
                  </div>
                  <p className="macro-label">Karbohidrat</p>
                </div>

                {/* Protein */}
                <div className="macro-item">
                  <div className="macro-header">
                    <div className="macro-icon protein-icon">
                      <i className="fas fa-drumstick-bite"></i>
                    </div>
                    <div className="macro-info">
                      <span className="macro-value">
                        {!loading && tracking && tracking.tracking ? tracking.totProtein : 0}
                      </span>
                      <span className="macro-target">/ {butuhprotein}g</span>
                    </div>
                  </div>
                  <div className="macro-chart">
                    <div className="chart-container">
                      <div className="chart-layer background-layer">
                        <Bar data={maxdata(100)} options={config1} />
                      </div>
                      <div className="chart-layer foreground-layer">
                        <Bar data={data(protein,100-protein)} options={config} />
                      </div>
                    </div>
                  </div>
                  <p className="macro-label">Protein</p>
                </div>

                {/* Lemak */}
                <div className="macro-item">
                  <div className="macro-header">
                    <div className="macro-icon fat-icon">
                      <i className="fas fa-seedling"></i>
                    </div>
                    <div className="macro-info">
                      <span className="macro-value">
                        {!loading && tracking && tracking.tracking ? tracking.totLemak : 0}
                      </span>
                      <span className="macro-target">/ {butuhlemak}g</span>
                    </div>
                  </div>
                  <div className="macro-chart">
                    <div className="chart-container">
                      <div className="chart-layer background-layer">
                        <Bar data={maxdata(100)} options={config1} />
                      </div>
                      <div className="chart-layer foreground-layer">
                        <Bar data={data(lemak,100-lemak)} options={config} />
                      </div>
                    </div>
                  </div>
                  <p className="macro-label">Lemak</p>
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
      ) : tracking && tracking.tracking ? (
        <TrackingSection makanan={tracking.tracking.makanan} />
      ) : (
        <section className="empty-state">
          <div className="container">
            <div className="empty-content">
              <div className="empty-icon">
                <i className="fas fa-fire"></i>
              </div>
              <h3>Belum Ada Data Nutrisi</h3>
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
        .nutrition-hero {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          position: relative;
          overflow: hidden;
        }

        .nutrition-hero::before {
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

        .nutrition-stats {
          padding: 60px 0;
          background: #f8fafc;
        }

        .stats-card {
          background: white;
          border-radius: 30px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          opacity: 0.03;
          pointer-events: none;
        }

        .calories-section {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }

        .calories-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }

        .calories-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        }

        .calories-info {
          text-align: left;
        }

        .calories-value {
          font-size: 3.5rem;
          font-weight: 800;
          color: #f59e0b;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .calories-unit {
          font-size: 1.2rem;
          color: #64748b;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .calories-description p {
          color: #64748b;
          font-size: 1rem;
          margin: 0;
        }

        .macronutrients-section {
          position: relative;
          z-index: 2;
        }

        .macronutrients-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 30px;
          text-align: center;
        }

        .macronutrients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .macro-item {
          background: #f8fafc;
          border-radius: 20px;
          padding: 25px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .macro-item:hover {
          transform: translateY(-5px);
        }

        .macro-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .macro-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
        }

        .carb-icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }

        .protein-icon {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .fat-icon {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .macro-info {
          text-align: left;
        }

        .macro-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
        }

        .macro-target {
          font-size: 1rem;
          color: #64748b;
          margin-left: 5px;
        }

        .macro-chart {
          margin: 20px 0;
          height: 60px;
          position: relative;
        }

        .chart-container {
          position: relative;
          height: 100%;
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

        .macro-label {
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
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
          color: #f59e0b;
          text-decoration: none;
          font-weight: 600;
        }

        .text-link:hover {
          text-decoration: underline;
        }

        .action-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: none;
          border-radius: 50px;
          padding: 15px 30px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .calories-content {
            flex-direction: column;
            text-align: center;
          }

          .calories-info {
            text-align: center;
          }

          .calories-value {
            font-size: 2.5rem;
          }

          .macronutrients-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .macro-header {
            flex-direction: column;
            gap: 15px;
          }

          .macro-info {
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
}

const TrackingSection = ({ makanan }) => {
  return (
    <section className="food-items-container">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">
            <i className="fas fa-utensils me-2"></i>
            Makanan yang Dikonsumsi
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
                  key={index}
                  id={el.makananID._id}
                />
              </div>
            );
          })}
        </div>
      </div>

      <MakananModal />

      <style jsx>{`
        .food-items-container {
          padding: 60px 0;
          background: #f8fafc;
        }

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
          background: #f59e0b;
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .food-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
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
