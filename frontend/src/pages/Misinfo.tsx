import { useState, useRef } from 'react';
import { Panel } from '../components/ui/Panel';
import { GlitchButton } from '../components/ui/GlitchButton';
import {
  Search,
  AlertTriangle,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Tesseract from 'tesseract.js';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const Misinfo = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);

  // 🔑 Replace with your real reCAPTCHA site key
  const siteKey = 'YOUR_RE-CAPTCHA_KEY_HERE';

  // Store widget ID (rendered once)
  const captchaWidget = useRef<number | null>(null);

  /* ==========================
      CAPTCHA EXECUTION (FIXED)
  ========================== */
  const getCaptchaToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject('Captcha script not loaded');
        return;
      }

      window.grecaptcha.ready(() => {
        try {
          if (captchaWidget.current === null) {
            captchaWidget.current = window.grecaptcha.render('recaptcha', {
              sitekey: siteKey,
              size: 'invisible',
              callback: resolve,
              'error-callback': () => reject('Captcha error'),
            });
          }

          window.grecaptcha.execute(captchaWidget.current);
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  /* ==========================
      MAIN ANALYSIS HANDLER
  ========================== */
  const handleScan = async () => {
    if (!text.trim()) return;

    setScanning(true);
    setResult(null);

    try {
      const captchaToken = await getCaptchaToken();

      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          captcha: captchaToken,
        }),
      });

      if (!response.ok) throw new Error('Backend error');

      const data = await response.json();
      const claim = data.claims[0];

      setResult({
        score: data.overall_score,
        verdict: claim.verdict,
        reason: claim.reason,
        flags: data.flags.length
          ? data.flags
          : [`Verdict: ${claim.verdict}`],
        stance: claim.stance,
      });
    } catch (err) {
      setResult({
        score: 0,
        verdict: 'ANALYSIS FAILED',
        reason: 'Captcha or backend error',
        flags: ['Captcha verification failed'],
      });
    } finally {
      setScanning(false);
    }
  };

  /* ==========================
      OCR HANDLER
  ========================== */
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setOcrLoading(true);
    setOcrError(null);

    try {
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: () => {},
      });

      const extractedText = data.text.trim();

      if (!extractedText) {
        setOcrError('No readable text detected.');
        return;
      }

      setText((prev) =>
        prev ? `${prev}\n\n${extractedText}` : extractedText
      );
    } catch {
      setOcrError('Failed to extract text from image.');
    } finally {
      setOcrLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Invisible captcha mount point */}
      <div id="recaptcha" />

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          REALITY CHECKER
        </h2>
        <p className="text-gray-400 font-mono text-sm">
          TEXTUAL ANALYSIS & FACT VERIFICATION
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* INPUT PANEL */}
        <Panel className="md:col-span-2" title="INPUT DATA">
          <textarea
            className="w-full h-64 bg-black/50 border border-white/10 p-4 text-white font-mono text-sm focus:border-neon outline-none resize-none"
            placeholder="PASTE SUSPICIOUS TEXT HERE..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="mt-4 flex justify-end">
            <GlitchButton onClick={handleScan} disabled={!text || scanning}>
              {scanning ? 'ANALYZING...' : 'RUN DIAGNOSTICS'}
            </GlitchButton>
          </div>
        </Panel>

        {/* RESULT PANEL */}
        <Panel title="ANALYSIS RESULT" glow={result ? 'red' : 'cyan'}>
          {!result && !scanning && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono text-xs opacity-50">
              <Search className="w-8 h-8 mb-2" />
              WAITING FOR INPUT...
            </div>
          )}

          {scanning && (
            <div className="space-y-2 font-mono text-xs text-neon">
              <p className="flex justify-between">
                <span>CAPTCHA</span>
                <span>VERIFIED</span>
              </p>
              <p className="flex justify-between">
                <span>ANALYSIS</span>
                <span>RUNNING</span>
              </p>

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
                <div className="text-5xl font-display font-bold text-blood">
                  {result.score}%
                </div>
                <div className="text-xs font-mono text-blood border border-blood px-2 py-1 inline-block">
                  {result.verdict}
                </div>
                <p className="mt-2 text-xs font-mono text-gray-400">
                  {result.reason}
                </p>
              </div>

              {result.flags.map((flag: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-white bg-white/5 p-2 border-l-2 border-blood"
                >
                  <AlertTriangle className="w-4 h-4 text-blood" />
                  {flag}
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>

      {/* OCR PANEL */}
      <Panel title="SCREENSHOT INPUT">
        <label className="flex flex-col items-center justify-center border border-dashed border-white/20 bg-black/40 p-6 cursor-pointer">
          <ImageIcon className="w-8 h-8 text-neon mb-2" />
          <p className="font-mono text-xs text-gray-300">
            DROP OR CLICK TO UPLOAD SCREENSHOT
          </p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />
        </label>

        {ocrLoading && (
          <div className="mt-4 text-xs font-mono text-neon flex gap-2">
            <Upload className="animate-pulse" />
            EXTRACTING TEXT...
          </div>
        )}

        {ocrError && (
          <div className="mt-4 text-xs font-mono text-blood">
            {ocrError}
          </div>
        )}
      </Panel>
    </div>
  );
};
