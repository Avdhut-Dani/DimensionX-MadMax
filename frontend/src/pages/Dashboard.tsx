import { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import {
  Film,
  FileAudio
} from 'lucide-react';
import { motion } from 'framer-motion';
import MainPageImage from '../../assets/mainpage.png';

/* ================= STAT CARD ================= */
const StatCard = ({ label, value, trend, color = "text-blood" }: any) => (
  <div className="p-3 bg-black/40 border border-white/10">
    <p className="text-[10px] font-mono text-gray-500 tracking-widest">
      {label}
    </p>
    <h4 className={`text-lg font-bold ${color}`}>
      {value}
    </h4>
    <span className="text-[10px] font-mono text-gray-400">
      {trend}
    </span>
  </div>
);

/* ================= DASHBOARD ================= */
export const Dashboard = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <div className="h-screen flex flex-col px-6 pt-20 pb-0 space-y-4">
      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-white">
            COMMAND CENTER
          </h2>
          <p className="text-gray-400 font-mono text-xs">
            MONITORING DIMENSIONAL RIFTS
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blood/10 border border-blood/30 animate-pulse">
          <div className="w-2 h-2 bg-blood rounded-full" />
          <span className="text-xs font-mono text-blood tracking-widest">
            THREAT: CRITICAL
          </span>
        </div>
      </header>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="MINDFLAYER ACTIVITY" value="98.4%" trend="↑ SPIKE" />
        <StatCard label="DEEPFAKES DETECTED" value="1,240" trend="+45 TODAY" color="text-neon" />
        <StatCard label="RIFT STABILITY" value="CRITICAL" trend="FAILING" color="text-void" />
        <StatCard label="ACTIVE AGENTS" value="42" trend="ONLINE" color="text-white" />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ===== GLOBAL MONITOR ===== */}
        <Panel className="lg:col-span-7 h-[240px] relative overflow-hidden" title="GLOBAL RIFT TRACKER">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.07),transparent_70%)]" />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 border border-blood rounded-full"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity }}
            >
              <div className="w-1 h-1 bg-blood rounded-full" />
            </motion.div>
          ))}
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-blood">
            SECTOR: HAWKINS • COORDS LOCKED
          </div>
        </Panel>

        {/* ===== SYSTEM LOGS ===== */}
        <Panel className="lg:col-span-5 h-[240px] overflow-hidden" title="SYSTEM LOGS">
          <div className="h-full overflow-y-auto space-y-1 font-mono text-[10px] text-gray-400 pr-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-b border-white/5 pb-1">
                <span className="text-neon opacity-60">
                  [{new Date().toLocaleTimeString()}]
                </span>{' '}
                {i % 3 === 0
                  ? <span className="text-blood">ANOMALY DETECTED</span>
                  : i % 3 === 1
                  ? 'Scanning sector 7G...'
                  : 'Data packet intercepted.'}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ================= INGESTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* VIDEO */}
        <Panel className="h-[160px]" title="VIDEO INGESTION">
          <div className="h-full flex items-center justify-center border border-dashed border-white/20 bg-black/40">
            {!videoFile ? (
              <label className="cursor-pointer text-center">
                <Film className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                <p className="text-xs font-mono text-gray-500">
                  DROP / SELECT VIDEO
                </p>
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={(e) =>
                    e.target.files && setVideoFile(e.target.files[0])
                  }
                />
              </label>
            ) : (
              <p className="text-xs font-mono text-neon">
                {videoFile.name}
              </p>
            )}
          </div>
        </Panel>

        {/* AUDIO */}
        <Panel className="h-[160px]" title="AUDIO INGESTION">
          <div className="h-full flex items-center justify-center border border-dashed border-white/20 bg-black/40">
            {!audioFile ? (
              <label className="cursor-pointer text-center">
                <FileAudio className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                <p className="text-xs font-mono text-gray-500">
                  DROP / SELECT AUDIO
                </p>
                <input
                  type="file"
                  accept="audio/*"
                  hidden
                  onChange={(e) =>
                    e.target.files && setAudioFile(e.target.files[0])
                  }
                />
              </label>
            ) : (
              <p className="text-xs font-mono text-neon">
                {audioFile.name}
              </p>
            )}
          </div>
        </Panel>
      </div>

      {/* ================= IMAGE / VISUAL FEED ================= */}
      <div className="relative flex-1 overflow-hidden mt-4">
        <img
          src={MainPageImage}
          alt="Upside Down Visual Feed"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Label */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <p className="text-xs font-mono text-gray-400 tracking-widest">
            UPSIDE DOWN VISUAL FEED — LIVE
          </p>
        </div>
      </div>
    </div>
  );
};
