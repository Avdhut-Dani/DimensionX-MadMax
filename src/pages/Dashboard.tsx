import { Panel } from '../components/ui/Panel';
import { Activity, Radio, AlertTriangle, Eye, Database, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, trend, color = "text-blood" }: any) => (
  <div className="flex items-end justify-between p-4 bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
    <div>
      <p className="text-xs font-mono text-gray-500 mb-1">{label}</p>
      <h4 className={`text-2xl font-display font-bold ${color}`}>{value}</h4>
    </div>
    <span className="text-xs font-mono text-gray-400">{trend}</span>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-white">COMMAND CENTER</h2>
          <p className="text-gray-400 font-mono text-sm">MONITORING DIMENSIONAL RIFTS</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blood/10 border border-blood/30 rounded-full animate-pulse">
          <div className="w-2 h-2 bg-blood rounded-full" />
          <span className="text-xs font-mono text-blood font-bold tracking-wider">THREAT LEVEL: CRITICAL</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="MIND FLAYER ACTIVITY" value="98.4%" trend="↑ 12% SPIKE" color="text-blood" />
        <StatCard label="DEEPFAKES DETECTED" value="1,240" trend="+45 TODAY" color="text-neon" />
        <StatCard label="RIFT STABILITY" value="CRITICAL" trend="FAILING..." color="text-void" />
        <StatCard label="ACTIVE AGENTS" value="42" trend="ONLINE" color="text-white" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map / Visualizer */}
        <Panel className="lg:col-span-2 h-[400px] flex items-center justify-center relative overflow-hidden" title="GLOBAL RIFT TRACKER">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-void/20 via-obsidian to-obsidian" />
          
          {/* Simulated Map Points */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 border border-blood rounded-full flex items-center justify-center"
              style={{ 
                top: `${Math.random() * 80 + 10}%`, 
                left: `${Math.random() * 80 + 10}%` 
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity }}
            >
              <div className="w-1 h-1 bg-blood rounded-full" />
            </motion.div>
          ))}
          
          <div className="absolute bottom-4 left-4 font-mono text-xs text-blood">
            <p>COORDS: 34.234, -118.234</p>
            <p>SECTOR: HAWKINS</p>
          </div>
          
          <div className="grid grid-cols-12 gap-1 w-full h-full opacity-10 pointer-events-none">
             {[...Array(100)].map((_, i) => (
               <div key={i} className="border border-neon/20" />
             ))}
          </div>
        </Panel>

        {/* Live Feed / Logs */}
        <Panel className="h-[400px] overflow-hidden flex flex-col" title="SYSTEM LOGS" glow="cyan">
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs p-2 custom-scrollbar">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex gap-2 text-gray-400 border-b border-white/5 pb-1">
                <span className="text-neon opacity-50">[{new Date().toLocaleTimeString()}]</span>
                <span>
                  {i % 3 === 0 ? <span className="text-blood">ANOMALY DETECTED</span> : 
                   i % 3 === 1 ? "Scanning sector 7G..." : 
                   "Data packet intercepted."}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel title="RECENT INTERCEPTIONS" glow="purple">
           <div className="space-y-4">
             {[1,2,3].map((i) => (
               <div key={i} className="flex items-center gap-4 p-3 bg-white/5 border border-transparent hover:border-void/50 transition-all cursor-pointer group">
                 <div className="w-12 h-12 bg-black flex items-center justify-center border border-white/10">
                    <Eye className="w-6 h-6 text-void group-hover:text-white transition-colors" />
                 </div>
                 <div>
                   <h5 className="font-display text-sm text-white">SUBJECT #{8490 + i}</h5>
                   <p className="text-xs font-mono text-gray-500">VIDEO • 98% ARTIFICIAL</p>
                 </div>
                 <div className="ml-auto text-xs font-bold text-blood border border-blood px-2 py-1">
                   BURNED
                 </div>
               </div>
             ))}
           </div>
        </Panel>

        <Panel title="NETWORK HEALTH" glow="cyan">
          <div className="h-full flex flex-col justify-center gap-6">
             <div className="space-y-2">
               <div className="flex justify-between text-xs font-mono">
                 <span>SERVER LOAD</span>
                 <span className="text-neon">89%</span>
               </div>
               <div className="h-2 bg-black border border-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-neon" 
                   initial={{ width: 0 }}
                   animate={{ width: '89%' }}
                   transition={{ duration: 1.5 }}
                 />
               </div>
             </div>
             <div className="space-y-2">
               <div className="flex justify-between text-xs font-mono">
                 <span>DIMENSIONAL TEAR</span>
                 <span className="text-blood">12%</span>
               </div>
               <div className="h-2 bg-black border border-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-blood" 
                   initial={{ width: 0 }}
                   animate={{ width: '12%' }}
                   transition={{ duration: 1.5 }}
                 />
               </div>
             </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};
