import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import GlassCard from "../components/GlassCard";

/* ============================== PALETTE ==============================
   background: #071B14   primary: #22C55E   accent: #10B981
   glass: rgba(255,255,255,0.08)
======================================================================= */

const HERO_BG_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80";
const HERO_BG_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-tractor-plowing-a-field-in-the-countryside-4425-large.mp4";

const BLOBS = [
  { top: "8%", left: "6%", size: 140 },
  { bottom: "10%", right: "8%", size: 110 },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Farmers Helped" },
  { value: 98, suffix: "%", label: "Detection Accuracy" },
  { value: 120, suffix: "+", label: "Crop Diseases Covered" },
  { value: 24, suffix: "/7", label: "AI Support" },
];

const FEATURES = [
  { title: "Instant Disease Detection", desc: "Upload a leaf photo and get an AI diagnosis with treatment guidance in seconds.", icon: "scan" },
  { title: "Conversational AI Chatbot", desc: "Ask farming questions in your own words and get clear, actionable answers.", icon: "chat" },
  { title: "Real-Time Agri News", desc: "Stay updated with market prices, policy changes, and seasonal advisories.", icon: "news" },
  { title: "Community Surveys", desc: "Share field data and insights that help improve recommendations for everyone.", icon: "survey" },
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

const NAV_LINKS = [
  { label: "Predict", path: "/predict" },
  { label: "News", path: "/news" },
  { label: "Survey", path: "/surveys" },
  { label: "Chatbot", path: "/chatbot" },
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
    chevronDown: "M6 9l6 6 6-6",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name] || paths.check} />
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
      <span className="mb-3 inline-block rounded-full bg-[#22C55E]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#22C55E]">
        {eyebrow}
      </span>
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
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

/** Premium button: gradient, glow-on-hover, lift, ripple-on-click */
function PremiumButton({ children, onClick, delay = 0, className = "", ...rest }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick?.(e);
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -3, boxShadow: "0 0 26px rgba(34,197,94,0.55)" }}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#22C55E] to-[#10B981] font-bold text-white shadow-lg shadow-emerald-950/40 ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ width: 0, height: 0, opacity: 0.45 }}
          animate={{ width: 260, height: 260, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.5)",
            pointerEvents: "none",
          }}
        />
      ))}
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] transition-colors duration-300 hover:bg-white"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-zinc-300 transition-colors duration-200 hover:fill-[#071B14]">
        <path d={path} />
      </svg>
    </motion.a>
  );
}

/* ============================== NAVBAR ============================== */

