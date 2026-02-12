import { useState } from "react";
import { sendMessage } from "../services/chatbotApi";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(userMsg.text);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot-page">
      <style>{`
        /* --- GOD LEVEL ANIMATIONS & CHAT UI --- */
        
        .chatbot-page {
          min-height: 80vh;
          display: flex;
          justify-content: center;
          align-items: center;
          /* Futuristic Dark Base */
          background: #0f172a; 
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* --- NEW: FUTURISTIC BACKGROUND ANIMATION --- */
        .tech-background {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
          overflow: hidden;
          background: radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%);
        }

        /* 1. Moving 3D Grid */
        .tech-grid {
          position: absolute;
          width: 200%;
          height: 200%;
          bottom: -50%;
          left: -50%;
          background-image: 
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          animation: gridMove 10s linear infinite;
          opacity: 0.6;
        }

        /* 2. Floating Data Particles */
        .tech-particle {
          position: absolute;
          background: rgba(34, 197, 94, 0.4);
          width: 4px; height: 4px;
          border-radius: 50%;
          animation: floatUp linear infinite;
        }
        .p1 { left: 10%; top: 100%; animation-duration: 7s; animation-delay: 0s; }
        .p2 { left: 30%; top: 100%; animation-duration: 10s; animation-delay: 2s; width: 6px; height: 6px; }
        .p3 { left: 70%; top: 100%; animation-duration: 6s; animation-delay: 4s; }
        .p4 { left: 90%; top: 100%; animation-duration: 9s; animation-delay: 1s; width: 3px; height: 3px; }
        .p5 { left: 50%; top: 100%; animation-duration: 12s; animation-delay: 5s; background: rgba(59, 130, 246, 0.5); }

        /* 3. Glow Orb */
        .tech-glow {
          position: absolute;
          top: -20%; left: 20%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
          animation: glowPulse 8s ease-in-out infinite alternate;
        }

        /* Animations for BG */
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
        @keyframes glowPulse {
          0% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          100% { transform: scale(1.2) translate(50px, 20px); opacity: 0.8; }
        }


        /* Main Chat Container - Glassmorphism */
        .chat-container {
          width: 100%;
          max-width: 500px;
          /* Updated Glass Effect for Dark BG */
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(25px);
          border-radius: 25px;
          box-shadow: 
            0 20px 50px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 600px;
          position: relative;
          z-index: 10; /* Above BG */
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9));
          padding: 15px 20px;
          color: white;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .header-text h1 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .header-text p {
          margin: 2px 0 0;
          font-size: 0.85rem;
          opacity: 0.9;
        }

        /* --- 3D ROBOT CONTAINER --- */
        .robot-container {
          width: 70px;
          height: 90px;
          position: relative;
          filter: drop-shadow(0 5px 5px rgba(0,0,0,0.4));
        }

        .robot-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          animation: hoverFloat 3s ease-in-out infinite;
        }

        /* --- ROBOT PARTS STYLING --- */
        .bot-body-grad { fill: url(#bodyGradient); }
        .bot-dark { fill: #1f2937; }
        .bot-screen { fill: #111827; }
        .bot-eye { 
          fill: #22c55e; 
          animation: blink 4s infinite; 
          transform-origin: center;
        }
        .bot-mouth {
          fill: #4ade80;
          rx: 2;
          height: 2px;
          width: 10px;
          x: 45;
          y: 42;
          transition: all 0.1s;
        }
        .bot-arm {
          fill: url(#limbGradient);
          stroke: #9ca3af;
          stroke-width: 1;
        }
        .bot-thruster {
          fill: url(#thrusterGradient);
        }
        .bot-flame {
          fill: #60a5fa;
          opacity: 0.8;
          animation: thrusterBurn 0.1s infinite alternate;
        }

        /* --- "TALKING" STATE ANIMATIONS --- */
        .robot-container.talking .bot-mouth {
          fill: #3b82f6;
          animation: talkMouth 0.2s ease-in-out infinite;
        }
        .robot-container.talking .bot-antenna-ball {
          fill: #fbbf24;
          animation: pulseAntenna 0.5s infinite;
        }
        .robot-container.talking .bot-eye {
          fill: #60a5fa;
          animation: none;
          transform: scaleY(1.2);
        }
        .robot-container.talking .robot-svg {
          animation: talkBounce 0.5s ease-in-out infinite alternate;
        }
        .robot-container.talking .left-arm {
          animation: gestureLeft 1s ease-in-out infinite;
          transform-origin: 30px 55px;
        }
        .robot-container.talking .right-arm {
          animation: gestureRight 1s ease-in-out infinite;
          transform-origin: 70px 55px;
        }

        /* Messages Area */
        .chat-window {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: rgba(15, 23, 42, 0.6); /* Semi-transparent dark */
          display: flex;
          flex-direction: column;
          gap: 15px;
          scroll-behavior: smooth;
        }

        .chat-window::-webkit-scrollbar { width: 6px; }
        .chat-window::-webkit-scrollbar-track { background: transparent; }
        .chat-window::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }

        .message-row { display: flex; width: 100%; }
        
        .message-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          backdrop-filter: blur(5px);
        }

        .message-row.user { justify-content: flex-end; animation: slideInRight 0.4s ease-out forwards; }
        .message-row.user .message-bubble {
          background: linear-gradient(135deg, #22c55e, #15803d);
          color: white;
          border-bottom-right-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .message-row.bot { justify-content: flex-start; animation: slideInLeft 0.4s ease-out forwards; }
        .message-row.bot .message-bubble {
          background: rgba(255, 255, 255, 0.9);
          color: #1e293b;
          border-bottom-left-radius: 4px;
        }

        .typing-indicator {
          display: inline-flex; align-items: center; gap: 4px; padding: 10px 15px;
          background: rgba(255,255,255,0.9); border-radius: 18px; border-bottom-left-radius: 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05); animation: fadeIn 0.3s;
        }
        .dot {
          width: 8px; height: 8px; background: #94a3b8; border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }

        .input-area {
          padding: 15px 20px; 
          background: rgba(30, 41, 59, 0.8); /* Dark glass input area */
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex; gap: 10px; align-items: center;
        }
        .chat-input {
          flex: 1; padding: 12px 15px; border-radius: 25px; 
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 1rem; outline: none; transition: all 0.3s ease; 
          background: rgba(255,255,255,0.05);
          color: white;
        }
        .chat-input::placeholder { color: rgba(255,255,255,0.5); }
        .chat-input:focus {
          border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2); 
          background: rgba(255,255,255,0.1);
        }
        .send-btn {
          background: #22c55e; color: white; border: none; border-radius: 50%; width: 45px; height: 45px;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(34, 197, 94, 0.4);
        }
        .send-btn:hover { transform: scale(1.1); background: #16a34a; box-shadow: 0 0 15px #22c55e; }
        .send-btn:active { transform: scale(0.95); }

        /* --- KEYFRAMES --- */
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        
        /* Robot Animations */
        @keyframes hoverFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes blink { 0%, 48%, 52%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
        @keyframes thrusterBurn { from { transform: scale(0.9); opacity: 0.6; } to { transform: scale(1.1); opacity: 0.9; } }
        
        /* Talking Animations */
        @keyframes talkMouth { 0%, 100% { height: 2px; y: 42px; width: 10px; x: 45px; } 50% { height: 6px; y: 40px; width: 12px; x: 44px; } }
        @keyframes pulseAntenna { 0% { fill: #ef4444; } 100% { fill: #facc15; filter: drop-shadow(0 0 5px #facc15); } }
        @keyframes talkBounce { 0% { transform: translateY(0); } 100% { transform: translateY(-2px); } }
        @keyframes gestureLeft { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }
        @keyframes gestureRight { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(15deg); } }
      `}</style>

      {/* --- BACKGROUND ANIMATION LAYER --- */
      /* This adds the deep 3D grid and floating particles behind the chat card */}
      <div className="tech-background">
        <div className="tech-grid"></div>
        <div className="tech-glow"></div>
        <div className="tech-particle p1"></div>
        <div className="tech-particle p2"></div>
        <div className="tech-particle p3"></div>
        <div className="tech-particle p4"></div>
        <div className="tech-particle p5"></div>
      </div>

      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          
          {/* --- 3D FULL BODY ROBOT AVATAR --- */
          /* Kept this SVG as it provides great character */}
          <div className={`robot-container ${loading ? 'thinking' : ''} ${loading ? 'talking' : ''}`}>
             <svg viewBox="0 0 100 120" className="robot-svg">
               <defs>
                 <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#f3f4f6" />
                   <stop offset="100%" stopColor="#d1d5db" />
                 </linearGradient>
                 <linearGradient id="limbGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#e5e7eb" />
                   <stop offset="100%" stopColor="#9ca3af" />
                 </linearGradient>
                 <linearGradient id="thrusterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#374151" />
                   <stop offset="100%" stopColor="#111827" />
                 </linearGradient>
               </defs>

               {/* -- Legs / Thruster -- */}
               <path d="M40,85 Q50,95 60,85 L55,75 L45,75 Z" className="bot-thruster" />
               <ellipse cx="50" cy="92" rx="6" ry="2" className="bot-flame" />

               {/* -- Arms (Behind Body) -- */}
               <path d="M25,60 Q15,70 20,80" stroke="url(#limbGradient)" strokeWidth="4" fill="none" strokeLinecap="round" className="bot-arm left-arm" />
               <path d="M75,60 Q85,70 80,80" stroke="url(#limbGradient)" strokeWidth="4" fill="none" strokeLinecap="round" className="bot-arm right-arm" />

               {/* -- Torso -- */}
               <rect x="30" y="50" width="40" height="30" rx="6" className="bot-body-grad" stroke="#9ca3af" strokeWidth="0.5" />
               <rect x="38" y="58" width="24" height="14" rx="2" fill="#e5e7eb" opacity="0.5" /> {/* Chest Plate */}

               {/* -- Neck -- */}
               <rect x="42" y="45" width="16" height="8" fill="#374151" />

               {/* -- Head -- */}
               <rect x="25" y="15" width="50" height="35" rx="10" className="bot-body-grad" stroke="#9ca3af" strokeWidth="0.5" />
               
               {/* -- Face Screen -- */}
               <rect x="30" y="20" width="40" height="25" rx="4" className="bot-screen" />
               
               {/* -- Eyes -- */}
               <ellipse cx="40" cy="30" rx="5" ry="7" className="bot-eye" />
               <ellipse cx="60" cy="30" rx="5" ry="7" className="bot-eye" />
               
               {/* -- Mouth (Talking Element) -- */}
               <rect className="bot-mouth" />

               {/* -- Antenna -- */}
               <line x1="50" y1="15" x2="50" y2="5" stroke="#9ca3af" strokeWidth="2" />
               <circle cx="50" cy="5" r="3" fill="#ef4444" className="bot-antenna-ball" />
               
               {/* -- Ear Pieces -- */}
               <rect x="22" y="28" width="3" height="10" rx="1" fill="#9ca3af" />
               <rect x="75" y="28" width="3" height="10" rx="1" fill="#9ca3af" />

             </svg>
          </div>

          <div className="header-text">
            <h1>Green Sathi Chat</h1>
            <p>{loading ? "Processing Answer..." : "Your AI Farming Assistant"}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-window">
          {messages.length === 0 && (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", marginTop: "50px", animation: "fadeIn 1s" }}>
              <p style={{ fontSize: "3rem", margin: 0 }}>🌱</p>
              <p>Hi! Ask me anything about your crops.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-row ${msg.role}`}
            >
              <span className="message-bubble">
                {msg.text}
              </span>
            </div>
          ))}

          {loading && (
            <div className="message-row bot">
              <div className="typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about disease, fertilizer..."
          />
          <button className="send-btn" onClick={handleSend}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;