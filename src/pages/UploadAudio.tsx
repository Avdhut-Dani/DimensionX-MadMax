import { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { GlitchButton } from '../components/ui/GlitchButton';
import { Mic, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export const UploadAudio = () => {
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const toggleRecord = () => {
    if (!recording) {
      setRecording(true);
    } else {
      setRecording(false);
      setAnalyzing(true);
      setTimeout(() => setAnalyzing(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-2">VOICE SYNTHESIS DETECTOR</h2>
        <p className="text-gray-400 font-mono text-sm">ANALYZE AUDIO WAVEFORMS FOR AI SIGNATURES</p>
      </div>

      <Panel className="min-h-[400px] flex flex-col items-center justify-center" glow="purple">
        <div className="w-full max-w-2xl h-64 bg-black border border-white/10 mb-8 relative overflow-hidden flex items-center justify-center">
          {/* Waveform Visualization */}
          <div className="flex items-center gap-1 h-32 w-full px-10">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-void"
                animate={{ 
                  height: recording ? [10, Math.random() * 100, 10] : 4,
                  backgroundColor: recording ? '#6b21a8' : '#333'
                }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", delay: i * 0.05 }}
              />
            ))}
          </div>
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_19px,#ffffff10_20px),linear-gradient(90deg,transparent_19px,#ffffff10_20px)] bg-[size:20px_20px] pointer-events-none" />
        </div>

        <div className="flex gap-4">
          <GlitchButton 
            variant={recording ? "danger" : "primary"} 
            onClick={toggleRecord}
            className="w-48"
          >
            {recording ? (
              <><span className="w-3 h-3 bg-white rounded-full animate-pulse mr-2" /> STOP RECORDING</>
            ) : (
              <><Mic className="w-4 h-4 mr-2" /> START CAPTURE</>
            )}
          </GlitchButton>
        </div>

        {analyzing && (
           <div className="mt-8 font-mono text-neon animate-pulse">
             PROCESSING AUDIO SIGNATURE...
           </div>
        )}
      </Panel>
    </div>
  );
};
