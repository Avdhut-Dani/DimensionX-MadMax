import { Panel } from '../components/ui/Panel';
import { GlitchButton } from '../components/ui/GlitchButton';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { useAudio } from '../context/AudioContext';

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';


import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const SettingRow = ({ label, description, active, onToggle }: any) => (
  <div className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
    <div>
      <h4 className="font-display text-white">{label}</h4>
      <p className="text-xs font-mono text-gray-500">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`transition-colors ${active ? 'text-neon' : 'text-gray-600'}`}
    >
      {active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
    </button>
  </div>
);

export const Settings = () => {
  const user = auth.currentUser;

  const navigate = useNavigate();
  const [showRift, setShowRift] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    extensionOverlay: true,
    sound: true,
    notifications: true
  });

  const [loading, setLoading] = useState(true);

  // 🔄 LOAD SETTINGS FROM FIRESTORE
  useEffect(() => {
    if (!user) return;

    const loadSettings = async () => {
      const ref = doc(db, 'settings', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setSettings({
          extensionOverlay: data.overlay,
          sound: data.audio,
          notifications: data.notifications
        });
      }

      setLoading(false);
    };

    loadSettings();
  }, [user]);

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const confirmDeleteAccount = async () => {
    if (!user || !user.email) return;
  
    try {
      setDeleting(true);
      setAuthError(null);
  
      // 🔐 REAUTH
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordConfirm
      );
  
      await reauthenticateWithCredential(user, credential);
  
      // 🔥 DELETE FIRESTORE WHILE AUTH IS STILL VALID
      await deleteDoc(doc(db, 'settings', user.uid));
      await deleteDoc(doc(db, 'users', user.uid));
  
      // ☠️ DELETE AUTH USER LAST
      await deleteUser(user);
  
      // 🚀 UI CLEANUP
      setShowRift(false);
      navigate('/signup');
  
    } catch (err: any) {
      console.error('Account deletion failed:', err);
  
      if (err.code === 'auth/wrong-password') {
        setAuthError('Incorrect password.');
      } else if (err.code === 'auth/requires-recent-login') {
        setAuthError('Please re-authenticate.');
      } else {
        setAuthError('Deletion failed.');
      }
  
      setDeleting(false);
    }
  };   

  // Play rift sound when the modal opens
  const { audioEnabled, playRift } = useAudio();

  // Play rift sound when the modal opens, respecting audio setting
  useEffect(() => {
    if (showRift && audioEnabled) {
      playRift();
    }
  }, [showRift, audioEnabled, playRift]);  


  // 💾 SAVE SETTINGS TO FIRESTORE
  const saveSettings = async () => {
    if (!user) return;

    const ref = doc(db, 'settings', user.uid);

    await updateDoc(ref, {
      overlay: settings.extensionOverlay,
      audio: settings.sound,
      notifications: settings.notifications,
      updatedAt: serverTimestamp()
    });
  };

  if (loading) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-display font-bold text-white mb-2">
        SYSTEM CONFIGURATION
      </h2>

      <Panel title="INTERFACE PARAMETERS" glow="cyan">
        <SettingRow
          label="EXTENSION OVERLAY"
          description="Enable in-app extension overlay layer"
          active={settings.extensionOverlay}
          onToggle={() => toggle('extensionOverlay')}
        />
        <SettingRow
          label="AUDIO FEEDBACK"
          description="Enable UI interaction sounds"
          active={settings.sound}
          onToggle={() => toggle('sound')}
        />
        <SettingRow
          label="NOTIFICATIONS"
          description="Allow system alerts and updates"
          active={settings.notifications}
          onToggle={() => toggle('notifications')}
        />
      </Panel>

      <div className="flex justify-end">
        <GlitchButton onClick={saveSettings}>
          SAVE SETTINGS
        </GlitchButton>
      </div>

      <Panel title="DANGER ZONE" glow="red" className="border-blood/50">
        <div className="flex items-center justify-between p-4">
          <div>
            <h4 className="font-display text-blood font-bold">
              DISCONNECT FROM DIMENSION X
            </h4>
            <p className="text-xs font-mono text-gray-500">
              This will delete your account and you will lose your preferences.
            </p>
          </div>
          <GlitchButton variant="danger" onClick={() => setShowRift(true)}>
  DELETE
</GlitchButton>

        </div>
      </Panel>
      <AnimatePresence>
  {showRift && (
    <>
      {/* 🔥 LEFT SPLIT */}
      <motion.div
        className="fixed inset-y-0 left-0 w-1/2 z-40"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        exit={{ x: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(90deg, #050000, rgba(0,0,0,0))',
          boxShadow: 'inset -20px 0 100px rgba(255,0,0,0.6)',
        }}
      />

      {/* 🔥 RIGHT SPLIT */}
      <motion.div
        className="fixed inset-y-0 right-0 w-1/2 z-40"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        exit={{ x: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(270deg, #050000, rgba(0,0,0,0))',
          boxShadow: 'inset 20px 0 100px rgba(255,0,0,0.6)',
        }}
      />

      {/* 🌋 LAVA GLOW */}
      <motion.div
        className="fixed inset-0 z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,40,0,0.45), transparent 65%)',
        }}
      />

      {/* 🕳 RIFT MODAL */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scaleY: 0, rotate: -2 }}
          animate={{ scaleY: 1, rotate: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative w-[420px] bg-gradient-to-b from-black via-red-900 to-blood border border-blood shadow-[0_0_80px_rgba(255,0,0,0.8)] overflow-hidden"
        >
          {/* 🔥 Lava Flicker */}
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.6),transparent_70%)]" />

          <div className="relative p-6 space-y-4 text-center">
            <h3 className="text-2xl font-display text-blood">
              DIMENSIONAL BREACH
            </h3>

            <p className="text-sm font-mono text-gray-300">
              This action will permanently erase your existence from this dimension.
            </p>

            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full bg-black/60 border border-blood text-white p-2 font-mono outline-none"
            />

            {authError && (
              <p className="text-xs text-red-400 font-mono">
                {authError}
              </p>
            )}

            <div className="flex justify-center gap-4 pt-4">
              <GlitchButton
                variant="ghost"
                onClick={() => setShowRift(false)}
                disabled={deleting}
              >
                ABORT
              </GlitchButton>

              <GlitchButton
                variant="danger"
                onClick={confirmDeleteAccount}
                disabled={deleting}
              >
                {deleting ? 'ERASING…' : 'CONFIRM'}
              </GlitchButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </div>
  );
};
