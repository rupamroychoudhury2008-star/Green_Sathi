import { useState, useRef } from "react";

export default function Surveys() {
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const cardRef = useRef(null);

  const WORD_LIMIT = 250;

  function handleQueryChange(e) {
    const words = e.target.value.split(/\s+/).filter(Boolean);
    if (words.length <= WORD_LIMIT) {
      setQuery(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const wordCount = query.split(/\s+/).filter(Boolean).length;

  // --- 3D TILT LOGIC ---
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <div className="survey-page">
      <style>{`
        /* --- 3D SURVEY PAGE STYLING --- */

        .survey-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0f172a; /* Deep Space/Navy */
          background-image: 
            radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.1) 0px, transparent 50%);
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          padding: 20px;
          perspective: 1000px; /* Essential for 3D */
          overflow: hidden;
          position: relative;
        }

        /* 3D Floating Background Objects */
        .bg-shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(2px);
          animation: float3D 15s infinite linear;
          z-index: 0;
        }
        .shape-1 { width: 100px; height: 100px; top: 15%; left: 10%; animation-duration: 20s; transform: rotate(45deg); }
        .shape-2 { width: 150px; height: 150px; bottom: 15%; right: 10%; animation-duration: 25s; animation-direction: reverse; border-radius: 50%; }
        .shape-3 { width: 60px; height: 60px; top: 50%; left: 80%; animation-duration: 18s; }

        @keyframes float3D {
          0% { transform: translateY(0) rotate(0deg) translateZ(0); }
          50% { transform: translateY(-30px) rotate(180deg) translateZ(50px); }
          100% { transform: translateY(0) rotate(360deg) translateZ(0); }
        }

        /* 3D GLASS CARD */
        .card-container {
          perspective: 1000px;
          z-index: 10;
        }

        .glass-card {
          width: 100%;
          max-width: 500px;
          padding: 45px;
          border-radius: 20px;
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            inset 0 0 20px rgba(255,255,255,0.05);
          color: white;
          transform-style: preserve-3d; /* Allows children to pop out */
          transition: transform 0.1s ease-out; /* Smooth follow */
          animation: cardEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 3D Depth Layers */
        .card-content {
          transform: translateZ(30px); /* Lifts content off card */
        }

        h1 {
          margin: 0 0 10px 0;
          text-align: center;
          font-weight: 800;
          background: linear-gradient(to right, #34d399, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
          text-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .subtitle {
          text-align: center;
          font-size: 0.95rem;
          color: #94a3b8;
          margin-bottom: 35px;
        }

        /* Inputs - Floating effect */
        input, select, textarea {
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(15, 23, 42, 0.6);
          color: white;
          font-size: 1rem;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 18px;
          transition: all 0.3s ease;
          transform: translateZ(10px); /* Mild 3D lift */
        }

        input:focus, select:focus, textarea:focus {
          border-color: #34d399;
          background: rgba(15, 23, 42, 0.8);
          transform: translateZ(20px) scale(1.02); /* Pop out on focus */
          box-shadow: 0 10px 25px rgba(52, 211, 153, 0.1);
        }

        select option { background: #0f172a; color: white; }

        /* 3D Button */
        button[type="submit"] {
          margin-top: 15px;
          padding: 16px;
          width: 100%;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          transform: translateZ(25px); /* Button floats high */
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        }

        button[type="submit"]:hover {
          transform: translateZ(35px) scale(1.05);
          box-shadow: 0 15px 30px rgba(16, 185, 129, 0.5);
        }

        /* Success Message */
        .success-box {
          text-align: center;
          padding: 40px 20px;
          transform: translateZ(20px);
          animation: popIn 0.5s ease;
        }
        .success-icon { font-size: 4rem; margin-bottom: 20px; display: block; animation: bounce 1s infinite; }

        @keyframes cardEntrance { from { opacity: 0; transform: translateY(50px) rotateX(10deg); } to { opacity: 1; transform: translateY(0) rotateX(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8) translateZ(0); } to { opacity: 1; transform: scale(1) translateZ(20px); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

      `}</style>

      {/* Background Shapes */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="card-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="glass-card" ref={cardRef}>
          <div className="card-content">
            <h1>📋 Farmer Survey</h1>
            <p className="subtitle">Help us improve farming support.</p>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" required />
                <input type="text" placeholder="Your State" required />
                <input type="text" placeholder="Your District" required />
                
                <select required>
                  <option value="">Select Primary Crop</option>
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Maize</option>
                  <option>Vegetables</option>
                </select>

                <select required>
                  <option value="">Select Main Problem</option>
                  <option>Disease</option>
                  <option>Pests</option>
                  <option>Low Yield</option>
                  <option>Weather</option>
                </select>

                <textarea
                  placeholder="Describe your problem or query..."
                  value={query}
                  onChange={handleQueryChange}
                  rows={4}
                  required
                />

                <div style={{ fontSize: "12px", textAlign: "right", opacity: 0.6, marginBottom: '10px', color: '#cbd5e1' }}>
                  {wordCount}/{WORD_LIMIT} words
                </div>

                <button type="submit">Submit Survey</button>
              </form>
            ) : (
              <div className="success-box">
                <span className="success-icon">✅</span>
                <h2 style={{margin: '0 0 10px 0'}}>Received!</h2>
                <p style={{color: '#cbd5e1', lineHeight: '1.6'}}>
                  Thank you for your input.<br/>We will review it shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}