import { motion } from "framer-motion";
import {
  ScanFace,
  FileSearch,
  ArrowRight,
  EyeOff,
  Siren
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { X } from "lucide-react";


/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: "easeOut",
    },
  }),
};

export const HomePage = () => {

  const [showAgenda, setShowAgenda] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* ================= BACKGROUND IMAGE ================= */}
      <div 
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('../public/home.png')" }}
      />

      {/* ================= BACKGROUND OVERLAYS ================= */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blood/10 blur-3xl rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-neon/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1 border border-blood/40 bg-blood/10 text-blood text-[11px] font-mono tracking-widest mb-4"
            >
              <Siren className="w-3 h-3" />
              REALITY INTEGRITY WARNING
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl lg:text-5xl font-bold leading-tight"
            >
              The Age of AI Has
              <span className="block text-blood">
                Broken Trust in Reality
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-6 text-gray-400 text-sm max-w-xl font-mono"
            >
              Deepfakes, synthetic voices, and AI-generated misinformation now
              spread faster than truth. This platform exists to detect,
              analyze, and expose what is real — before damage is done.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-8 flex gap-4"
            >
              <button
                onClick={() => navigate("/home/deepfake")}
                className="flex items-center gap-2 px-6 py-3 bg-blood text-black font-mono text-xs tracking-widest hover:bg-red-500 transition"
              >
                ENTER COMMAND CENTER
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
  onClick={() => setShowAgenda(true)}
  className="px-6 py-3 border border-white/20 text-xs font-mono text-gray-300 hover:border-white/40"
>
  LEARN WHY THIS MATTERS
</button>

            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="relative border border-white/10 bg-black/40 backdrop-blur-sm p-6"
          >
            <p className="text-[10px] font-mono text-gray-500 tracking-widest mb-4">
              GLOBAL THREAT SNAPSHOT
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["DAILY DEEPFAKES", "↑ 900%", "text-blood"],
                ["MISINFO CAMPAIGNS", "ACTIVE", "text-neon"],
                ["VOICE CLONES", "UNTRACEABLE", "text-purple-400"],
                ["PUBLIC TRUST", "DECLINING", "text-gray-400"],
              ].map(([label, value, color], i) => (
                <div
                  key={i}
                  className="border border-white/10 p-3 bg-black/30 backdrop-blur-sm"
                >
                  <p className="text-[10px] font-mono text-gray-500">
                    {label}
                  </p>
                  <p className={`text-lg font-bold ${color}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CORE CAPABILITIES ================= */}
      <section className="relative z-10 py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            Two Fronts. One Mission.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-2 text-sm text-gray-400 font-mono max-w-xl"
          >
            Reality must be defended at both the media level and the factual level.
          </motion.p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">

            {/* DEEPFAKE */}
            <motion.div
  onClick={() => navigate("/home/deepfake")}
  variants={fadeUp}
  custom={2}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="cursor-pointer border border-white/10 bg-black/30 backdrop-blur-sm p-6 hover:border-blood/40 transition"
>

              <ScanFace className="w-8 h-8 text-blood mb-4" />
              <h3 className="text-lg font-semibold">
                Deepfake Detection
              </h3>
              <p className="mt-3 text-sm text-gray-400 font-mono">
                Analyze video, audio, and visual media for synthetic artifacts,
                facial inconsistencies, voice cloning, and manipulation traces
                invisible to the human eye.
              </p>
              <p className="mt-3 text-xs text-gray-500 font-mono">
                Used against fake scandals, impersonation, fraud, and political manipulation.
              </p>
            </motion.div>

            {/* MISINFO */}
            <motion.div
  onClick={() => navigate("/home/misinfo")}
  variants={fadeUp}
  custom={3}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="cursor-pointer border border-white/10 bg-black/30 backdrop-blur-sm p-6 hover:border-neon/40 transition"
>

              <FileSearch className="w-8 h-8 text-neon mb-4" />
              <h3 className="text-lg font-semibold">
                Misinformation & Fact Analysis
              </h3>
              <p className="mt-3 text-sm text-gray-400 font-mono">
                Break down claims, detect narrative manipulation, verify sources,
                and compare content against known factual databases and patterns
                of coordinated misinformation.
              </p>
              <p className="mt-3 text-xs text-gray-500 font-mono">
                Designed for journalists, researchers, investigators, and citizens.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHY THIS MATTERS ================= */}
      <section className="relative z-10 py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <EyeOff className="w-10 h-10 text-blood mx-auto mb-6" />
          <h2 className="text-2xl font-bold">
            When You Can't Trust What You See or Hear
          </h2>
          <p className="mt-6 text-sm text-gray-400 font-mono leading-relaxed">
            AI has removed the cost of lying at scale. Anyone can now fabricate
            evidence, speeches, confessions, or events. Without verification
            systems, truth collapses — and with it, democracy, justice, and trust.
          </p>
          <p className="mt-4 text-sm text-gray-500 font-mono">
            This platform exists to restore friction, verification, and accountability.
          </p>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 bg-black/40 backdrop-blur-sm p-8">
          <div>
            <p className="text-[11px] font-mono text-gray-500 tracking-widest">
              SYSTEM READY
            </p>
            <h3 className="text-xl font-semibold mt-2">
              Enter the Command Center
            </h3>
            <p className="text-sm text-gray-400 font-mono mt-2">
              Analyze media. Verify claims. Defend reality.
            </p>
          </div>

          <button
            onClick={() => navigate("/home/deepfake")}
            className="flex items-center gap-2 px-6 py-3 bg-blood text-black font-mono text-xs tracking-widest hover:bg-red-500"
          >
            DEPLOY SYSTEM
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-6 text-center text-[10px] font-mono text-gray-500">
        REALITY DEFENSE SYSTEM © {new Date().getFullYear()}
      </footer>

      {showAgenda && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative max-w-lg w-full mx-4 border border-white/10 bg-black/90 p-6"
    >
      <button
        onClick={() => setShowAgenda(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>

      <p className="text-[10px] font-mono text-gray-500 tracking-widest mb-2">
        PLATFORM AGENDA
      </p>

      <h3 className="text-lg font-semibold mb-4">
        Why This System Exists
      </h3>

      <p className="text-sm text-gray-400 font-mono leading-relaxed">
        Artificial intelligence has eliminated the cost of deception.
        Fake videos, cloned voices, and manufactured evidence can now
        destabilize reputations, elections, and justice systems in minutes.
      </p>

      <p className="mt-4 text-sm text-gray-400 font-mono leading-relaxed">
        This platform exists to analyze, verify, and expose manipulated media
        and misinformation before it causes irreversible harm.
      </p>

      <p className="mt-4 text-xs text-gray-500 font-mono">
        Detect • Verify • Defend Reality
      </p>
    </motion.div>
  </div>
)}

    </div>
  );
};