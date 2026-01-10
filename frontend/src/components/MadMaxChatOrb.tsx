import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, X } from "lucide-react";


/* ======================================================
   MADMAX AI — DEEPFAKE & MISINFORMATION ANALYST
   Backend: http://localhost:3001/api/chat
   Models: Ollama (mistral, gemma3, llama3, phi)
====================================================== */

const SYSTEM_PROMPT = `
You are MADMAX AI.

MISSION:
You are an expert system specialized in:
- Deepfake detection (image, video, audio)
- Misinformation & disinformation analysis
- AI-generated content identification
- Media forensics & verification
- Propaganda & manipulation patterns
- Digital trust and authenticity

BEHAVIOR RULES:
- Be analytical, precise, and calm
- Do NOT roleplay or chit-chat
- Do NOT hallucinate sources
- If uncertain, say so clearly
- Provide structured explanations
- Focus on verification methods and signals

STYLE:
- Professional intelligence analyst
- Clear sections or bullet points when useful
- No emojis, no fluff
`;

const MadMaxChatOrb = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "MADMAX AI online. I analyze deepfakes, misinformation, and AI-generated content. What requires verification?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("mistral");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  /* ======================
     Scroll + textarea
  ====================== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  /* ======================
     Send Message
  ====================== */
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);
    setInput("");

    const userMessage = { role: "user", content: text };
    const history = [...messages, userMessage];

    const assistantPlaceholder = { role: "assistant", content: "" };
    setMessages([...history, assistantPlaceholder]);
    const assistantIndex = history.length;

    const finalPrompt = `
${SYSTEM_PROMPT}

━━━━━━━━━━━━━━━━━━━━━━━━━━
USER QUERY
━━━━━━━━━━━━━━━━━━━━━━━━━━
${text}
`.trim();

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          message: finalPrompt,
        }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.response) {
              fullText += json.response;

              setMessages((prev) => {
                const updated = [...prev];
                updated[assistantIndex] = {
                  role: "assistant",
                  content: fullText,
                };
                return updated;
              });
            }
          } catch {
            // ignore malformed stream chunks
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantIndex] = {
          role: "assistant",
          content:
            "Connection failure. Verify Ollama is running and the backend bridge is active.",
        };
        return updated;
      });
    }

    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ======================
     Render
  ====================== */
  return (
    <>
      {/* Floating Orb */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full
        bg-black border border-red-700
        shadow-[0_0_30px_rgba(255,0,0,0.6)]
        flex items-center justify-center"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <Cpu className="text-red-500 w-7 h-7" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-[380px] h-[540px] z-50
            rounded-2xl overflow-hidden
            bg-black/90 backdrop-blur-xl
            border border-red-900
            shadow-[0_0_50px_rgba(255,0,0,0.45)]
            flex flex-col font-mono text-xs"
          >
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4
            bg-gradient-to-r from-black via-red-950/40 to-black
            border-b border-red-900">
              <div>
                <p className="text-red-500 tracking-widest font-bold">
                  MADMAX AI
                </p>
                <p className="text-[10px] text-gray-400">
                  Deepfake & Misinformation Analyst
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="bg-black text-red-400 text-[10px]
                  border border-red-800 rounded px-2 py-1"
                >
                  <option value="mistral">mistral</option>
                  <option value="gemma3:1b">gemma3:1b</option>
                  <option value="gemma3:3b">gemma3:3b</option>
                  <option value="llama3:8b">llama3:8b</option>
                  <option value="phi3:mini">phi3:mini</option>
                </select>

                <Cpu className="text-red-600 w-4 h-4" />
                <button onClick={() => setOpen(false)}>
                  <X className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
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
                        ? "bg-red-900/30 border border-red-700 text-white"
                        : "bg-black/60 border border-gray-700 text-gray-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-red-500 animate-pulse text-[10px]">
                  ANALYZING SIGNAL…
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-red-900 p-3 bg-black">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Submit content or claim for analysis…"
                className="w-full resize-none bg-black/70
                border border-red-800
                text-white text-xs rounded-md px-3 py-2
                outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MadMaxChatOrb;