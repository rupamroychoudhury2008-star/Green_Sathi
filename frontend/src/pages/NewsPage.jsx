import { useEffect, useState, useRef } from "react";
import { fetchNews } from "../services/newsApi";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const articles = await fetchNews();
        console.log("NEWS RECEIVED IN UI:", articles);
        setNews(articles);
      } catch (err) {
        console.error(err);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) return (
    <div className="news-loading">
      <div className="spinner"></div>
      <p>Fetching latest updates...</p>
      <style>{`
        .news-loading {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
          color: #555;
          background: #f0fdf4;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #e0e0e0;
          border-top: 5px solid #22c55e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  if (error) return <p style={{ color: "red", textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}>{error}</p>;
  if (!news.length) return <p style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}>No news available right now.</p>;

  return (
    <div className="news-page">
      <style>{`
        /* --- 3D ANIMATIONS & STYLING --- */
        
        .news-page {
          padding: 60px 20px;
          min-height: 100vh;
          background: #f0fdf4; 
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          position: relative;
          overflow-x: hidden;
          perspective: 1000px; /* Essential for 3D context */
        }

        /* 3D Floating Cubes Background */
        .cube-container {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .cube {
          position: absolute;
          width: 60px; height: 60px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          animation: floatCube 15s infinite linear;
          transform-style: preserve-3d;
        }
        .c1 { top: 10%; left: 10%; animation-duration: 12s; }
        .c2 { top: 40%; right: 15%; animation-duration: 18s; animation-direction: reverse; scale: 1.5; }
        .c3 { bottom: 10%; left: 20%; animation-duration: 15s; scale: 0.8; }

        @keyframes floatCube {
          0% { transform: rotateX(0) rotateY(0) translateY(0); }
          50% { transform: rotateX(180deg) rotateY(90deg) translateY(-50px); }
          100% { transform: rotateX(360deg) rotateY(180deg) translateY(0); }
        }

        /* HEADER */
        .news-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 1;
          animation: slideDownFade 0.8s ease-out;
        }

        .news-header h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          font-weight: 800;
          background: linear-gradient(90deg, #166534, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* GRID */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          padding: 20px; /* Space for tilt overlap */
        }

        /* 3D CARD STYLES */
        .card-wrapper {
          perspective: 1000px; /* Individual perspective for each card */
        }

        .news-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.05),
            0 1px 3px rgba(0,0,0,0.02);
          transition: transform 0.1s ease-out, box-shadow 0.3s ease; /* Fast transform for mouse follow */
          transform-style: preserve-3d;
          border: 1px solid rgba(255,255,255,0.8);
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          
          /* Entrance Animation */
          opacity: 0;
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* Gloss Reflection */
        .news-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0) 60%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 2;
        }

        .news-card:hover::before {
          opacity: 1;
        }

        .news-card:hover {
          box-shadow: 
            0 20px 50px rgba(34, 197, 94, 0.15), /* Green glow shadow */
            0 5px 15px rgba(0,0,0,0.05);
          /* Transform handled by JS */
        }

        /* 3D Content Layers */
        .card-content {
          transform: translateZ(20px); /* Lifts text off card */
        }

        .news-card h3 {
          margin-top: 0;
          color: #1e293b;
          font-size: 1.3rem;
          line-height: 1.4;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .news-card p {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 25px;
          flex-grow: 1;
        }

        /* 3D Button */
        .read-more-btn {
          display: inline-block;
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s;
          transform: translateZ(30px); /* Button floats highest */
          align-self: flex-start;
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
        }

        .read-more-btn:hover {
          transform: translateZ(40px) scale(1.05);
          box-shadow: 0 10px 20px rgba(34, 197, 94, 0.5);
        }

        /* Animation Delays */
        .card-wrapper:nth-child(1) .news-card { animation-delay: 0.1s; }
        .card-wrapper:nth-child(2) .news-card { animation-delay: 0.2s; }
        .card-wrapper:nth-child(3) .news-card { animation-delay: 0.3s; }
        .card-wrapper:nth-child(n+4) .news-card { animation-delay: 0.4s; }

        @keyframes slideDownFade { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8) translateY(50px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        @media (max-width: 768px) {
          .news-header h1 { font-size: 2.2rem; }
          .news-page { padding: 30px 15px; }
        }
      `}</style>

      {/* 3D Background Objects */}
      <div className="cube-container">
        <div className="cube c1"></div>
        <div className="cube c2"></div>
        <div className="cube c3"></div>
      </div>

      <div className="news-header">
        <h1>News & Government Updates</h1>
        <p style={{ color: '#64748b' }}>Latest announcements curated for you</p>
      </div>

      <div className="news-grid">
        {news.map((item, index) => (
          <TiltCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

// --- NEW COMPONENT: 3D TILT CARD ---
function TiltCard({ item }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    }
  };

  return (
    <div className="card-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="news-card" ref={cardRef}>
        <div className="card-content">
          <h3>{item.title}</h3>
          <p>{item.description ? item.description.slice(0, 100) + "..." : "Click below to read more about this update."}</p>
          
          <a href={item.url} target="_blank" rel="noreferrer" className="read-more-btn">
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;