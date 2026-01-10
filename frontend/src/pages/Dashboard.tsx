import { useEffect, useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { Film, FileAudio } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs
} from 'firebase/firestore';


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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [mindflayer, setMindflayer] = useState<number>(0);
  const [riftStatus, setRiftStatus] = useState<'NORMAL' | 'CRITICAL'>('NORMAL');
  const [deepfakeCount, setDeepfakeCount] = useState<number>(0);
  const [activeAgents, setActiveAgents] = useState<number>(0);


  /* ---------- Deepfake Upload Handler ---------- */
  const analyzeVideo = async () => {
    if (!videoFile) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
  
      /* ---------- MINDFLAYER + RIFT ---------- */
      if (user) {
        const statsRef = doc(db, 'stats', user.uid);
        const statsSnap = await getDoc(statsRef);
  
        if (statsSnap.exists()) {
          const value = statsSnap.data().mindflayer ?? 0;
          setMindflayer(value);
          setRiftStatus(value < 50 ? 'NORMAL' : 'CRITICAL');
        } else {
          // No stats doc for user
          setMindflayer(0);
          setRiftStatus('NORMAL');
        }
      }
  
      /* ---------- DEEPFAKES COUNT ---------- */
      const countSnap = await getDocs(collection(db, 'count'));
      countSnap.forEach((doc) => {
        const data = doc.data();
        if (data.total !== undefined) {
          setDeepfakeCount(data.total);
        }
      });
  
      /* ---------- ACTIVE AGENTS ---------- */
      const usersSnap = await getDocs(collection(db, 'users'));
      setActiveAgents(usersSnap.size);
    };
  
    fetchStats();
  }, []);
  

  return (
    <div className="h-screen flex flex-col px-6 py-6 gap-4 overflow-hidden">

      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between shrink-0">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
      <StatCard
  label="MINDFLAYER ACTIVITY"
  value={`${mindflayer}%`}
  trend={mindflayer < 50 ? 'STABLE' : '↑ SPIKE'}
/>

<StatCard
  label="DEEPFAKES DETECTED"
  value={deepfakeCount}
  trend="TOTAL"
  color="text-neon"
/>

<StatCard
  label="RIFT STABILITY"
  value={riftStatus}
  trend={riftStatus === 'CRITICAL' ? 'FAILING' : 'STABLE'}
  color={riftStatus === 'CRITICAL' ? 'text-void' : 'text-neon'}
/>

<StatCard
  label="ACTIVE AGENTS"
  value={activeAgents}
  trend="ONLINE"
  color="text-white"
/>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">

        {/* ===== GLOBAL MONITOR ===== */}
        <Panel className="lg:col-span-7 relative overflow-hidden" title="GLOBAL RIFT TRACKER">
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
        <Panel className="lg:col-span-5 overflow-hidden" title="ANALYSIS OUTPUT">
          <div className="h-full overflow-y-auto font-mono text-[11px] text-gray-400 space-y-2 pr-2">
            {loading && <p className="text-neon">Analyzing video...</p>}

            {!loading && result && (
              <>
                <p>
                  VERDICT:{' '}
                  <span className={result.overall_verdict === 'Deepfake'
                    ? 'text-blood'
                    : 'text-neon'}>
                    {result.overall_verdict}
                  </span>
                </p>

                <p>
                  CONFIDENCE: {(result.overall_confidence * 100).toFixed(2)}%
                </p>

                <p className="mt-2">SUSPICIOUS SEGMENTS:</p>
                {result.suspicious_segments.length === 0 && (
                  <p className="text-gray-500">None detected</p>
                )}
                {result.suspicious_segments.map((seg: any, i: number) => (
                  <p key={i} className="text-blood">
                    {seg.start_time.toFixed(2)}s – {seg.end_time.toFixed(2)}s ({seg.confidence.toFixed(2)})
                  </p>
                ))}
              </>
            )}

            {!loading && !result && (
              <p className="text-gray-500">Awaiting video ingestion...</p>
            )}
          </div>
        </Panel>
      </div>

      {/* ================= INGESTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 shrink-0">

        {/* VIDEO */}
        <Panel title="VIDEO INGESTION">
          <div className="h-[140px] flex flex-col items-center justify-center border border-dashed border-white/20 bg-black/40 gap-2">
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
              <>
                <p className="text-xs font-mono text-neon">{videoFile.name}</p>
                <button
                  onClick={analyzeVideo}
                  disabled={loading}
                  className="px-3 py-1 text-xs font-mono border border-blood text-blood hover:bg-blood/20"
                >
                  {loading ? 'SCANNING...' : 'ANALYZE VIDEO'}
                </button>
              </>
            )}
          </div>
        </Panel>

        {/* AUDIO */}
        <Panel title="AUDIO INGESTION">
          <div className="h-[140px] flex items-center justify-center border border-dashed border-white/20 bg-black/40">
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
              <p className="text-xs font-mono text-neon">{audioFile.name}</p>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
};
