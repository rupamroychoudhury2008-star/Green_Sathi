import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";

export default function Home() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("green-sathi-theme");
      if (saved === "light" || saved === "dark") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
    } catch (e) {
      /* localStorage unavailable — fall back to dark */
    }
    return "dark";
  });

  useEffect(() => {
    try {
      localStorage.setItem("green-sathi-theme", theme);
    } catch (e) {
      /* ignore write errors (e.g. private browsing) */
    }
  }, [theme]);

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="home-container" data-theme={theme}>
      <style>{`
        /* ============================== THEME TOKENS ============================== */
        .home-container {
          --bg: #09090b;
          --bg-radial-1: rgba(255, 255, 255, 0.08);
          --bg-radial-2: rgba(255, 255, 255, 0.05);
          --card-bg: rgba(30, 30, 35, 0.7);
          --card-border: rgba(255, 255, 255, 0.1);
          --card-shadow: rgba(0, 0, 0, 0.8);
          --text-primary: #ffffff;
          --text-secondary: #a1a1aa;
          --text-muted: #71717a;
          --divider: rgba(255, 255, 255, 0.1);
          --crystal-face: rgba(255, 255, 255, 0.08);
          --social-bg: rgba(255, 255, 255, 0.1);
          --social-border: rgba(255, 255, 255, 0.1);
          --social-icon: #a1a1aa;
          --social-hover-bg: #ffffff;
          --social-hover-icon: #09090b;
          --toggle-bg: rgba(255, 255, 255, 0.08);
          --toggle-border: rgba(255, 255, 255, 0.15);
          --toggle-icon: #fbbf24;

          transition: background-color 0.4s ease, color 0.4s ease;
        }

        .home-container[data-theme="light"] {
          --bg: #f4f4f5;
          --bg-radial-1: rgba(16, 185, 129, 0.08);
          --bg-radial-2: rgba(34, 197, 94, 0.06);
          --card-bg: rgba(255, 255, 255, 0.75);
          --card-border: rgba(9, 9, 11, 0.08);
          --card-shadow: rgba(9, 9, 11, 0.18);
          --text-primary: #0f172a;
          --text-secondary: #52525b;
          --text-muted: #71717a;
          --divider: rgba(9, 9, 11, 0.1);
          --crystal-face: rgba(9, 9, 11, 0.04);
          --social-bg: rgba(9, 9, 11, 0.05);
          --social-border: rgba(9, 9, 11, 0.1);
          --social-icon: #52525b;
          --social-hover-bg: #0f172a;
          --social-hover-icon: #ffffff;
          --toggle-bg: rgba(9, 9, 11, 0.05);
          --toggle-border: rgba(9, 9, 11, 0.12);
          --toggle-icon: #f59e0b;
        }

        /* --- LAYOUT --- */
        .home-container {
          min-height: 100vh;
          padding: 80px 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--bg);
          background-image:
            radial-gradient(at 0% 0%, var(--bg-radial-1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, var(--bg-radial-2) 0px, transparent 50%);
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
          position: relative;
          perspective: 1200px;
        }

        /* --- THEME TOGGLE --- */
        .theme-toggle {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 20;
          width: 48px;
          height: 48px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--toggle-bg);
          border: 1px solid var(--toggle-border);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease, border-color 0.3s ease;
          color: var(--toggle-icon);
        }
        .theme-toggle:hover {
          transform: translateY(-3px) scale(1.06);
        }
        .theme-toggle:active {
          transform: scale(0.94);
        }
        .theme-toggle svg {
          width: 22px;
          height: 22px;
          transition: transform 0.4s ease, opacity 0.3s ease;
        }

        /* --- 3D FLOATING CRYSTALS --- */
        .background-scene {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
          transform-style: preserve-3d;
        }

        .pyramid {
          position: absolute;
          width: 100px;
          height: 100px;
          transform-style: preserve-3d;
          animation: spin3D 20s infinite linear;
        }

        .pyramid div {
          position: absolute;
          width: 0; height: 0;
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
          border-bottom: 86.6px solid var(--crystal-face);
          transform-origin: 50% 57.7%;
          backdrop-filter: blur(2px);
          transition: border-bottom-color 0.4s ease;
        }

        .pyramid div:nth-child(1) { transform: rotateX(30deg) translateZ(28.8px); }
        .pyramid div:nth-child(2) { transform: rotateY(120deg) rotateX(30deg) translateZ(28.8px); }
        .pyramid div:nth-child(3) { transform: rotateY(240deg) rotateX(30deg) translateZ(28.8px); }
        .pyramid div:nth-child(4) { transform: rotateX(-90deg) translateZ(28.8px); }

        .obj-1 { top: 15%; left: 10%; animation-duration: 25s; scale: 1.5; }
        .obj-2 { bottom: 20%; right: 15%; animation-duration: 35s; animation-direction: reverse; scale: 1.2; }
        .obj-3 { top: 60%; left: -5%; animation-duration: 40s; scale: 0.8; opacity: 0.5; }

        /* --- MAIN CARD --- */
        .glass-wrapper {
          position: relative;
          z-index: 10;
          transform-style: preserve-3d;
          animation: cardFloat3D 6s ease-in-out infinite;
        }

        /* --- TYPOGRAPHY --- */
        .hero-title {
          font-size: 3.5rem !important;
          font-weight: 800;
          margin-bottom: 10px;
          color: var(--text-primary);
          letter-spacing: -1px;
          text-transform: uppercase;
          text-shadow: 0 10px 30px rgba(0,0,0,0.35);
          transform: translateZ(20px);
          transition: color 0.4s ease;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 40px !important;
          font-weight: 500;
          transform: translateZ(10px);
          transition: color 0.4s ease;
        }

        /* --- BUTTON GRID --- */
        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 20px;
          margin-top: 20px;
          transform-style: preserve-3d;
        }

        .action-btn-wrapper {
          opacity: 0;
          animation: fadeInUp 0.5s ease forwards;
          transform: translateZ(30px);
        }
        .action-btn-wrapper:nth-child(1) { animation-delay: 0.2s; }
        .action-btn-wrapper:nth-child(2) { animation-delay: 0.3s; }
        .action-btn-wrapper:nth-child(3) { animation-delay: 0.4s; }
        .action-btn-wrapper:nth-child(4) { animation-delay: 0.5s; }

        /* --- AVATAR --- */
        .farmer-avatar-wrapper {
          width: 130px;
          height: 130px;
          margin: 0 auto 15px auto;
          animation: floatAvatar 3s ease-in-out infinite;
          filter: drop-shadow(0 25px 35px rgba(0,0,0,0.5));
          transform: translateZ(40px);
        }

        .farmer-svg { width: 100%; height: 100%; overflow: visible; }
        .farmer-eye { animation: blink 4s infinite; transform-origin: center; }

        /* --- SOCIAL FOOTER --- */
        .social-footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid var(--divider);
          animation: fadeInUp 0.8s ease forwards;
          animation-delay: 0.6s;
          opacity: 0;
          transform: translateZ(15px);
          transition: border-color 0.4s ease;
        }

        .social-title {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: color 0.4s ease;
        }

        .social-icons-container {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .social-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%);
          background: var(--social-bg);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid var(--social-border);
          cursor: pointer;
          text-decoration: none;
        }

        .social-icon-link:hover {
          background: var(--social-hover-bg);
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.35);
        }

        .social-icon-link svg {
          width: 20px;
          height: 20px;
          fill: var(--social-icon);
          transition: fill 0.2s ease;
        }

        .social-icon-link:hover svg {
          fill: var(--social-hover-icon);
        }

        /* KEYFRAMES */
        @keyframes spin3D {
          0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
          100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
        }
        @keyframes cardFloat3D {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(2deg) rotateY(-2deg); }
          50% { transform: rotateX(0deg) rotateY(0deg) translateY(-10px); }
          75% { transform: rotateX(-2deg) rotateY(2deg); }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px) translateZ(0); } to { opacity: 1; transform: translateY(0) translateZ(30px); } }
        @keyframes floatAvatar { 0%, 100% { transform: translateY(0) translateZ(40px); } 50% { transform: translateY(-15px) translateZ(40px); } }
        @keyframes blink { 0%, 48%, 52%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }

        /* --- RESPONSIVE --- */
        @media (max-width: 640px) {
          .home-container { padding: 100px 20px 40px; }
          .hero-title { font-size: 2.2rem !important; }
          .hero-subtitle { font-size: 1rem; }
          .theme-toggle { top: 16px; right: 16px; width: 42px; height: 42px; }
        }
      `}</style>

      {/* --- THEME TOGGLE BUTTON --- */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>

      {/* --- BACKGROUND SCENE (3D CRYSTALS) --- */}
      <div className="background-scene">
        <div className="pyramid obj-1">
          <div></div><div></div><div></div><div></div>
        </div>
        <div className="pyramid obj-2">
          <div></div><div></div><div></div><div></div>
        </div>
        <div className="pyramid obj-3">
          <div></div><div></div><div></div><div></div>
        </div>

        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cd853f" />
              <stop offset="100%" stopColor="#8b4513" />
            </linearGradient>
            <linearGradient id="turbanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="kurtaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* --- MAIN CARD (Glassmorphism) --- */}
      <div className="glass-wrapper">
        <GlassCard style={{
            maxWidth: "700px",
            padding: "50px",
            borderRadius: "20px",
            background: "var(--card-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--card-border)",
            boxShadow: "0 50px 100px var(--card-shadow)",
            textAlign: "center",
            transformStyle: "preserve-3d",
            transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease"
        }}>

          {/* CENTER AVATAR */}
          <div className="farmer-avatar-wrapper">
            <svg viewBox="0 0 200 200" className="farmer-svg">
              <circle cx="100" cy="100" r="60" fill="#fef08a" opacity="0.1" />
              <path d="M50,70 Q100,20 150,70 Q160,90 100,85 Q40,90 50,70" fill="url(#turbanGradient)" filter="drop-shadow(0 5px 5px rgba(0,0,0,0.5))" />
              <path d="M100,35 Q120,50 110,75" stroke="#c2410c" strokeWidth="2" fill="none" opacity="0.5" />
              <circle cx="100" cy="100" r="35" fill="url(#skinGradient)" />
              <circle cx="88" cy="95" r="4" fill="#1f2937" className="farmer-eye" />
              <circle cx="112" cy="95" r="4" fill="#1f2937" className="farmer-eye" />
              <path d="M85,110 Q100,105 115,110 Q120,100 115,110" stroke="#1f2937" strokeWidth="3" fill="none" />
              <path d="M60,135 Q100,150 140,135 L140,180 Q100,190 60,180 Z" fill="url(#kurtaGradient)" />
              <path d="M100,135 L100,180" stroke="#d1d5db" strokeWidth="1" />
              <path d="M70,135 Q100,160 130,135" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="hero-title">
            🌱 Green Sathi
          </h1>

          <p className="hero-subtitle">
            Smart farming assistance powered by AI
          </p>

          <div className="action-grid">
            <div className="action-btn-wrapper">
              <ActionButton onClick={() => navigate("/predict")}>
                🔍 Predict Disease
              </ActionButton>
            </div>

            <div className="action-btn-wrapper">
              <ActionButton onClick={() => navigate("/news")}>
                📰 News Updates
              </ActionButton>
            </div>

            <div className="action-btn-wrapper">
              <ActionButton onClick={() => navigate("/surveys")}>
                📋 Take Survey
              </ActionButton>
            </div>

            <div className="action-btn-wrapper">
              <ActionButton onClick={() => navigate("/chatbot")}>
                🤖 AI Chatbot
              </ActionButton>
            </div>
          </div>

          {/* --- SOCIAL MEDIA & CONTACT --- */}
          <div className="social-footer">
            <p className="social-title">Connect With Us</p>
            <div className="social-icons-container">

              <a href="https://www.linkedin.com/in/rupam-roy-choudhary-5287a23a1/" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>

              <a href="https://github.com/rupamroychoudhury2008-star" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>

              <a href="https://x.com/ExplainedR" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>

              <a href="mailto:rupamroychoudhury2008@gmail.com" className="social-icon-link" aria-label="Email">
                <svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm5.377 2.738l-5.364-6.337 5.364-4.545 5.364 4.545-5.364 6.337zm5.378-2.738l4.622-5.462v11.175l-4.622-5.713zm-11.002 6.071l4.472-5.526 1.153 1.363 1.152-1.363 4.473 5.526h-11.25z"/></svg>
              </a>

            </div>
          </div>

        </GlassCard>
      </div>
    </div>
  );
}

function ActionButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "linear-gradient(45deg, #10b981, #059669)",
        color: "white",
        border: "none",
        padding: "18px 25px",
        clipPath: "polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)",
        fontWeight: 700,
        fontSize: "1rem",
        cursor: "pointer",
        width: "100%",
        transition: "all 0.2s ease",
        position: "relative",
        textTransform: "uppercase",
        letterSpacing: "1px",
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateZ(10px) translateY(-5px)";
        e.currentTarget.style.filter = "brightness(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateZ(0) translateY(0)";
        e.currentTarget.style.filter = "brightness(1)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.98) translateZ(0)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateZ(10px) translateY(-5px)";
      }}
    >
      {children}
    </button>
  );
}