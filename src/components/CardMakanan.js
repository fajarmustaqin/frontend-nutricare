import "../style/card-makanan.css";

export default function CardMakanan({makanan, image, penyetaraanPorsi, kalori, karbon}) {
  return (
    <div className="modern-card-container">
      <div className="food-image-container">
        <img
          className="food-image"
          src={image}
          alt={makanan}
          loading="lazy"
        />
        <div className="food-overlay">
          <div className="overlay-content">
            <i className="fas fa-eye"></i>
            <span>Lihat Detail</span>
          </div>
        </div>
      </div>
      
      <div className="food-content">
        <div className="food-header">
          <h5 className="food-title">{makanan}</h5>
          <p className="food-portion">{penyetaraanPorsi}</p>
        </div>
        
        <div className="food-metrics">
          <div className="metric-item calorie-metric">
            <div className="metric-icon">
              <i className="fas fa-fire"></i>
            </div>
            <div className="metric-content">
              <span className="metric-value">{kalori}</span>
              <span className="metric-unit">Kkal</span>
            </div>
          </div>
          
          <div className="metric-item carbon-metric">
            <div className="metric-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="metric-content">
              <span className="metric-value">{karbon}</span>
              <span className="metric-unit">CO₂</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .modern-card-container {
          height: 100%;
          background: white;
          border-radius: 25px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }
        
        .food-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        .food-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .food-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .overlay-content {
          color: white;
          text-align: center;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }
        
        .overlay-content i {
          font-size: 2rem;
          margin-bottom: 10px;
          display: block;
        }
        
        .overlay-content span {
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .modern-card-container:hover .food-overlay {
          opacity: 1;
        }
        
        .modern-card-container:hover .overlay-content {
          transform: translateY(0);
        }
        
        .modern-card-container:hover .food-image {
          transform: scale(1.1);
        }
        
        .food-content {
          padding: 25px 20px;
          position: relative;
        }
        
        .food-header {
          margin-bottom: 20px;
          text-align: center;
        }
        
        .food-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .food-portion {
          font-size: 0.85rem;
          color: #718096;
          margin: 0;
          font-weight: 500;
        }
        
        .food-metrics {
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }
        
        .metric-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          border-radius: 15px;
          transition: all 0.3s ease;
        }
        
        .calorie-metric {
          background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
        }
        
        .carbon-metric {
          background: linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%);
        }
        
        .metric-icon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .calorie-metric .metric-icon {
          color: #e17055;
        }
        
        .carbon-metric .metric-icon {
          color: #00b894;
        }
        
        .metric-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .metric-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #2d3748;
        }
        
        .metric-unit {
          font-size: 0.7rem;
          color: #718096;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .metric-item:hover {
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .food-image-container {
            height: 160px;
          }
          
          .food-content {
            padding: 20px 15px;
          }
          
          .food-title {
            font-size: 1rem;
          }
          
          .metric-item {
            padding: 10px 12px;
            gap: 8px;
          }
          
          .metric-icon {
            width: 30px;
            height: 30px;
          }
          
          .metric-value {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
