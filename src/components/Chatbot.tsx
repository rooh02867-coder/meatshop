import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minus, Maximize2, Bot, User, Phone, Info, CreditCard, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "As-salamu alaykum! I'm the Mushtaq Cattle Farm assistant. How can I help you with your Qurbani booking today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (action: string) => {
    let response = "";
    switch(action) {
      case 'pricing':
        response = "Our 2026 packages are: \n- Bakra/Goat: PKR 55,000\n- Cow Hissa: PKR 27,000\n- Whole Cow: PKR 185,000\nAll inclusive of slaughtering and delivery.";
        break;
      case 'overseas':
        response = "We specialize in serving overseas Pakistanis. You can pay via Remitly or Western Union, and we'll send you the video proof of your Qurbani.";
        break;
      case 'delivery':
        response = "We offer home delivery in Lahore in temperature-controlled vans. Alternatively, we can donate 100% of the meat to verified local charities.";
        break;
      default:
        response = "Please contact us directly on WhatsApp for more details!";
    }
    
    setMessages(prev => [
      ...prev, 
      { role: 'user', text: `Tell me about ${action}` },
      { role: 'model', text: response }
    ]);
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
              isMinimized ? "h-16 w-64" : "h-[500px] w-[350px] md:w-[400px]"
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
                  <span className="micro-label text-gold text-[8px] tracking-[0.3em]">Instant Info</span>
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
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="p-5 border-t border-gold/20 bg-primary/40 backdrop-blur-xl">
                  <p className="text-gold/50 text-[10px] uppercase tracking-widest mb-3 text-center">Quick Inquiries</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleQuickAction('pricing')}
                      className="flex items-center gap-2 bg-white/5 hover:bg-gold hover:text-primary border border-gold/20 p-3 rounded-lg text-xs transition-all text-cream"
                    >
                      <CreditCard className="w-3 h-3" /> Pricing
                    </button>
                    <button 
                      onClick={() => handleQuickAction('overseas')}
                      className="flex items-center gap-2 bg-white/5 hover:bg-gold hover:text-primary border border-gold/20 p-3 rounded-lg text-xs transition-all text-cream"
                    >
                      <Info className="w-3 h-3" /> Overseas
                    </button>
                    <button 
                      onClick={() => handleQuickAction('delivery')}
                      className="flex items-center gap-2 bg-white/5 hover:bg-gold hover:text-primary border border-gold/20 p-3 rounded-lg text-xs transition-all text-cream"
                    >
                      <Truck className="w-3 h-3" /> Delivery
                    </button>
                    <a 
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '15551385960'}`}
                      target="_blank"
                      className="flex items-center gap-2 bg-[#25D366] hover:bg-white hover:text-[#25D366] p-3 rounded-lg text-xs transition-all text-white font-bold"
                    >
                      <Phone className="w-3 h-3" /> WhatsApp
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
