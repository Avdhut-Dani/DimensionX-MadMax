import { useState, useCallback } from 'react';
import { Panel } from '../components/ui/Panel';
import { GlitchButton } from '../components/ui/GlitchButton';
import { Upload, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UploadVideo = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<'deepfake' | 'authentic' | null>(null);

  const handleDrag = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  }, []);

  const startScan = () => {
    if (!file) return;
    setScanning(true);
    setResult(null);
    
    // Simulate scan
    setTimeout(() => {
      setScanning(false);
      // Random result for demo
      setResult(Math.random() > 0.5 ? 'deepfake' : 'authentic');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-2">DEEPFAKE VIDEO SCANNER</h2>
        <p className="text-gray-400 font-mono text-sm">ONLY SYNTHETIC MEDIA CAN ENTER DIMENSION X</p>
      </div>

      <Panel className="min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
        {!file && !scanning && !result && (
          <div 
            className={`w-full h-full min-h-[300px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${dragActive ? 'border-neon bg-neon/5' : 'border-white/20 hover:border-neon/50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-500 mb-4" />
            <p className="font-display text-lg text-gray-300">DRAG & DROP VIDEO FOOTAGE</p>
            <p className="font-mono text-xs text-gray-500 mt-2">SUPPORTED FORMATS: MP4, MOV, MKV</p>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => e.target.files && setFile(e.target.files[0])} 
              id="file-upload"
            />
            <label htmlFor="file-upload" className="mt-4 cursor-pointer">
              <GlitchButton variant="ghost" as="span">BROWSE FILES</GlitchButton>
            </label>
          </div>
        )}

        {file && !scanning && !result && (
          <div className="text-center w-full">
            <div className="w-full aspect-video bg-black border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-grid-pattern opacity-20" />
               <p className="font-mono text-neon">{file.name}</p>
            </div>
            <div className="flex justify-center gap-4">
              <GlitchButton onClick={() => setFile(null)} variant="ghost">CANCEL</GlitchButton>
              <GlitchButton onClick={startScan} variant="primary">INITIATE SCAN</GlitchButton>
            </div>
          </div>
        )}

        {scanning && (
          <div className="w-full h-full flex flex-col items-center justify-center py-10">
            <div className="relative w-32 h-32 mb-8">
              <motion.div 
                className="absolute inset-0 border-4 border-t-blood border-r-transparent border-b-blood border-l-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 border-4 border-t-transparent border-r-neon border-b-transparent border-l-neon rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white animate-pulse">
                ANALYZING
              </div>
            </div>
            <div className="w-64 h-2 bg-black border border-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blood to-neon"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
              />
            </div>
            <div className="font-mono text-xs text-neon mt-2">
              MAPPING FACIAL GEOMETRY...
            </div>
          </div>
        )}

        {result && (
          <div className="w-full text-center py-10">
            {result === 'deepfake' ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6"
              >
                <div className="w-24 h-24 mx-auto bg-neon/10 rounded-full flex items-center justify-center border-2 border-neon shadow-[0_0_30px_#00f3ff]">
                  <CheckCircle2 className="w-12 h-12 text-neon" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-neon mb-2">DEEPFAKE DETECTED</h3>
                  <p className="font-mono text-sm text-gray-300">CONFIDENCE: 99.8%</p>
                </div>
                <div className="p-4 bg-neon/5 border border-neon/20 max-w-md mx-auto">
                  <p className="text-neon font-mono text-sm">OPENING PORTAL TO DIMENSION X...</p>
                </div>
                <GlitchButton onClick={() => { setFile(null); setResult(null); }} variant="primary">SCAN NEXT</GlitchButton>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6"
              >
                <div className="w-24 h-24 mx-auto bg-blood/10 rounded-full flex items-center justify-center border-2 border-blood shadow-[0_0_30px_#ff0033]">
                  <XCircle className="w-12 h-12 text-blood" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-blood mb-2">AUTHENTIC MEDIA REJECTED</h3>
                  <p className="font-mono text-sm text-gray-300">NO MANIPULATION DETECTED</p>
                </div>
                <div className="p-4 bg-blood/5 border border-blood/20 max-w-md mx-auto">
                  <p className="text-blood font-mono text-sm">INITIATING DISINTEGRATION PROTOCOL...</p>
                </div>
                <GlitchButton onClick={() => { setFile(null); setResult(null); }} variant="danger">SCAN NEXT</GlitchButton>
              </motion.div>
            )}
          </div>
        )}
      </Panel>
    </div>
  );
};
