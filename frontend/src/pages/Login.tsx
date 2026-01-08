import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchButton } from '../components/ui/GlitchButton';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err: any) {
      console.error("Firebase Auth Error:", err.code);
  
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
  
        case "auth/invalid-credential":
          setError("Email not registered or password is incorrect.");
          break;
  
        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;
  
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
  
        default:
          setError("Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
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
          <p className="text-gray-400 font-mono text-sm tracking-widest">
            AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-blood uppercase tracking-wider">
              Agent ID / Email
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blood transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white px-10 py-3 outline-none font-mono transition-all"
                placeholder="ENTER CREDENTIALS"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-blood uppercase tracking-wider">
              Passcode
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blood transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 focus:border-blood/50 text-white px-10 py-3 outline-none font-mono transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 font-mono text-center">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <div className="pt-4">
            <GlitchButton className="w-full" disabled={loading}>
              {loading ? "ESTABLISHING LINK..." : "ACCESS DIMENSION X"}
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