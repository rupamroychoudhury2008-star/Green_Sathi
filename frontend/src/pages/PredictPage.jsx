import { useState, useEffect } from "react";
import { predictCropDisease } from "../services/api";

function PredictPage() {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    language: "en",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const MAX_IMAGE_SIZE_MB = 5;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG and PNG images are allowed.");
      e.target.value = null;
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
      setError("Image size must be less than 5 MB.");
      e.target.value = null;
      return;
    }

    setError(null);
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.image) {
      setError("Please upload a crop image.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictCropDisease(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="predict-page">
       <style>{`
        /* --- BROKEN CRYSTAL / MATTE DARK THEME (NO NEON) --- */
        
        .predict-page {
          min-height: 100vh;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: #09090b; /* Deep Void */
          /* Subtle, non-glowing gradients */
          background-image: 
            radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(255, 255, 255, 0.05) 0px, transparent 50%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Floating Crystal Shards (Matte) */
        .predict-page::before {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%); 
          top: 10%; left: 10%;
          animation: shardFloat 12s infinite linear;
          z-index: 0;
        }
        .predict-page::after {
          content: '';
          position: absolute;
          width: 250px; height: 250px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          bottom: 15%; right: 5%;
          animation: shardFloatReverse 15s infinite linear;
          z-index: 0;
        }

        /* Main Card - FRACTURED GLASS (Matte finish) */
        .predict-card {
          background: rgba(40, 40, 45, 0.8); /* darker, flatter background */
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          /* Sharper, non-glowing shadow */
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
          border-radius: 4px; 
          padding: 45px !important; 
          display: flex;
          flex-direction: column; 
          gap: 30px;
          max-width: 600px; 
          width: 100%;
          z-index: 1; 
          position: relative;
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          color: #ffffff;
        }

        /* "Crack" Reflection Effect (Subtler) */
        .predict-card::before {
          content: '';
          position: absolute;
          top: 0; left: -150%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: skewX(-25deg);
          transition: 0.5s;
          pointer-events: none;
        }
        .predict-card:hover::before { left: 150%; transition: 0.7s; }

        .predict-card:has(.predict-result) {
          max-width: 1100px; 
          flex-direction: row; 
          align-items: flex-start;
          background: rgba(30, 30, 35, 0.9);
        }

        /* Removed neon hover glow */
        .predict-card:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .predict-form { flex: 1; min-width: 300px; transition: width 0.3s ease; }

        .predict-result {
          flex: 1.2; 
          border-left: 1px solid rgba(255,255,255,0.1);
          padding-left: 35px;
          margin-top: 0 !important; 
          border-top: none !important;
          opacity: 0;
          transform: translateX(30px);
          animation: shatterIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.1s;
        }

        /* Removed neon gradient text & shadow */
        h1 {
          color: #ffffff;
          font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
        }

        .predict-card h2, .predict-card h4 { color: #f0f9ff !important; letter-spacing: 0.5px; }
        .predict-card label { color: #a1a1aa !important; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; }
        .predict-card p, .predict-card li { color: #d4d4d8; }

        input[type="text"], select, input[type="file"] {
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 2px !important;
          padding: 14px 16px !important;
          background: rgba(0, 0, 0, 0.3); 
          color: #ffffff !important;
          width: 100%;
          clip-path: polygon(0 0, 100% 0, 100% 85%, 98% 100%, 0 100%);
        }
        
        select option { background: #09090b; color: white; }
        
        /* Removed neon focus glow */
        input[type="text"]:focus, select:focus {
          border-color: #ffffff !important; background: rgba(0, 0, 0, 0.5); outline: none;
        }

        /* Flat green button, no neon glow */
        button[type="submit"] {
          background: #10b981 !important; /* Solid Emerald */
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 2px !important;
          font-weight: 700 !important;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 16px !important;
          color: white !important;
          width: 100%;
          cursor: pointer;
          clip-path: polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        button[type="submit"]:hover:not(:disabled) { 
            transform: translateY(-2px); 
            background: #059669 !important; /* Darker Emerald on hover */
        }
        button[type="submit"]:disabled { background: #3f3f46 !important; cursor: not-allowed; color: #71717a !important;}

        img[alt="Preview"] {
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.2);
          animation: floatPreview 4s ease-in-out infinite;
          transform: rotate(-1deg); 
        }

        .predict-result > div > * { opacity: 0; filter: blur(10px); animation: sharpenIn 0.5s ease forwards; }
        .predict-result > div > *:nth-child(1) { animation-delay: 0.2s; }
        .predict-result > div > *:nth-child(2) { animation-delay: 0.3s; }
        .predict-result > div > *:nth-child(3) { animation-delay: 0.4s; }
        .predict-result > div > *:nth-child(4) { animation-delay: 0.5s; }

        /* --- WEATHER GRAPH STYLES (FLAT) --- */
        .weather-graph-container {
          margin-top: 10px;
          background: rgba(255,255,255,0.05);
          padding: 10px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .graph-row {
          margin-bottom: 8px;
        }
        .graph-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #a1a1aa;
          margin-bottom: 4px;
        }
        .graph-bar-bg {
          height: 6px;
          width: 100%;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .graph-bar-fill {
          height: 100%;
          animation: fillBar 1s ease-out forwards;
        }

        /* KEYFRAMES */
        @keyframes shardFloat { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        @keyframes shardFloatReverse { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(20px) rotate(-5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        @keyframes shatterIn { from { opacity: 0; transform: translateX(50px) scale(0.9); filter: blur(10px); } to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
        @keyframes sharpenIn { from { opacity: 0; filter: blur(10px); transform: translateY(10px); } to { opacity: 1; filter: blur(0); transform: translateY(0); } }
        @keyframes floatPreview { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
        @keyframes fillBar { from { width: 0; } }

        @media (max-width: 900px) {
          .predict-card:has(.predict-result) { flex-direction: column; align-items: stretch; }
          .predict-result { border-left: none; border-top: 1px solid rgba(255,255,255,0.2); padding-left: 0; padding-top: 30px; }
        }
      `}</style>
      <div className="predict-card">

        {/* FORM */}
        <div className="predict-form">
          <header style={{textAlign: 'center', marginBottom: '25px'}}>
            <h1>🌱 Green Sathi</h1>
            <p style={{color: '#a1a1aa', fontSize: '1.05em', marginTop: '5px'}}>AI-powered crop disease detection</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="e.g. Punjab" />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>District</label>
              <input type="text" name="district" value={formData.district} onChange={handleChange} required placeholder="e.g. Ludhiana" />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Language</label>
              <select name="language" value={formData.language} onChange={handleChange}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Crop Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} required />
            </div>

            {imagePreview && (
              <div style={{ textAlign: "center", margin: "25px 0" }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px", objectFit: 'cover' }} />
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Predict Disease"}
            </button>
          </form>

          {error && <p style={{ color: "#ef4444", marginTop: "15px", textAlign: 'center', animation: 'shake 0.5s', fontWeight: '600' }}>❌ {error}</p>}
        </div>

        {/* RESULT */}
        {result && (
          <div className="predict-result">
            <ResultDisplay result={result} />
          </div>
        )}

      </div>
    </div>
  );
}

// --- VISUALIZATION: WEATHER GRAPH (Flat Colors) ---
function WeatherGraph({ temp, humidity }) {
  const tempPercent = Math.min((temp / 50) * 100, 100);
  const humidPercent = Math.min(humidity, 100);

  return (
    <div className="weather-graph-container">
      {/* Temperature Bar - Standard Orange */}
      <div className="graph-row">
        <div className="graph-label">
          <span>Temperature</span>
          <span style={{color: '#fbbf24'}}>{temp}°C</span> 
        </div>
        <div className="graph-bar-bg">
          <div className="graph-bar-fill" style={{ width: `${tempPercent}%`, backgroundColor: '#fbbf24' }}></div>
        </div>
      </div>

      {/* Humidity Bar - Standard Blue */}
      <div className="graph-row">
        <div className="graph-label">
          <span>Humidity</span>
          <span style={{color: '#60a5fa'}}>{humidity}%</span>
        </div>
        <div className="graph-bar-bg">
          <div className="graph-bar-fill" style={{ width: `${humidPercent}%`, backgroundColor: '#60a5fa' }}></div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Component for Displaying Results (NO NEON) ---
function ResultDisplay({ result }) {
  const { model_prediction = {}, ai_analysis = {}, weather = {} } = result;
  const { prediction = {}, treatment = {}, soil = {}, advisory = {} } = ai_analysis;

  return (
    <div style={styles.card}>
      <div style={styles.resultHeader}>
        {/* Replaced Neon Cyan with standard light blue, removed shadow */}
        <h2 style={{margin:0, color: '#e0f2fe'}}>🌾 {model_prediction?.crop || "Unknown Crop"}</h2>
        <span style={styles.badge}>
          {model_prediction?.confidence}% Match
        </span>
      </div>
      
      {/* Replaced Neon Pink with standard red, removed shadow */}
      <p style={styles.diseaseTitle}>
        Detected: <b>{model_prediction?.disease || "N/A"}</b>
      </p>

      <hr style={styles.divider} />

      <div style={styles.infoGrid}>
        <div>
          <h4 style={styles.h4}>🧠 Analysis</h4>
          <p><b>Severity:</b> <span style={{color: prediction?.severity === 'High' ? '#f87171' : '#fbbf24'}}>{prediction?.severity || "Unknown"}</span></p>
          <p><b>Recovery:</b> {prediction?.recovery_days ? `${prediction.recovery_days} days` : "N/A"}</p>
        </div>
        <div>
           <h4 style={styles.h4}>🌦 Weather Stats</h4>
           <WeatherGraph temp={weather?.temperature || 0} humidity={weather?.humidity || 0} />
        </div>
      </div>

      <div style={styles.section}>
        <h4 style={styles.h4}>📝 Explanation</h4>
        <p style={{lineHeight: '1.6', color: '#e4e4e7'}}>{prediction?.explanation || "No details available."}</p>
      </div>

      <div style={styles.section}>
        <h4 style={styles.h4}>🧪 Treatment</h4>
        <ul style={styles.list}>
          <li><b>Product:</b> {treatment?.product}</li>
          <li><b>Dosage:</b> {treatment?.dosage}</li>
          <li><b>Method:</b> {treatment?.method}</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h4 style={styles.h4}>🌱 Soil Health</h4>
        <p><b>Type:</b> {soil?.type} | <b>Fertility:</b> {soil?.fertility}</p>
        <p>
         <b>NPK Balance:</b>{" "}
          {(() => {
            const npk = result.ai_analysis.soil.npk;
            if (!npk) return "Not available";
            if (typeof npk === "string") return npk;
            if (npk.N) return `${npk.N}:${npk.P}:${npk.K} ${npk.unit || ""}`;
            if (npk.n) return `${npk.n}:${npk.p}:${npk.k} ${npk.unit || ""}`;
            return "Not available";
          })()}
       </p>
      </div>

      <div style={styles.advisoryBox}>
        <h4 style={{marginTop: 0, color: '#fbbf24', display:'flex', alignItems:'center', gap:'8px'}}>⚠️ Advisory</h4>
        <p style={{margin:0, color: '#ffffff'}}>{advisory?.precautions}</p>
      </div>
    </div>
  );
}

// --- BROKEN CRYSTAL INLINE STYLES (NO NEON SHADOWS) ---
const styles = {
  card: { 
    padding: "25px", 
    clipPath: "polygon(2% 0, 100% 0, 100% 98%, 98% 100%, 0 100%, 0 2%)",
    backgroundColor: "rgba(0, 0, 0, 0.4)", 
    border: "1px solid rgba(255, 255, 255, 0.1)",
    // Removed glowing inset shadow
    boxShadow: "none"
  },
  resultHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '10px' },
  // Flat badge colors
  badge: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff", padding: "6px 12px", border: "1px solid rgba(255, 255, 255, 0.2)", fontSize: "0.85em", fontWeight: "700" },
  // Flat red color, no shadow
  diseaseTitle: { fontSize: "1.3em", color: "#f87171", margin: "5px 0", fontWeight: '500' }, 
  divider: { margin: "20px 0", borderTop: "1px solid rgba(255,255,255,0.1)" },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
  section: { marginBottom: "20px" },
  // Flat white/teal color, no shadow
  h4: { color: "#ffffff", marginBottom: '8px', marginTop: 0 }, 
  list: { paddingLeft: "20px", margin: "5px 0", color: "#d4d4d8" },
  // Flat yellow border, no glow
  advisoryBox: { 
    backgroundColor: 'rgba(251, 191, 36, 0.1)', /* Standard Amber */
    padding: '15px', 
    borderLeft: '3px solid #fbbf24' 
  } 
};

export default PredictPage;