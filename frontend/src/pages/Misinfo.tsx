import { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { GlitchButton } from '../components/ui/GlitchButton';
import { Search, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Misinfo = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (!text) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult({
        score: 87,
        verdict: "HIGH PROBABILITY OF FABRICATION",
        flags: ["Logical Fallacies", "Emotional Manipulation", "Unverified Sources"]
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-2">REALITY CHECKER</h2>
        <p className="text-gray-400 font-mono text-sm">TEXTUAL ANALYSIS & FACT VERIFICATION</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Panel className="md:col-span-2" title="INPUT DATA">
          <textarea
            className="w-full h-64 bg-black/50 border border-white/10 p-4 text-white font-mono text-sm focus:border-neon outline-none resize-none"
            placeholder="PASTE SUSPICIOUS TEXT OR URL HERE..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <GlitchButton onClick={handleScan} disabled={!text || scanning}>
              {scanning ? 'ANALYZING...' : 'RUN DIAGNOSTICS'}
            </GlitchButton>
          </div>
        </Panel>

        <Panel title="ANALYSIS RESULT" glow={result ? "red" : "cyan"}>
          {!result && !scanning && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono text-xs text-center opacity-50">
              <Search className="w-8 h-8 mb-2" />
              WAITING FOR INPUT...
            </div>
          )}

          {scanning && (
            <div className="space-y-2 font-mono text-xs text-neon">
              <p className="flex justify-between"><span>SYNTAX CHECK</span> <span>OK</span></p>
              <p className="flex justify-between"><span>CROSS-REF DB</span> <span>SEARCHING...</span></p>
              <p className="flex justify-between"><span>SENTIMENT</span> <span>ANALYZING...</span></p>
              <div className="h-1 bg-white/10 mt-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-neon" 
                  animate={{ x: [-100, 100] }} 
                  transition={{ duration: 1, repeat: Infinity }} 
                />
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-display font-bold text-blood mb-1">{result.score}%</div>
                <div className="text-xs font-mono text-blood border border-blood px-2 py-1 inline-block">
                  THREAT TO REALITY
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono text-gray-400 uppercase">Flags Detected:</p>
                {result.flags.map((flag: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white bg-white/5 p-2 border-l-2 border-blood">
                    <AlertTriangle className="w-4 h-4 text-blood" />
                    {flag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
};
