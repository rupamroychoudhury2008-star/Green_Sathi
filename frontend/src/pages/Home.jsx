import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import GlassCard from "../components/GlassCard";

/* ============================== STATIC DATA ============================== */

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1920&q=80",
];

const LEAVES = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 16 + Math.random() * 20,
  duration: 12 + Math.random() * 10,
  delay: Math.random() * 8,
  drift: Math.random() * 60 - 30,
  rotate: Math.random() * 360,
}));

const PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 5,
}));

const STATS = [
  { value: 50000, suffix: "+", label: "Farmers Helped" },
  { value: 98, suffix: "%", label: "Detection Accuracy" },
  { value: 120, suffix: "+", label: "Crop Diseases Covered" },
  { value: 24, suffix: "/7", label: "AI Support" },
];

const FEATURES = [
  {
    title: "Instant Disease Detection",
    desc: "Upload a leaf photo and get an AI diagnosis with treatment guidance in seconds.",
    icon: "scan",
  },
  {
    title: "Conversational AI Chatbot",
    desc: "Ask farming questions in your own words and get clear, actionable answers.",
    icon: "chat",
  },
  {
    title: "Real-Time Agri News",
    desc: "Stay updated with market prices, policy changes, and seasonal advisories.",
    icon: "news",
  },
  {
    title: "Community Surveys",
    desc: "Share field data and insights that help improve recommendations for everyone.",
    icon: "survey",
  },
];

const WHY_CHOOSE = [
  { title: "Built for Indian Farms", desc: "Trained on regional crops, soil types, and local growing conditions." },
  { title: "Works Offline-First", desc: "Core guidance stays accessible even on patchy rural connectivity." },
  { title: "Free & Farmer-First", desc: "No hidden costs — designed to serve the community, not sell ads." },
  { title: "Backed by Experts", desc: "Recommendations reviewed against agronomy best practices." },
];

const NEWS_PREVIEW = [
  { title: "Monsoon outlook favors kharif sowing this season", date: "Jul 12, 2026", tag: "Weather" },
  { title: "Govt raises MSP for select rabi crops", date: "Jul 09, 2026", tag: "Policy" },
  { title: "New pest advisory issued for cotton belt regions", date: "Jul 05, 2026", tag: "Advisory" },
];

const SCHEMES = [
  { name: "PM-KISAN", desc: "Direct income support of ₹6,000/year for eligible farmer families." },
  { name: "Soil Health Card Scheme", desc: "Free soil testing and nutrient recommendations every 2 years." },
  { name: "PMFBY (Crop Insurance)", desc: "Low-premium insurance cover against crop loss due to natural calamities." },
];

const TESTIMONIALS = [
  { name: "Ramesh Patel", role: "Wheat Farmer, Gujarat", quote: "Green Sathi spotted a blight on my wheat before it spread across the field. Saved my harvest." },
  { name: "Lakshmi Devi", role: "Rice Farmer, Andhra Pradesh", quote: "The chatbot answers my questions faster than waiting for the local agri office." },
  { name: "Harpreet Singh", role: "Cotton Farmer, Punjab", quote: "Simple, fast, and actually built for how we farm here. Highly recommend." },
];

const FAQS = [
  { q: "Is Green Sathi free to use?", a: "Yes, all core features including disease prediction and the AI chatbot are free for farmers." },
  { q: "Do I need internet access to use the app?", a: "You need a connection for AI predictions and live updates, but the interface is optimized for low-bandwidth areas." },
  { q: "How accurate is the disease detection?", a: "Our model is validated against a large regional dataset and performs with high reliability, though we always recommend confirming critical decisions with a local expert." },
  { q: "Can I use Green Sathi for any crop?", a: "We currently cover the most common crops grown across Indian farms, with more being added regularly." },
];

/* ============================== ICONS ============================== */

function Icon({ name, className = "h-6 w-6" }) {
  const paths = {
    scan: "M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3M4 12h16M9 9h6v6H9z",
    chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    news: "M4 4h16v16H4zM4 9h16M9 4v16",
    survey: "M9 12l2 2 4-4M4 4h16v16H4z",
    check: "M20 6L9 17l-5-5",
    sun: "M12 3v2m0 14v2m9-9h-2M5 12H3m14.5-6.5l-1.4 1.4M6.9 17.1l-1.4 1.4m0-13l1.4 1.4M17.1 17.1l1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
    cloud: "M17.5 19a4.5 4.5 0 000-9 6 6 0 00-11.4 1.5A4 4 0 007 19h10.5z",
    arrow: "M5 12h14M13 6l6 6-6 6",
    quote: "M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4M19 7h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name] || paths.check} />
    </svg>
  );
}

