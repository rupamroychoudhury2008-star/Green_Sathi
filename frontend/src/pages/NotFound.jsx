import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <style>{`
        /* --- 404 BROKEN VOID THEME --- */
        
        .not-found-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #09090b; /* Deep Void */
          color: white;
          font-family: 'Segoe UI', sans-serif;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        /* Background Shards */
        .void-shard {
          position: absolute;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }
        .s1 {
          width: 150px; height: 150px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          top: 20%; left: 15%;
          animation: floatShard 20s infinite linear;
        }
        .s2 {
          width: 100px; height: 100px;
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          bottom: 25%; right: 20%;
          animation: floatShardReverse 25s infinite linear;
        }
        .s3 {
          width: 60px; height: 60px;
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          top: 15%; right: 30%;
          animation: floatShard 15s infinite ease-in-out;
        }

        /* GLITCH 404 TEXT */
        .error-code {
          font-size: 10rem;
          font-weight: 900;
          letter-spacing: 10px;
          position: relative;
          color: #ffffff;
          text-shadow: 2px 2px 0px #22c55e, -2px -2px 0px #ef4444;
          animation: glitch 1s infinite;
          z-index: 2;
        }

        .error-code::before, .error-code::after {
          content: '404';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: #09090b;
        }

        .error-code::before {
          left: 2px;
          text-shadow: -1px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .error-code::after {
          left: -2px;
          text-shadow: -1px 0 #00fff9;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }

        .error-message {
          font-size: 1.5rem;
          color: #a1a1aa;
          margin-bottom: 40px;
          max-width: 500px;
          z-index: 2;
        }

        /* RETURN BUTTON */
        .home-btn {
          padding: 15px 35px;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(45deg, #10b981, #059669);
          border: none;
          cursor: pointer;
          /* Futuristic Cut Shape */
          clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
          transition: transform 0.2s, filter 0.2s;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 2;
        }

        .home-btn:hover {
          transform: translateY(-3px) scale(1.05);
          filter: brightness(1.2);
        }

        /* ANIMATIONS */
        @keyframes floatShard { 
          0% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(-30px) rotate(10deg); } 
          100% { transform: translateY(0) rotate(0deg); } 
        }
        @keyframes floatShardReverse { 
          0% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(30px) rotate(-10deg); } 
          100% { transform: translateY(0) rotate(0deg); } 
        }
        
        @keyframes glitch {
          2%, 64% { transform: translate(2px,0) skew(0deg); }
          4%, 60% { transform: translate(-2px,0) skew(0deg); }
          62% { transform: translate(0,0) skew(5deg); }
        }

        @keyframes glitch-anim {
          0% { clip: rect(14px, 9999px, 127px, 0); }
          5% { clip: rect(38px, 9999px, 46px, 0); }
          10% { clip: rect(89px, 9999px, 6px, 0); }
          15% { clip: rect(22px, 9999px, 88px, 0); }
          20% { clip: rect(66px, 9999px, 11px, 0); }
          25% { clip: rect(10px, 9999px, 94px, 0); }
          30% { clip: rect(120px, 9999px, 14px, 0); }
          35% { clip: rect(4px, 9999px, 122px, 0); }
          40% { clip: rect(55px, 9999px, 66px, 0); }
          45% { clip: rect(91px, 9999px, 23px, 0); }
          50% { clip: rect(14px, 9999px, 102px, 0); }
          55% { clip: rect(113px, 9999px, 83px, 0); }
          60% { clip: rect(27px, 9999px, 4px, 0); }
          65% { clip: rect(69px, 9999px, 147px, 0); }
          70% { clip: rect(98px, 9999px, 33px, 0); }
          75% { clip: rect(11px, 9999px, 76px, 0); }
          80% { clip: rect(138px, 9999px, 58px, 0); }
          85% { clip: rect(44px, 9999px, 19px, 0); }
          90% { clip: rect(81px, 9999px, 115px, 0); }
          95% { clip: rect(29px, 9999px, 92px, 0); }
          100% { clip: rect(14px, 9999px, 127px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(12px, 9999px, 18px, 0); }
          5% { clip: rect(132px, 9999px, 94px, 0); }
          10% { clip: rect(22px, 9999px, 14px, 0); }
          15% { clip: rect(88px, 9999px, 23px, 0); }
          20% { clip: rect(46px, 9999px, 11px, 0); }
          25% { clip: rect(109px, 9999px, 82px, 0); }
          30% { clip: rect(5px, 9999px, 137px, 0); }
          35% { clip: rect(144px, 9999px, 22px, 0); }
          40% { clip: rect(33px, 9999px, 99px, 0); }
          45% { clip: rect(111px, 9999px, 44px, 0); }
          50% { clip: rect(66px, 9999px, 18px, 0); }
          55% { clip: rect(18px, 9999px, 5px, 0); }
          60% { clip: rect(92px, 9999px, 144px, 0); }
          65% { clip: rect(23px, 9999px, 88px, 0); }
          70% { clip: rect(77px, 9999px, 11px, 0); }
          75% { clip: rect(138px, 9999px, 55px, 0); }
          80% { clip: rect(44px, 9999px, 99px, 0); }
          85% { clip: rect(9px, 9999px, 22px, 0); }
          90% { clip: rect(122px, 9999px, 66px, 0); }
          95% { clip: rect(55px, 9999px, 11px, 0); }
          100% { clip: rect(12px, 9999px, 18px, 0); }
        }
      `}</style>

      {/* Background Elements */}
      <div className="void-shard s1"></div>
      <div className="void-shard s2"></div>
      <div className="void-shard s3"></div>

      {/* Content */}
      <div className="error-code">404</div>
      <p className="error-message">
        System Malfunction: The page you are looking for has drifted into the digital void.
      </p>
      
      <button className="home-btn" onClick={() => navigate("/")}>
        Return to Safety
      </button>
    </div>
  );
}

export default NotFound;