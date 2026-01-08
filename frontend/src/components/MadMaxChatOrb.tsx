import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

const MadMaxChatOrb = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "MadMax AI secure channel established. Awaiting transmission.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // 🔴 Replace with backend later
    await new Promise((r) => setTimeout(r, 900));

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Signal parsed. Probability of anomaly detected. Recommend escalation.",
      },
    ]);

    setLoading(false);
  };

  return (
    <>
      {/* FLOATING ORB */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full
        bg-black border border-red-600
        shadow-[0_0_30px_rgba(255,0,0,0.6)]
        flex items-center justify-center"
        animate={{
          boxShadow: [
            "0 0 20px rgba(255,0,0,0.4)",
            "0 0 36px rgba(255,0,0,0.9)",
            "0 0 20px rgba(255,0,0,0.4)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        whileHover={{ scale: 1.15 }}
      >
        {open ? (
          <X className="text-red-500" />
        ) : (
          <MessageSquare className="text-red-500" />
        )}
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            className="fixed bottom-28 right-8 z-50
            w-[380px] h-[540px]
            bg-black/85 backdrop-blur-xl
            border border-red-900/50
            rounded-xl overflow-hidden
            shadow-[0_0_60px_rgba(255,0,0,0.35)]
            flex flex-col font-mono text-xs"
          >
            {/* HEADER */}
            <div className="h-14 px-4 flex items-center justify-between
              bg-gradient-to-r from-black via-red-950/40 to-black
              border-b border-red-900/40">
              <div>
                <p className="text-red-500 tracking-widest text-sm">
                  MADMAX AI
                </p>
                <p className="text-[10px] text-gray-500">
                  Secure Dimensional Channel
                </p>
              </div>
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-md
                    ${
                      m.role === "user"
                        ? "bg-red-950/40 border border-red-600 text-white"
                        : "bg-black/60 border border-white/10 text-gray-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-red-500 animate-pulse">
                  ANALYZING TRANSMISSION…
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <div className="border-t border-red-900/40 p-2 bg-black/90">
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
                  placeholder="Transmit message…"
                  className="flex-1 resize-none bg-black/70 border border-white/10
                  text-white rounded-md px-2 py-1 outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="px-3 py-1 bg-red-600 text-black font-bold rounded-md"
                >
                  SEND
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MadMaxChatOrb;
