import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchButton } from '../components/ui/GlitchButton';
import { useNavigate, Link } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const Signup = () => {
  const navigate = useNavigate();

  const [codename, setCodename] = useState('');
  const [sector, setSector] = useState('HAWKINS LAB');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,4096}$/;

    const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
    
      if (!passwordRegex.test(password)) {
        setError(
          'Password must be 6–4096 characters and include uppercase, lowercase, and a special character.'
        );
        return;
      }
    
      if (!codename.trim()) {
        setError('Codename is required.');
        return;
      }
    
      try {
        setLoading(true);
    
        // 🔐 CREATE AUTH USER (UNCHANGED)
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
    
        const user = userCredential.user;
    
        // 🧾 USERS COLLECTION (UNCHANGED)
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          codename,
          sector,
          createdAt: serverTimestamp()
        });
    
        // ⚙️ SETTINGS COLLECTION (NEW, SAFE ADDITION)
        await setDoc(doc(db, 'settings', user.uid), {
          uid: user.uid,
          overlay: true,
          audio: true,
          notifications: true,
          createdAt: serverTimestamp()
        });
    
        navigate('/');
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          setError('This email is already registered.');
        } else if (err.code === 'auth/invalid-email') {
          setError('Invalid email address.');
        } else if (err.code === 'auth/weak-password') {
          setError('Password is too weak.');
        } else {
          setError('Registration failed. Please try again.');
        }
      } finally {
        setLoading(false);
      }
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
          <h2 className="text-3xl font-display font-bold text-white">
            NEW AGENT REGISTRATION
          </h2>
          <p className="text-blood/70 font-mono text-sm mt-1">
            CLEARANCE LEVEL: UNCLASSIFIED
          </p>
        </div>

        {error && (
          <div className="mb-4 text-red-500 font-mono text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-gray-400">
                CODENAME
              </label>
              <input
                type="text"
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white p-3 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400">
                SECTOR
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white p-3 outline-none font-mono"
              >
                <option>HAWKINS LAB</option>
                <option>RUSSIAN BASE</option>
                <option>STARCOURT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gray-400">
              SECURE EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white p-3 outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-gray-400">
              ENCRYPTION KEY (PASSWORD)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white p-3 outline-none font-mono"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <Link to="/login" className="flex-1">
              <GlitchButton variant="ghost" className="w-full">
                CANCEL
              </GlitchButton>
            </Link>

            <GlitchButton
              variant="primary"
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'INITIALIZING...' : 'INITIALIZE'}
            </GlitchButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};