function Leaf({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d="M12 2C7 4 3 8 3 13c0 5 4 8 9 9 5-1 9-4 9-9 0-5-4-9-9-11z" fill="#4ade80" fillOpacity="0.55" />
      <path d="M12 4v16" stroke="#166534" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}

/* ============================== SHARED UI HELPERS ============================== */

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-3 inline-block rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        {eyebrow}
      </span>
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="text-base text-zinc-400 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ============================== HOME ============================== */

export default function Home() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDER_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTestimonial((t) => (t + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-[#06140c] font-sans text-white">
      {/* ============================== HERO ============================== */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        {/* Ken Burns cinematic slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={slide}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.4 }, scale: { duration: 6.4, ease: "linear" } }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${SLIDER_IMAGES[slide]})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#06140c]/90 via-[#06140c]/80 to-[#06140c]/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-emerald-950/40" />
        </div>

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

        {/* Floating leaves */}
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
              transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: "linear" }}
            >
              <Leaf size={leaf.size} />
            </motion.div>
          ))}
        </div>

        {/* Ambient particles */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-emerald-300/70 blur-[0.5px]"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
              animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.6, 1.3, 0.6] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 w-full max-w-2xl"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <GlassCard
              style={{
                padding: "0",
                borderRadius: "28px",
                background: "rgba(20, 30, 24, 0.55)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
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
                    <path d="M50,70 Q100,20 150,70 Q160,90 100,85 Q40,90 50,70" fill="url(#turbanGradient)" filter="drop-shadow(0 5px 5px rgba(0,0,0,0.5))" />
                    <path d="M100,35 Q120,50 110,75" stroke="#c2410c" strokeWidth="2" fill="none" opacity="0.5" />
                    <circle cx="100" cy="100" r="35" fill="url(#skinGradient)" />
                    <motion.circle cx="88" cy="95" r="4" fill="#1f2937" animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }} />
                    <motion.circle cx="112" cy="95" r="4" fill="#1f2937" animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }} />
                    <path d="M85,110 Q100,105 115,110 Q120,100 115,110" stroke="#1f2937" strokeWidth="3" fill="none" />
                    <path d="M60,135 Q100,150 140,135 L140,180 Q100,190 60,180 Z" fill="url(#kurtaGradient)" />
                    <path d="M100,135 L100,180" stroke="#d1d5db" strokeWidth="1" />
                    <path d="M70,135 Q100,160 130,135" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7 }}
                  className="mb-2 font-extrabold uppercase tracking-tight text-white"
                  style={{ fontSize: "clamp(2.1rem, 5vw, 3.5rem)", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
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

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="mb-10 text-base font-medium text-zinc-300 sm:text-lg"
                >
                  Smart farming assistance powered by AI
                </motion.p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <ActionButton delay={0.45} onClick={() => navigate("/predict")}>🔍 Predict Disease</ActionButton>
                  <ActionButton delay={0.55} onClick={() => navigate("/news")}>📰 News Updates</ActionButton>
                  <ActionButton delay={0.65} onClick={() => navigate("/surveys")}>📋 Take Survey</ActionButton>
                  <ActionButton delay={0.75} onClick={() => navigate("/chatbot")}>🤖 AI Chatbot</ActionButton>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.7 }}
                  className="mt-10 border-t border-white/10 pt-6"
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Connect With Us</p>
                  <div className="flex justify-center gap-4">
                    <SocialIcon href="https://www.linkedin.com/in/rupam-roy-choudhary-5287a23a1/" label="LinkedIn" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    <SocialIcon href="https://github.com/rupamroychoudhury2008-star" label="GitHub" path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    <SocialIcon href="https://x.com/ExplainedR" label="Twitter" path="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    <SocialIcon href="mailto:rupamroychoudhury2008@gmail.com" label="Email" path="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm5.377 2.738l-5.364-6.337 5.364-4.545 5.364 4.545-5.364 6.337zm5.378-2.738l4.622-5.462v11.175l-4.622-5.713zm-11.002 6.071l4.472-5.526 1.153 1.363 1.152-1.363 4.473 5.526h-11.25z" />
                  </div>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-400"
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em]">Scroll</span>
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
      </section>

      {/* ============================== STATS ============================== */}
      <section className="relative border-y border-white/5 bg-[#081a10] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="mb-1 text-3xl font-extrabold text-emerald-400 sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs font-medium uppercase tracking-wide text-zinc-400 sm:text-sm">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================== AI FEATURES ============================== */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Capabilities" title="AI Built For The Field" subtitle="Everything you need to protect your crop, right in your pocket." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/20 transition-colors hover:border-emerald-400/40 hover:bg-white/[0.06]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 transition-transform group-hover:scale-110">
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== WHY CHOOSE ============================== */}
      <section className="bg-[#081a10] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Why Green Sathi" title="Designed Around Real Farms" />
          <div className="grid gap-6 sm:grid-cols-2">
            {WHY_CHOOSE.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Icon name="check" className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-white">{w.title}</h3>
                    <p className="text-sm text-zinc-400">{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== NEWS + WEATHER ============================== */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          {/* News preview */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-white">Agriculture News</h2>
                <button
                  onClick={() => navigate("/news")}
                  className="flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  View All <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
            <div className="space-y-4">
              {NEWS_PREVIEW.map((n, i) => (
                <Reveal key={n.title} delay={i * 0.08}>
                  <button
                    onClick={() => navigate("/news")}
                    className="flex w-full items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-colors hover:border-emerald-400/40 hover:bg-white/[0.06]"
                  >
                    <div>
                      <span className="mb-2 inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-400">
                        {n.tag}
                      </span>
                      <p className="font-medium text-white">{n.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">{n.date}</p>
                    </div>
                    <Icon name="arrow" className="mt-1 h-4 w-4 flex-shrink-0 text-zinc-500" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Weather preview */}
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600/20 to-sky-600/10 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Weather Preview</h3>
                  <Icon name="sun" className="h-6 w-6 text-amber-300" />
                </div>
                <div className="mb-6 flex items-end gap-2">
                  <span className="text-5xl font-extrabold text-white">29°</span>
                  <span className="mb-1 text-sm text-zinc-300">Partly Cloudy</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
                    <div key={d} className="rounded-xl bg-white/5 py-3">
                      <p className="mb-1 text-[0.65rem] font-medium text-zinc-400">{d}</p>
                      <Icon name={i % 2 === 0 ? "sun" : "cloud"} className="mx-auto mb-1 h-5 w-5 text-emerald-300" />
                      <p className="text-xs font-semibold text-white">{27 + i}°</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[0.7rem] text-zinc-500">Illustrative preview — live conditions available in-app.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== GOVERNMENT SCHEMES ============================== */}
      <section className="bg-[#081a10] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Support" title="Government Schemes" subtitle="Programs that farmers can benefit from." />
          <div className="grid gap-6 sm:grid-cols-3">
            {SCHEMES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="mb-2 font-bold text-emerald-400">{s.name}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== TESTIMONIALS ============================== */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow="Voices" title="What Farmers Say" />
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
              >
                <Icon name="quote" className="mx-auto mb-4 h-8 w-8 text-emerald-400/60" />
                <p className="mb-6 text-lg text-zinc-200">"{TESTIMONIALS[testimonial].quote}"</p>
                <p className="font-bold text-white">{TESTIMONIALS[testimonial].name}</p>
                <p className="text-sm text-zinc-500">{TESTIMONIALS[testimonial].role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setTestimonial(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === testimonial ? "w-6 bg-emerald-400" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="bg-[#081a10] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-white">{f.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-emerald-400 text-xl leading-none">
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FOOTER ============================== */}
      <footer className="border-t border-white/10 bg-[#040d08] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-extrabold text-white">🌱 Green Sathi</h3>
              <p className="text-sm text-zinc-400">Smart farming assistance powered by AI, built for Indian farmers.</p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Explore</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><button onClick={() => navigate("/predict")} className="hover:text-emerald-400">Predict Disease</button></li>
                <li><button onClick={() => navigate("/news")} className="hover:text-emerald-400">News Updates</button></li>
                <li><button onClick={() => navigate("/surveys")} className="hover:text-emerald-400">Take Survey</button></li>
                <li><button onClick={() => navigate("/chatbot")} className="hover:text-emerald-400">AI Chatbot</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Connect</h4>
              <div className="flex gap-3">
                <SocialIcon href="https://www.linkedin.com/in/rupam-roy-choudhary-5287a23a1/" label="LinkedIn" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                <SocialIcon href="https://github.com/rupamroychoudhury2008-star" label="GitHub" path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                <SocialIcon href="https://x.com/ExplainedR" label="Twitter" path="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                <SocialIcon href="mailto:rupamroychoudhury2008@gmail.com" label="Email" path="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm5.377 2.738l-5.364-6.337 5.364-4.545 5.364 4.545-5.364 6.337zm5.378-2.738l4.622-5.462v11.175l-4.622-5.713zm-11.002 6.071l4.472-5.526 1.153 1.363 1.152-1.363 4.473 5.526h-11.25z" />
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Contact</h4>
              <p className="text-sm text-zinc-400">rupamroychoudhury2008@gmail.com</p>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Green Sathi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================== SHARED COMPONENTS ============================== */

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