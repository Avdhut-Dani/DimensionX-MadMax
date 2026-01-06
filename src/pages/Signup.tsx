import React from 'react';
import { motion } from 'framer-motion';
import { GlitchButton } from '../components/ui/GlitchButton';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-lg p-8 bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(255,0,51,0.1)]"
      >
        <div className="mb-8 border-l-4 border-blood pl-4">
          <h2 className="text-3xl font-display font-bold text-white">NEW AGENT REGISTRATION</h2>
          <p className="text-blood/70 font-mono text-sm mt-1">CLEARANCE LEVEL: UNCLASSIFIED</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-400">CODENAME</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white p-3 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"/>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-400">SECTOR</label>
              <select className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white p-3 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]">
                <option>HAWKINS LAB</option>
                <option>RUSSIAN BASE</option>
                <option>STARCOURT</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-gray-400">SECURE EMAIL</label>
            <input type="email" className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white p-3 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"/>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-gray-400">ENCRYPTION KEY (PASSWORD)</label>
            <input type="password" className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white p-3 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"/>
          </div>

          <div className="pt-4 flex gap-4">
            <Link to="/login" className="flex-1">
              <GlitchButton variant="ghost" className="w-full text-gray-400 hover:text-blood" type="button">CANCEL</GlitchButton>
            </Link>
            <GlitchButton variant="primary" className="flex-1 !border-blood !text-blood hover:!bg-blood hover:!text-black shadow-[0_0_15px_rgba(255,0,51,0.4)]" type="submit">
              INITIALIZE
            </GlitchButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
