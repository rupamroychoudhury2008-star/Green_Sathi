import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// --- 30 PRE-DEFINED FARMING FACTS ---
const FARMING_FACTS = [
  "Agriculture employs over 1 billion people globally.",
  "India is the world's largest producer of milk.",
  "Bananas are technically berries, but strawberries are not.",
  "Soil is a living ecosystem; a teaspoon contains more microorganisms than people on Earth.",
  "Rice is the staple food for more than half of the world's population.",
  "Honey never spoils; archaeologists have found edible honey in ancient Egyptian tombs.",
  "Earthworms act as natural plows, aerating the soil and cycling nutrients.",
  "99% of all pumpkins sold are used for Jack-o'-Lanterns.",
  "Fungi and bacteria in soil help plants absorb nutrients.",
  "It takes about 2,700 liters of water to make one cotton shirt.",
  "Apples float in water because 25% of their volume is air.",
  "China is the world's largest producer of wheat.",
  "Crop rotation helps maintain soil health and reduces pest buildup.",
  "Potatoes were the first food to be grown in space (1995).",
  "India is the second-largest producer of fruits and vegetables in the world.",
  "The world's most expensive spice is Saffron.",
  "Hydroponics allows plants to grow without soil, using mineral nutrient solutions.",
  "Only 3% of the earth's water is fresh water suitable for farming.",
  "Ladybugs are natural pest controllers; they eat aphids that damage crops.",
  "The Green Revolution in India transformed the country into a food-surplus nation.",
  "Corn is grown on every continent except Antarctica.",
  "Organic farming prohibits the use of synthetic fertilizers and pesticides.",
  "Bamboo is the fastest-growing woody plant in the world.",
  "Cranberries bounce when they are ripe.",
  "Drip irrigation saves up to 50% more water than traditional flood irrigation.",
  "A single cow gives about 200,000 glasses of milk in a lifetime.",
  "Soybeans are a complete source of protein, containing all essential amino acids.",
  "Global food production must increase by 70% by 2050 to feed the population.",
  "Tomatoes have more genes than humans.",
  "Agriculture contributes to about 18% of India's GDP."
];

const THEME_STORAGE_KEY = "green-sathi-theme";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  } catch {
    /* localStorage/matchMedia unavailable (SSR, private browsing, etc.) */
  }
  return "light";
}

