import { memo } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";

/* ============================================================
 * Constants
 * (hoisted out of the component so they aren't re-created,
 * and re-parsed, on every render)
 * ============================================================ */

const NAV_ITEMS = [
  { path: "/predict", label: "Predict Disease", icon: "🔍" },
  { path: "/news", label: "News Updates", icon: "📰" },
  { path: "/surveys", label: "Take Survey", icon: "📋" },
  { path: "/chatbot", label: "AI Chatbot", icon: "🤖" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rupam-roy-choudhary-5287a23a1/",
    d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "GitHub",
    href: "https://github.com/rupamroychoudhury2008-star",
    d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    label: "Twitter",
    href: "https://x.com/ExplainedR",
    d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  },
  {
    label: "Email",
    href: "mailto:rupamroychoudhury2008@gmail.com",
    d: "M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm5.377 2.738l-5.364-6.337 5.364-4.545 5.364 4.545-5.364 6.337zm5.378-2.738l4.622-5.462v11.175l-4.622-5.713zm-11.002 6.071l4.472-5.526 1.153 1.363 1.152-1.363 4.473 5.526h-11.25z",
  },
];

/* Static CSS — defined once at module scope so the string (and the
 * <style> node's text content) isn't rebuilt on every render.
 * Single fixed dark theme (no light/dark toggle). */
const HOME_STYLES = `
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
    --focus-ring: #34d399;
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

  /* --- FOCUS VISIBILITY (accessibility floor) --- */
  .action-btn:focus-visible,
  .social-icon-link:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 3px;
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
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 10px;
    color: var(--text-primary);
    letter-spacing: -1px;
    text-transform: uppercase;
    text-shadow: 0 10px 30px rgba(0,0,0,0.35);
    transform: translateZ(20px);
  }

  .hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin: 0 0 40px;
    font-weight: 500;
    transform: translateZ(10px);
  }

  /* --- BUTTON GRID --- */
  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
    margin-top: 20px;
    transform-style: preserve-3d;
    list-style: none;
    padding: 0;
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

  /* --- ACTION BUTTON (CSS-driven hover/active, works for touch + keyboard) --- */
  .action-btn {
    background: linear-gradient(45deg, #10b981, #059669);
    color: #ffffff;
    border: none;
    padding: 18px 25px;
    clip-path: polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    position: relative;
    text-transform: uppercase;
    letter-spacing: 1px;
    transform-style: preserve-3d;
    transform: translateZ(0) translateY(0);
    filter: brightness(1);
    transition: transform 0.2s ease, filter 0.2s ease;
  }
  .action-btn:hover,
  .action-btn:focus-visible {
    transform: translateZ(10px) translateY(-5px);
    filter: brightness(1.1);
  }
  .action-btn:active {
    transform: scale(0.98) translateZ(0);
  }

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
  }

  .social-title {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 600;
    margin: 0 0 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .social-icons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
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

  .social-icon-link:hover,
  .social-icon-link:focus-visible {
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

  .social-icon-link:hover svg,
  .social-icon-link:focus-visible svg {
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
    .hero-title { font-size: 2.2rem; }
    .hero-subtitle { font-size: 1rem; }
  }

  /* --- REDUCED MOTION (accessibility floor) --- */
  @media (prefers-reduced-motion: reduce) {
    .pyramid,
    .glass-wrapper,
    .action-btn-wrapper,
    .farmer-avatar-wrapper,
    .farmer-eye,
    .social-footer,
    .action-btn,
    .social-icon-link {
      animation: none !important;
      transition: none !important;
    }
    .action-btn-wrapper,
    .social-footer {
      opacity: 1;
    }
  }
`;

/* ============================================================
 * Sub-components
 * ============================================================ */

const FarmerAvatar = () => (
  <svg viewBox="0 0 200 200" className="farmer-svg" role="img" aria-label="Illustrated Green Sathi farmer assistant avatar">
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
);

const BackgroundScene = () => (
  <div className="background-scene" aria-hidden="true">
    <div className="pyramid obj-1">
      <div></div><div></div><div></div><div></div>
    </div>
    <div className="pyramid obj-2">
      <div></div><div></div><div></div><div></div>
    </div>
    <div className="pyramid obj-3">
      <div></div><div></div><div></div><div></div>
    </div>

    <svg style={{ position: "absolute", width: 0, height: 0 }}>
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
);

/**
 * A single call-to-action tile in the home action grid.
 * @param {{ label: string, icon: string, onClick: () => void }} props
 */
const ActionButton = memo(function ActionButton({ label, icon, onClick }) {
  return (
    <button type="button" className="action-btn" onClick={onClick}>
      <span aria-hidden="true">{icon}</span> {label}
    </button>
  );
});

/**
 * Social / contact links footer.
 */
const SocialFooter = () => (
  <div className="social-footer">
    <p className="social-title">Connect With Us</p>
    <ul className="social-icons-container">
      {SOCIAL_LINKS.map(({ label, href, d }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="social-icon-link"
            aria-label={label}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={d} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ============================================================
 * Home
 * ============================================================ */

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <style>{HOME_STYLES}</style>

      <BackgroundScene />

      <div className="glass-wrapper">
        <GlassCard
          style={{
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
          }}
        >
          <main>
            <div className="farmer-avatar-wrapper">
              <FarmerAvatar />
            </div>

            <h1 className="hero-title">🌱 Green Sathi</h1>

            <p className="hero-subtitle">Smart farming assistance powered by AI</p>

            <ul className="action-grid">
              {NAV_ITEMS.map(({ path, label, icon }) => (
                <li className="action-btn-wrapper" key={path}>
                  <ActionButton label={label} icon={icon} onClick={() => navigate(path)} />
                </li>
              ))}
            </ul>

            <SocialFooter />
          </main>
        </GlassCard>
      </div>
    </div>
  );
}