function Navbar({ navigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 flex h-[75px] items-center justify-between px-4 transition-colors duration-500 sm:px-8 ${
        scrolled ? "border-b border-white/10 bg-[#071B14]/90 backdrop-blur-md" : "bg-transparent backdrop-blur-[2px]"
      }`}
    >
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.04 }}
        className="flex items-center gap-2 text-lg font-extrabold text-white"
      >
        🌱 Green Sathi
      </motion.button>

      <div className="hidden items-center gap-8 sm:flex">
        {NAV_LINKS.map((link) => (
          <motion.button
            key={link.path}
            onClick={() => navigate(link.path)}
            whileHover={{ y: -2, color: "#22C55E" }}
            className="text-sm font-semibold text-zinc-300 transition-colors"
          >
            {link.label}
          </motion.button>
        ))}
      </div>

      <PremiumButton onClick={() => navigate("/chatbot")} className="px-4 py-2 text-xs sm:text-sm">
        Ask AI
      </PremiumButton>
    </motion.nav>
  );
}

/* ============================== HERO ============================== */

function WeatherWidgetCompact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, x: 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-4 top-[90px] z-30 w-36 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)] p-3 backdrop-blur-md sm:right-8 sm:top-[100px] sm:w-44"
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-zinc-300">Weather</span>
        <Icon name="sun" className="h-4 w-4 text-amber-300" />
      </div>
      <div className="flex items-end gap-1">
        <span className="text-2xl font-extrabold text-white">29°</span>
        <span className="mb-0.5 text-[0.65rem] text-zinc-300">Cloudy</span>
      </div>
    </motion.div>
  );
}

function Hero({ navigate }) {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section
      id="hero"
      className="relative flex h-[70vh] min-h-[560px] w-full items-center justify-center overflow-hidden px-4 pt-[75px] sm:px-6 lg:px-8"
    >
      {/* Cinematic background: video preferred, image fallback, subtle zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 14, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}
        />
        {videoOk && (
          <motion.video
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.08 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: 14, ease: "easeOut" } }}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_BG_IMAGE}
            onError={() => setVideoOk(false)}
          >
            <source src={HERO_BG_VIDEO} type="video/mp4" />
          </motion.video>
        )}
        {/* Dark overlay ~45% for readability */}
        <div className="absolute inset-0 bg-[#071B14]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071B14]/70 via-[#071B14]/40 to-[#071B14]/85" />
      </div>

      {/* Small decorative blobs, behind content only */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-2xl"
            style={{ ...b, width: b.size, height: b.size }}
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.1, 1] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <WeatherWidgetCompact />

      {/* Glassmorphism card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-[95%] max-w-[520px]"
      >
        <GlassCard
          style={{
            padding: "0",
            borderRadius: "28px",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: "rgba(20,20,20,0.45)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="px-6 py-8 text-center sm:px-9 sm:py-10">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-2 font-extrabold tracking-tight text-white"
              style={{
                fontFamily: "'Inter','Poppins',sans-serif",
                fontSize: "clamp(1.9rem, 4.2vw, 2.75rem)",
                textShadow: "0 8px 24px rgba(0,0,0,0.5)",
              }}
            >
              <motion.span
                initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
                className="mr-2 inline-block"
              >
                🌱
              </motion.span>
              Green Sathi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mb-7 text-sm font-medium text-zinc-300 sm:text-base"
              style={{ fontFamily: "'Inter','Poppins',sans-serif" }}
            >
              Smart farming assistance powered by AI
            </motion.p>

            <div className="grid grid-cols-2 gap-3">
              <PremiumButton delay={0.36} onClick={() => navigate("/predict")} className="px-3 py-3.5 text-xs uppercase tracking-wide sm:text-sm">
                🔍 Predict Disease
              </PremiumButton>
              <PremiumButton delay={0.42} onClick={() => navigate("/news")} className="px-3 py-3.5 text-xs uppercase tracking-wide sm:text-sm">
                📰 News Updates
              </PremiumButton>
              <PremiumButton delay={0.48} onClick={() => navigate("/surveys")} className="px-3 py-3.5 text-xs uppercase tracking-wide sm:text-sm">
                📋 Take Survey
              </PremiumButton>
              <PremiumButton delay={0.54} onClick={() => navigate("/chatbot")} className="px-3 py-3.5 text-xs uppercase tracking-wide sm:text-sm">
                🤖 AI Chatbot
              </PremiumButton>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.6 }}
              className="mt-7 border-t border-white/10 pt-5"
            >
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Connect With Us</p>
              <div className="flex justify-center gap-3">
                <SocialIcon href="https://www.linkedin.com/in/rupam-roy-choudhary-5287a23a1/" label="LinkedIn" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                <SocialIcon href="https://github.com/rupamroychoudhury2008-star" label="GitHub" path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                <SocialIcon href="https://x.com/ExplainedR" label="Twitter" path="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                <SocialIcon href="mailto:rupamroychoudhury2008@gmail.com" label="Email" path="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm5.377 2.738l-5.364-6.337 5.364-4.545 5.364 4.545-5.364 6.337zm5.378-2.738l4.622-5.462v11.175l-4.622-5.713zm-11.002 6.071l4.472-5.526 1.153 1.363 1.152-1.363 4.473 5.526h-11.25z" />
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-zinc-400"
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          className="flex h-7 w-4 items-start justify-center rounded-full border border-zinc-500/60 p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="h-1 w-1 rounded-full bg-[#22C55E]"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================== HOME ============================== */

export default function Home() {
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setTestimonial((t) => (t + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-[#071B14] font-sans text-white" style={{ fontFamily: "'Inter','Poppins',sans-serif" }}>
      <Navbar navigate={navigate} />
      <Hero navigate={navigate} />

      {/* ============================== STATS ============================== */}
      <section className="relative border-y border-white/5 bg-[#0A2118] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="mb-1 text-3xl font-extrabold text-[#22C55E] sm:text-4xl">
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
                  className="group h-full rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)] p-6 shadow-lg shadow-black/20 transition-colors hover:border-[#22C55E]/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E]/15 text-[#22C55E] transition-transform group-hover:scale-110">
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
      <section className="bg-[#0A2118] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Why Green Sathi" title="Designed Around Real Farms" />
          <div className="grid gap-6 sm:grid-cols-2">
            {WHY_CHOOSE.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)] p-6">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15 text-[#22C55E]">
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

      {/* ============================== NEWS (weather moved to hero) ============================== */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">Agriculture News</h2>
              <button
                onClick={() => navigate("/news")}
                className="flex items-center gap-1 text-sm font-semibold text-[#22C55E] hover:text-[#10B981]"
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
                  className="flex w-full items-start justify-between gap-4 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)] p-5 text-left transition-colors hover:border-[#22C55E]/40"
                >
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-[#22C55E]/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[#22C55E]">
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
      </section>

      {/* ============================== GOVERNMENT SCHEMES ============================== */}
      <section className="bg-[#0A2118] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Support" title="Government Schemes" subtitle="Programs that farmers can benefit from." />
          <div className="grid gap-6 sm:grid-cols-3">
            {SCHEMES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)] p-6">
                  <h3 className="mb-2 font-bold text-[#22C55E]">{s.name}</h3>
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
                className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)] p-8"
              >
                <Icon name="quote" className="mx-auto mb-4 h-8 w-8 text-[#22C55E]/60" />
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
                  i === testimonial ? "w-6 bg-[#22C55E]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="bg-[#0A2118] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-white">{f.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[#22C55E]">
                      <Icon name="chevronDown" className="h-4 w-4" />
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
                <li><button onClick={() => navigate("/predict")} className="hover:text-[#22C55E]">Predict Disease</button></li>
                <li><button onClick={() => navigate("/news")} className="hover:text-[#22C55E]">News Updates</button></li>
                <li><button onClick={() => navigate("/surveys")} className="hover:text-[#22C55E]">Take Survey</button></li>
                <li><button onClick={() => navigate("/chatbot")} className="hover:text-[#22C55E]">AI Chatbot</button></li>
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