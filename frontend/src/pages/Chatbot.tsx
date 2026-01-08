import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Cpu } from "lucide-react";

/**
 * MADMAX AI — Upside Down Cognitive Interface
 * Designed to match Stranger Things Command Center UI
 */

export const Chatbot = () => {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "MadMax AI online. Dimensional signals stabilized. How can I assist, Agent?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // 🔴 SYSTEM CONTEXT (MadMax themed)
    const systemPrompt = `
[SYSTEM: MADMAX AI CORE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: Hawkins Command Center
Threat Level: CRITICAL
Active Mission: Deepfake & Misinformation Detection
Team: MadMax
Tone: Calm, Tactical, Precise
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User Input: ${userMsg.content}
    `.trim();

    try {
      // ⛔ Replace with real backend later
      await new Promise((r) => setTimeout(r, 900));

      const simulatedReply =
        "Signal analyzed. Pattern deviation detected. Recommend immediate verification protocol.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: simulatedReply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection lost. Re-establishing neural link…",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-3xl h-[620px]
            bg-black/70 backdrop-blur-xl
            border border-blood/40
            shadow-[0_0_60px_rgba(255,0,0,0.25)]
            rounded-xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="h-16 px-4 flex items-center justify-between
              bg-gradient-to-r from-black via-blood/20 to-black
              border-b border-blood/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blood rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-mono text-white tracking-widest">
                    MADMAX AI
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Upside Down Cognitive Engine
                  </p>
                </div>
              </div>
              <Cpu className="text-blood w-5 h-5" />
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 font-mono text-xs">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-md
                    ${
                      m.role === "user"
                        ? "bg-blood/20 border border-blood text-white"
                        : "bg-black/60 border border-white/10 text-gray-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="text-blood text-xs animate-pulse">
                  MADMAX AI ANALYZING…
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <div className="border-t border-white/10 p-3 bg-black/80">
              <div className="flex gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Transmit command…"
                  className="flex-1 resize-none bg-black/60 border border-white/10
                  text-white text-xs font-mono rounded-md px-3 py-2 outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-4 py-2 bg-blood text-black text-xs font-bold
                  rounded-md hover:bg-red-500 disabled:opacity-40"
                >
                  SEND
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TOGGLE */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full
        bg-black border border-blood
        shadow-[0_0_30px_rgba(255,0,0,0.6)]
        flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
      >
        {open ? (
          <X className="text-blood" />
        ) : (
          <MessageCircle className="text-blood" />
        )}
      </motion.button>
    </div>
  );
};