export default function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore write errors (e.g. private browsing / storage full) */
    }
  }, [theme]);

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      {/* 1. TOP NAVBAR (Unchanged) */}
      <nav className="navbar">
        <style>{`
          /* --- GOD LEVEL NAVBAR STYLING --- */

          /* --- THEME TOKENS (default = light, matches original look) --- */
          :root {
            --navbar-bg: rgba(255, 255, 255, 0.9);
            --navbar-shadow: rgba(0, 0, 0, 0.05);
            --nav-text: #2d3436;
            --nav-text-hover: #11998e;
            --nav-accent-1: #11998e;
            --nav-accent-2: #38ef7d;
            --ticker-bg: rgba(17, 24, 39, 0.95);
            --ticker-border: #22c55e;
            --ticker-text: #ecfdf5;
            --toggle-bg: rgba(9, 9, 11, 0.05);
            --toggle-border: rgba(9, 9, 11, 0.12);
            --toggle-icon: #11998e;
          }

          :root[data-theme="dark"] {
            --navbar-bg: rgba(17, 24, 39, 0.9);
            --navbar-shadow: rgba(0, 0, 0, 0.4);
            --nav-text: #e5e7eb;
            --nav-text-hover: #38ef7d;
            --nav-accent-1: #11998e;
            --nav-accent-2: #38ef7d;
            --ticker-bg: rgba(9, 9, 11, 0.95);
            --ticker-border: #22c55e;
            --ticker-text: #ecfdf5;
            --toggle-bg: rgba(255, 255, 255, 0.08);
            --toggle-border: rgba(255, 255, 255, 0.15);
            --toggle-icon: #fbbf24;
          }
          
          /* 1. Container: Glassmorphism & Positioning */
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
            background: var(--navbar-bg);
            backdrop-filter: blur(12px); /* Glass effect */
            box-shadow: 0 4px 30px var(--navbar-shadow);
            position: sticky;
            top: 0;
            z-index: 1000;
            animation: slideDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
            transition: background 0.3s ease, box-shadow 0.3s ease;
          }

          /* 2. Logo: Gradient Text */
          .nav-logo {
            font-size: 1.8rem;
            font-weight: 800;
            text-decoration: none;
            /* Gradient for "Green Sathi" */
            background: linear-gradient(135deg, var(--nav-accent-1) 0%, var(--nav-accent-2) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: transform 0.3s ease;
          }

          /* Prevent Emoji from getting gradient color */
          .nav-logo span {
            -webkit-text-fill-color: initial;
            font-size: 1.6rem;
          }

          .nav-logo:hover {
            transform: scale(1.03);
          }

          /* 3. Links: Dark Color & Animations */
          .nav-links {
            display: flex;
            align-items: center;
            gap: 30px;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-item {
            text-decoration: none;
            color: var(--nav-text); /* Fixes visibility issue */
            font-weight: 600;
            font-size: 1.05rem;
            position: relative;
            padding: 5px 0;
            transition: color 0.3s ease;
          }

          .nav-item:hover {
            color: var(--nav-text-hover); /* Green on hover */
          }

          /* Animated Underline */
          .nav-item::after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px;
            bottom: 0;
            left: 0;
            background: linear-gradient(90deg, var(--nav-accent-1), var(--nav-accent-2));
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 2px;
          }

          .nav-item:hover::after,
          .nav-item.active::after {
            width: 100%;
          }

          /* Active State */
          .nav-item.active {
            color: var(--nav-accent-1);
          }

          /* --- THEME TOGGLE BUTTON --- */
          .nav-theme-toggle {
            width: 36px;
            height: 36px;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--toggle-bg);
            border: 1px solid var(--toggle-border);
            color: var(--toggle-icon);
            cursor: pointer;
            transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease, border-color 0.3s ease;
            flex-shrink: 0;
          }
          .nav-theme-toggle:hover {
            transform: translateY(-2px) scale(1.06);
          }
          .nav-theme-toggle:active {
            transform: scale(0.94);
          }
          .nav-theme-toggle svg {
            width: 18px;
            height: 18px;
          }

          @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Mobile Responsiveness */
          @media (max-width: 768px) {
            .navbar { padding: 15px 20px; }
            .nav-logo { font-size: 1.4rem; }
            .nav-links { gap: 15px; }
            .nav-item { font-size: 0.9rem; }
          }

          /* --- 4. FLOATING BOTTOM TICKER STYLES (NEW) --- */
          .fact-ticker-container {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background: var(--ticker-bg);
            backdrop-filter: blur(5px);
            border-top: 1px solid var(--ticker-border);
            display: flex;
            align-items: center;
            overflow: hidden;
            z-index: 2000;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
            transition: background 0.3s ease;
          }

          .ticker-track {
            display: flex;
            white-space: nowrap;
            animation: scrollText 120s linear infinite; /* Adjust speed here */
          }

          .ticker-track:hover {
            animation-play-state: paused; /* Pause on hover to read */
          }

          .ticker-item {
            color: var(--ticker-text);
            font-size: 0.95rem;
            font-family: 'Segoe UI', sans-serif;
            margin-right: 60px; /* Space between facts */
            display: flex;
            align-items: center;
            font-weight: 500;
          }

          .ticker-icon {
            margin-right: 8px;
            font-size: 1.1rem;
          }

          @keyframes scrollText {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}</style>

        {/* LEFT: Logo with Green Gradient */}
        <Link to="/" className="nav-logo">
          <span>🌱</span> Green Sathi
        </Link>

        {/* RIGHT: Links with Dark Text */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          
          <Link 
            to="/predict" 
            className={`nav-item ${location.pathname === "/predict" ? "active" : ""}`}
          >
            Predict
          </Link>
          
          <Link 
            to="/news" 
            className={`nav-item ${location.pathname === "/news" ? "active" : ""}`}
          >
            News
          </Link>
          
          <Link 
            to="/chatbot" 
            className={`nav-item ${location.pathname === "/chatbot" ? "active" : ""}`}
          >
            Chatbot
          </Link>

          <Link 
            to="/surveys" 
            className={`nav-item ${location.pathname === "/surveys" ? "active" : ""}`}
          >
            Surveys
          </Link>

          <button
            type="button"
            className="nav-theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
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
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" focusable="false">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 2. FLOATING BOTTOM TICKER (NEW) */}
      <div className="fact-ticker-container">
        <div className="ticker-track">
          {/* Render facts twice to ensure smooth infinite loop illusion */}
          {[...FARMING_FACTS, ...FARMING_FACTS].map((fact, index) => (
            <span key={index} className="ticker-item">
              <span className="ticker-icon">💡</span> {fact}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}