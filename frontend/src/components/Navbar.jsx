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

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      {/* 1. TOP NAVBAR (Unchanged) */}
      <nav className="navbar">
        <style>{`
          /* --- GOD LEVEL NAVBAR STYLING --- */
          
          /* 1. Container: Glassmorphism & Positioning */
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
            background: rgba(255, 255, 255, 0.9); /* Slight transparency */
            backdrop-filter: blur(12px); /* Glass effect */
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
            position: sticky;
            top: 0;
            z-index: 1000;
            animation: slideDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          /* 2. Logo: Gradient Text */
          .nav-logo {
            font-size: 1.8rem;
            font-weight: 800;
            text-decoration: none;
            /* Gradient for "Green Sathi" */
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
            gap: 30px;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-item {
            text-decoration: none;
            color: #2d3436; /* Dark Grey - Fixes visibility issue */
            font-weight: 600;
            font-size: 1.05rem;
            position: relative;
            padding: 5px 0;
            transition: color 0.3s ease;
          }

          .nav-item:hover {
            color: #11998e; /* Green on hover */
          }

          /* Animated Underline */
          .nav-item::after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px;
            bottom: 0;
            left: 0;
            background: linear-gradient(90deg, #11998e, #38ef7d);
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 2px;
          }

          .nav-item:hover::after,
          .nav-item.active::after {
            width: 100%;
          }

          /* Active State */
          .nav-item.active {
            color: #11998e;
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
            background: rgba(17, 24, 39, 0.95); /* Dark background */
            backdrop-filter: blur(5px);
            border-top: 1px solid #22c55e;
            display: flex;
            align-items: center;
            overflow: hidden;
            z-index: 2000;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
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
            color: #ecfdf5;
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