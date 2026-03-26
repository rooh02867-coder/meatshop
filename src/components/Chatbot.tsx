import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minus, Maximize2, Bot, User, Phone, Info, CreditCard, Truck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "As-salamu alaykum! I'm the Mushtaq Cattle Farm assistant. How can I help you with your Qurbani booking today? (I can speak Urdu and English)" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are the Mushtaq Cattle Farm assistant. 
          Your goal is to help customers book Qurbani animals (Goats, Bulls, Cow Shares).
          Pricing: Bakra/Goat: PKR 55,000, Cow Hissa: PKR 27,000, Whole Cow: PKR 185,000.
          Location: Lahore, Pakistan. We serve overseas Pakistanis (UK, UAE, USA) via Remitly/Western Union.
          We provide video proof of sacrifice.
          IMPORTANT: Reply in the SAME language the user uses. If they ask in Urdu, reply in Urdu. If in English, reply in English.
          Be polite, professional, and helpful.`,
        },
      });

      const modelText = response.text || "I'm sorry, I couldn't process that. Please contact us on WhatsApp.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting. Please try again or message us on WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const text = `Tell me about ${action}`;
    handleSendMessage(text);
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[1001] font-sans flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "luxury-glass border border-gold/30 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-500",
              isMinimized
                ? "h-[60px] w-[220px]"
                : "w-[calc(100vw-2rem)] sm:w-[360px] md:w-[400px]"
            )}
            style={!isMinimized ? { height: 'min(600px, calc(100vh - 120px))' } : {}}
          >
            {/* Header */}
            <div 
              className="bg-[#8B0000] p-3.5 flex justify-between items-center border-b border-gold/30 shrink-0 relative z-10 cursor-pointer"
              onClick={() => isMinimized && setIsMinimized(false)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-lg border border-white/20">
                  <Bot className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="display-text text-sm text-white leading-none font-semibold tracking-wide">Mushtaq Farm Assistant</span>
                  <span className="micro-label text-gold-light text-[7px] uppercase tracking-[0.2em] mt-1 opacity-80">Online & Ready to Help</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(!isMinimized);
                  }} 
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all p-1.5"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }} 
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all p-1.5"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Enhanced Conversation Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1A1A1A]/95 backdrop-blur-md scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent">
                  <div className="text-center mb-4">
                    <span className="text-[9px] text-gold/40 uppercase tracking-[0.3em] font-medium">Today</span>
                  </div>
                  
                  {messages.map((msg, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={idx}
                      className={cn(
                        "flex gap-3 max-w-[88%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg border",
                        msg.role === 'user' ? "bg-[#8B0000] border-gold/30" : "bg-gold border-white/20"
                      )}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-gold" /> : <Bot className="w-4 h-4 text-primary" />}
                      </div>
                      <div className={cn(
                        "p-3.5 rounded-2xl text-[11px] md:text-[12px] leading-relaxed shadow-md transition-all",
                        msg.role === 'user' 
                          ? "bg-[#8B0000] text-cream rounded-tr-none border border-gold/20" 
                          : "bg-white/5 backdrop-blur-xl border border-white/10 text-cream rounded-tl-none"
                      )}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 mr-auto">
                      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-lg">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-cream rounded-tl-none flex items-center gap-3">
                        <div className="flex gap-1">
                          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                        </div>
                        <span className="text-[10px] italic text-gold/60 font-medium">Assistant is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-4" />
                </div>

                {/* Enhanced Input Area */}
                <div className="p-4 border-t border-gold/20 bg-[#1A1A1A] shrink-0 relative z-10">
                  <div className="flex gap-2.5 mb-3">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                      placeholder="Type your message here..."
                      className="flex-1 bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-white/20"
                    />
                    <button
                      onClick={() => handleSendMessage(inputText)}
                      disabled={isLoading || !inputText.trim()}
                      className="bg-gold text-primary p-2.5 rounded-xl hover:bg-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                    >
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleQuickAction('pricing')}
                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-gold hover:text-primary border border-gold/10 py-2 rounded-xl text-[9px] font-semibold transition-all text-cream uppercase tracking-widest"
                      >
                        <CreditCard className="w-3 h-3" /> View Pricing
                      </button>
                      <button 
                        onClick={() => handleQuickAction('overseas')}
                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-gold hover:text-primary border border-gold/10 py-2 rounded-xl text-[9px] font-semibold transition-all text-cream uppercase tracking-widest"
                      >
                        <Info className="w-3 h-3" /> Overseas Info
                      </button>
                    </div>
                    <a 
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '15551385960'}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-white hover:text-[#25D366] py-2.5 rounded-xl text-[10px] transition-all text-white font-bold uppercase tracking-[0.15em] shadow-lg"
                    >
                      <Phone className="w-3.5 h-3.5" /> Direct WhatsApp Booking
                    </a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="relative w-16 h-16 rounded-full bg-gold text-primary shadow-[0_10px_40px_rgba(201,168,76,0.5)] flex items-center justify-center hover:bg-white group"
          >
            <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B0000] rounded-full border-2 border-primary flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
