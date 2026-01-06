import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchButton } from '../components/ui/GlitchButton';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blood/20 via-obsidian to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blood/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8 bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(255,0,51,0.1)]"
      >
        <div className="text-center mb-10">
          <motion.h1 
            className="text-4xl font-display font-bold text-white mb-2 glitch-text" 
            data-text="DIMENSION X"
            animate={{ textShadow: ["0 0 0px #ff0033", "0 0 10px #ff0033", "0 0 0px #ff0033"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DIMENSION X
          </motion.h1>
          <p className="text-gray-400 font-mono text-sm tracking-widest">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-blood uppercase tracking-wider">Agent ID / Email</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blood transition-colors" />
              <input 
                type="email" 
                className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white px-10 py-3 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"
                placeholder="ENTER CREDENTIALS"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-blood uppercase tracking-wider">Passcode</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blood transition-colors" />
              <input 
                type="password" 
                className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white px-10 py-3 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <GlitchButton className="w-full" disabled={loading}>
              {loading ? 'ESTABLISHING LINK...' : 'ACCESS DIMENSION X'}
            </GlitchButton>
          </div>

          <div className="text-center mt-6">
            <Link to="/signup" className="text-xs font-mono text-gray-500 hover:text-neon transition-colors">
              [ REQUEST CLEARANCE ]
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
