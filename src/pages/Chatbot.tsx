import { useState, useRef, useEffect } from 'react';
import { Panel } from '../components/ui/Panel';
import { Send, Bot } from 'lucide-react';

export const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'GREETINGS. I AM THE DIMENSION X INTERFACE. ASK ME ABOUT THE NATURE OF DECEPTION.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulated response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'YOUR INQUIRY HAS BEEN LOGGED. THE TRUTH IS OFTEN DISAPPOINTING. DEEPFAKES ARE MERELY REFLECTIONS OF HUMAN DESIRE FOR CONTROL.' 
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)]">
      <Panel className="h-full flex flex-col p-0 overflow-hidden" glow="cyan">
        <div className="p-4 border-b border-white/10 bg-black/40 flex items-center gap-3">
          <div className="w-10 h-10 bg-neon/10 rounded-full flex items-center justify-center border border-neon/30">
            <Bot className="w-6 h-6 text-neon" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white">ENTITY LINK</h3>
            <p className="text-xs font-mono text-neon animate-pulse">CONNECTED</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 border ${
                msg.role === 'user' 
                  ? 'bg-blood/10 border-blood/30 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg' 
                  : 'bg-black border-neon/30 text-neon font-mono rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-[0_0_10px_rgba(0,243,255,0.1)]'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40 flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-black border border-white/20 p-3 text-white font-mono focus:border-neon outline-none"
            placeholder="TRANSMIT MESSAGE..."
          />
          <button type="submit" className="bg-neon/10 border border-neon text-neon px-6 hover:bg-neon hover:text-black transition-all">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </Panel>
    </div>
  );
};
