import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minus, Maximize2, Bot, User, Phone, Info, CreditCard, HelpCircle, BookOpen } from 'lucide-react';
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
    { role: 'model', text: "As-salamu alaykum! 🌙 I'm the Mushtaq Cattle Farm assistant.\n\nHow can I help you with your Qurbani booking today?\n\nمیں اردو اور انگلش دونوں میں مدد کر سکتا ہوں۔" }
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
        model: "gemini-2.0-flash",
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are the official assistant for Mushtaq Cattle Farm, a trusted Qurbani service based in Lahore, Pakistan.

FARM DETAILS:
- Name: Mushtaq Cattle Farm
- Location: Ring Road, Lahore, Pakistan
- Serving customers locally and overseas (UK, UAE, USA, Canada, Australia)

PRICING:
- Bakra / Goat: PKR 55,000 (1 hissa)
- Cow Hissa (1/7 share): PKR 27,000
- Whole Cow (7 hissay): PKR 185,000
- All prices include Qurbani, processing, and video proof of sacrifice

BOOKING STEPS:
1. Customer selects animal type and number of hissay
2. Payment via: Bank transfer, Remitly, Western Union (for overseas)
3. We send video proof of sacrifice on Eid ul Adha via WhatsApp
4. Meat can be distributed locally on customer's behalf

PAYMENT METHODS:
- Local: Bank transfer (HBL, Meezan, UBL)
- Overseas: Remitly, Western Union, Wise

WHAT WE OFFER:
- Healthy, farm-raised animals
- Sharia-compliant Qurbani
- Video proof of sacrifice sent via WhatsApp
- Optional local meat distribution to deserving families
- Trusted by overseas Pakistanis for 10+ years

COMMON QUESTIONS:
- Kya video milegi? → Haan, har Qurbani ki video WhatsApp par bheji jati hai
- Overseas se kaise book karein? → Remitly ya Western Union se payment karein aur WhatsApp par confirm karein
- Kya janwar halal hai? → Bilkul, tamam janwar Sharia ke mutabiq zabiha kiye jate hain
- Delivery hoti hai? → Lahore mein ghar tak delivery available hai

LANGUAGE RULE — THIS IS CRITICAL:
- ALWAYS reply in the EXACT same language and script the user writes in
- User writes Roman Urdu (like "kya price hai") → reply in Roman Urdu
- User writes Arabic Urdu script → reply in Arabic Urdu script
- User writes English → reply in English
- User writes mixed → reply mixed
- Use warm Islamic tone: "Ji", "Shukriya", "InshaAllah", "Jazak Allah"
- Keep replies concise and helpful
- Always end by encouraging WhatsApp contact for final booking confirmation`,
        },
      });

      const modelText = response.text || "I'm sorry, I couldn't process that. Please contact us on WhatsApp.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errMsg = error instanceof Error ? error.message : String(error);
      setMessages(prev => [...prev, { role: 'model', text: `❌ Error: ${errMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
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
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="display-text text-sm text-white leading-none font-semibold tracking-wide">Mushtaq Farm Assistant</span>
                  <span className="micro-label text-gold-light text-[7px] uppercase tracking-[0.2em] mt-1 opacity-80">Online • اردو | English</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all p-1.5"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all p-1.5"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
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
                        {msg.role === 'user'
                          ? <User className="w-4 h-4 text-gold" />
                          : <Bot className="w-4 h-4 text-primary" />}
                      </div>
                      <div className={cn(
                        "p-3.5 rounded-2xl text-[11px] md:text-[12px] leading-relaxed shadow-md",
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
                  <div ref={messagesEndRef} className="h-2" />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gold/20 bg-[#1A1A1A] shrink-0 relative z-10">
                  <div className="flex gap-2.5 mb-3">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                      placeholder="English or Urdu... | اردو یا انگلش میں لکھیں"
                      className="flex-1 bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-white/20"
                    />
                    <button
                      onClick={() => handleSendMessage(inputText)}
                      disabled={isLoading || !inputText.trim()}
                      className="bg-gold text-primary p-2.5 rounded-xl hover:bg-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleQuickAction('What are the prices for Qurbani animals?')}
                        className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-gold hover:text-primary border border-gold/10 py-2 rounded-xl text-[9px] font-semibold transition-all text-cream uppercase tracking-widest"
                      >
                        <CreditCard className="w-3 h-3" /> Pricing
                      </button>
                      <button
                        onClick={() => handleQuickAction('How can overseas Pakistanis book Qurbani?')}
                        className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-gold hover:text-primary border border-gold/10 py-2 rounded-xl text-[9px] font-semibold transition-all text-cream uppercase tracking-widest"
                      >
                        <Info className="w-3 h-3" /> Overseas
                      </button>
                      <button
                        onClick={() => handleQuickAction('How do I book a Qurbani animal step by step?')}
                        className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-gold hover:text-primary border border-gold/10 py-2 rounded-xl text-[9px] font-semibold transition-all text-cream uppercase tracking-widest"
                      >
                        <BookOpen className="w-3 h-3" /> How to Book
                      </button>
                      <button
                        onClick={() => handleQuickAction('Do you provide video proof of sacrifice?')}
                        className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-gold hover:text-primary border border-gold/10 py-2 rounded-xl text-[9px] font-semibold transition-all text-cream uppercase tracking-widest"
                      >
                        <HelpCircle className="w-3 h-3" /> Video Proof
                      </button>
                    </div>
                    <a
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '15551385960'}`}
                      target="_blank"
                      rel="noreferrer"
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
            onClick={() => { setIsOpen(true); setIsMinimized(false); }}
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
