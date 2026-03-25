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
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
    <div className="fixed bottom-6 left-6 z-[60] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "luxury-glass border border-gold/30 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300",
              isMinimized ? "h-16 w-64" : "h-[550px] w-[350px] md:w-[400px]"
            )}
          >
            {/* Header */}
            <div className="bg-primary/80 backdrop-blur-xl p-5 flex justify-between items-center border-b border-gold/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="display-text text-lg text-white leading-none">Farm Helper</span>
                  <span className="micro-label text-gold text-[8px] tracking-[0.3em]">AI Assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  className="text-gold/50 hover:text-gold transition-colors p-1"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-gold/50 hover:text-gold transition-colors p-1"
                  title="Close"
                >
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
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 mr-auto">
                      <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-md">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-cream rounded-tl-none flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gold" />
                        <span className="text-xs italic opacity-50">Typing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gold/20 bg-primary/40 backdrop-blur-xl">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                      placeholder="Ask in Urdu or English..."
                      className="flex-1 bg-white/5 border border-gold/20 rounded-lg px-4 py-2 text-sm text-cream focus:outline-none focus:border-gold transition-colors"
                    />
                    <button
                      onClick={() => handleSendMessage(inputText)}
                      disabled={isLoading || !inputText.trim()}
                      className="bg-gold text-primary p-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleQuickAction('pricing')}
                      className="flex items-center gap-2 bg-white/5 hover:bg-gold hover:text-primary border border-gold/20 p-2 rounded-lg text-[10px] transition-all text-cream"
                    >
                      <CreditCard className="w-3 h-3" /> Pricing
                    </button>
                    <button 
                      onClick={() => handleQuickAction('overseas')}
                      className="flex items-center gap-2 bg-white/5 hover:bg-gold hover:text-primary border border-gold/20 p-2 rounded-lg text-[10px] transition-all text-cream"
                    >
                      <Info className="w-3 h-3" /> Overseas
                    </button>
                    <a 
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '15551385960'}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-white hover:text-[#25D366] p-2 rounded-lg text-[10px] transition-all text-white font-bold col-span-2"
                    >
                      <Phone className="w-3 h-3" /> WhatsApp for Direct Booking
                    </a>
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
