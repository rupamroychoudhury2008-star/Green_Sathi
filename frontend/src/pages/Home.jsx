import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";

// Farming-themed background images for the auto slider
const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1920&q=80",
];

// Floating leaf particles config (randomized once per mount)
const LEAVES = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 16 + Math.random() * 20,
  duration: 12 + Math.random() * 10,
  delay: Math.random() * 8,
  drift: Math.random() * 60 - 30,
  rotate: Math.random() * 360,
}));

// Ambient particle dots
const PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 5,
}));

function Leaf({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path
        d="M12 2C7 4 3 8 3 13c0 5 4 8 9 9 5-1 9-4 9-9 0-5-4-9-9-11z"
        fill="#4ade80"
        fillOpacity="0.55"
      />
      <path
        d="M12 4v16"
        stroke="#166534"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#06140c] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      {/* ---------- AUTO IMAGE SLIDER (animated farming background) ---------- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDER_IMAGES[slide]})` }}
          />
        </AnimatePresence>

        {/* Gradient overlay for readability + mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06140c]/90 via-[#06140c]/80 to-[#06140c]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-emerald-950/40" />
      </div>

      {/* ---------- SLIDER DOTS ---------- */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-10">
        {SLIDER_IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === slide ? "w-6 bg-emerald-400" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* ---------- FLOATING LEAVES ---------- */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {LEAVES.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute"
            style={{ left: `${leaf.left}%`, bottom: "-10%" }}
            initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: ["0%", "-120vh"],
              x: [0, leaf.drift, -leaf.drift, 0],
              opacity: [0, 0.9, 0.9, 0],
              rotate: [0, leaf.rotate, leaf.rotate * 1.5],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Leaf size={leaf.size} />
          </motion.div>
        ))}
      </div>

      {/* ---------- AMBIENT PARTICLES ---------- */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-emerald-300/70 blur-[0.5px]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ---------- MAIN GLASSMORPHISM CARD ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-2xl"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard
            style={{
              padding: "0",
              borderRadius: "28px",
              background: "rgba(20, 30, 24, 0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
              {/* AVATAR */}
              <motion.div
                className="mx-auto mb-5 h-28 w-28 sm:h-32 sm:w-32"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.55))" }}
              >
                <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
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
                  <circle cx="100" cy="100" r="60" fill="#fef08a" opacity="0.1" />
                  <path
                    d="M50,70 Q100,20 150,70 Q160,90 100,85 Q40,90 50,70"
                    fill="url(#turbanGradient)"
                    filter="drop-shadow(0 5px 5px rgba(0,0,0,0.5))"
                  />
                  <path d="M100,35 Q120,50 110,75" stroke="#c2410c" strokeWidth="2" fill="none" opacity="0.5" />
                  <circle cx="100" cy="100" r="35" fill="url(#skinGradient)" />
                  <motion.circle
                    cx="88"
                    cy="95"
                    r="4"
                    fill="#1f2937"
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }}
                  />
                  <motion.circle
                    cx="112"
                    cy="95"
                    r="4"
                    fill="#1f2937"
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }}
                  />
                  <path d="M85,110 Q100,105 115,110 Q120,100 115,110" stroke="#1f2937" strokeWidth="3" fill="none" />
                  <path d="M60,135 Q100,150 140,135 L140,180 Q100,190 60,180 Z" fill="url(#kurtaGradient)" />
                  <path d="M100,135 L100,180" stroke="#d1d5db" strokeWidth="1" />
                  <path d="M70,135 Q100,160 130,135" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* ANIMATED TITLE */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="mb-2 font-extrabold uppercase tracking-tight text-white"
                style={{
                  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                  fontSize: "clamp(2.1rem, 5vw, 3.5rem)",
                  textShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <motion.span
                  initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "backOut" }}
                  className="mr-2 inline-block"
                >
                  🌱
                </motion.span>
                Green Sathi
              </motion.h1>

              {/* ANIMATED SUBTITLE */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mb-10 text-base font-medium text-zinc-300 sm:text-lg"
              >
                Smart farming assistance powered by AI
              </motion.p>

              {/* CTA BUTTONS */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ActionButton delay={0.45} onClick={() => navigate("/predict")}>
                  🔍 Predict Disease
                </ActionButton>
                <ActionButton delay={0.55} onClick={() => navigate("/news")}>
                  📰 News Updates
                </ActionButton>
                <ActionButton delay={0.65} onClick={() => navigate("/surveys")}>
                  📋 Take Survey
                </ActionButton>
                <ActionButton delay={0.75} onClick={() => navigate("/chatbot")}>
                  🤖 AI Chatbot
                </ActionButton>
              </div>

              {/* SOCIAL FOOTER */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.7 }}
                className="mt-10 border-t border-white/10 pt-6"
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Connect With Us
                </p>
                <div className="flex justify-center gap-4">
                  <SocialIcon
                    href="https://www.linkedin.com/in/rupam-roy-choudhary-5287a23a1/"
                    label="LinkedIn"
                    path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                  <SocialIcon
                    href="https://github.com/rupamroychoudhury2008-star"
                    label="GitHub"
                    path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                  <SocialIcon
                    href="https://x.com/ExplainedR"
                    label="Twitter"
                    path="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                  <SocialIcon
                    href="mailto:rupamroychoudhury2008@gmail.com"
                    label="Email"
                    path="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm5.377 2.738l-5.364-6.337 5.364-4.545 5.364 4.545-5.364 6.337zm5.378-2.738l4.622-5.462v11.175l-4.622-5.713zm-11.002 6.071l4.472-5.526 1.153 1.363 1.152-1.363 4.473 5.526h-11.25z"
                  />
                </div>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* ---------- SCROLL INDICATOR ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-400"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.div
          className="flex h-9 w-5 items-start justify-center rounded-full border border-zinc-500/60 p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ActionButton({ children, onClick, delay = 0 }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 px-4 py-4 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-950/40 transition-shadow hover:shadow-emerald-500/30 sm:text-sm"
    >
      {children}
    </motion.button>
  );
}

function SocialIcon({ href, label, path }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -4, scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 transition-colors duration-300 hover:bg-white"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-zinc-300 transition-colors duration-200 hover:fill-[#06140c]">
        <path d={path} />
      </svg>
    </motion.a>
  );
}