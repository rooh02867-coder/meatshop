import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Minus, Maximize2, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "As-salamu alaykum! I'm the Mushtaq Cattle Farm assistant. How can I help you with your Qurbani booking today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are a helpful and respectful assistant for Mushtaq Cattle Farm. 
          The farm provides premium Qurbani services. 
          Key info:
          - Packages: Bakra/Goat (PKR 55,000), Cow Hissa/Share (PKR 27,000), Whole Cow (PKR 185,000).
          - Services: Shariah-compliant sacrifice, video proof via WhatsApp, home delivery in Lahore, or 100% donation to needy.
          - Location: ${import.meta.env.VITE_FARM_ADDRESS || 'Ring Road, Lahore, Pakistan'}.
          - Contact: WhatsApp at +${import.meta.env.VITE_WHATSAPP_NUMBER || '923000000000'}, Email at ${import.meta.env.VITE_CONTACT_EMAIL || 'info@mushtaqcattle.com'}.
          - Global reach: We serve overseas Pakistanis (UK, UAE, USA, etc.).
          - Payment: Bank transfer, JazzCash, EasyPaisa, International Remittance.
          - Ethics: Farm-raised animals, organic feed, scholar-verified.
          Be polite, use Islamic greetings where appropriate, and encourage users to book via the website form.`,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that. Please try again." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having some trouble connecting. Please try again later or contact us via WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "luxury-glass border border-gold/30 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300",
              isMinimized ? "h-16 w-64" : "h-[550px] w-[350px] md:w-[420px]"
            )}
          >
            {/* Header */}
            <div className="bg-primary/80 backdrop-blur-xl p-5 flex justify-between items-center border-b border-gold/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="display-text text-lg text-white leading-none">Farm Assistant</span>
                  <span className="micro-label text-gold text-[8px] tracking-[0.3em]">Online Support</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsMinimized(!isMinimized)} className="text-gold/50 hover:text-gold transition-colors">
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gold/50 hover:text-gold transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex gap-4 max-w-[90%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md",
                        msg.role === 'user' ? "bg-primary border border-gold/30" : "bg-gold"
                      )}>
                        {msg.role === 'user' ? <User className="w-5 h-5 text-gold" /> : <Bot className="w-5 h-5 text-primary" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                        msg.role === 'user' 
                          ? "bg-primary text-cream rounded-tr-none border border-gold/20" 
                          : "bg-white/5 backdrop-blur-md border border-white/10 text-cream rounded-tl-none"
                      )}>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 mr-auto">
                      <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center animate-pulse">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl rounded-tl-none shadow-sm">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-gold rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-5 border-t border-gold/20 bg-primary/40 backdrop-blur-xl">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about Qurbani..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-all"
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="w-12 h-12 rounded-full bg-gold text-primary flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "w-16 h-16 rounded-full bg-gold text-primary shadow-[0_0_40px_rgba(201,168,76,0.4)] flex items-center justify-center transition-all duration-500 hover:bg-white",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <MessageSquare className="w-7 h-7" />
      </motion.button>
    </div>
  );
};
