import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Globe, Camera, Home, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { BullIcon } from './Navbar';

export const Hero = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const titleText = "Qurbani, Done With Honor.";
  const words = titleText.split(' ');

  useEffect(() => {
    const generateHeroImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A high-contrast, cinematic studio portrait of a powerful bull, illuminated by intense red neon rim lighting. The background is pitch black to make the red light pop. Hyper-realistic textures on the fur and horns. Professional photography style, 8k resolution, sleek and aggressive aesthetic.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
            },
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setHeroImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate hero image:", error);
        // Fallback to a high-quality bull image if generation fails
        setHeroImage('https://images.unsplash.com/photo-1558024920-b41e1887dc32?q=80&w=2070&auto=format&fit=crop');
      } finally {
        setIsLoading(false);
      }
    };

    generateHeroImage();
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: heroImage ? `url('${heroImage}')` : 'none',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
            <p className="text-gold micro-label tracking-widest">Preparing Your Experience...</p>
          </div>
        </div>
      )}
      {/* Immersive Overlays */}
      <div className="absolute inset-0 hero-overlay z-0"></div>
      <div className="absolute inset-0 arabesque-pattern opacity-30 z-0"></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-float z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: '-3s' }}></div>

      <div className="relative z-10 text-center max-w-7xl mx-auto px-4">
        {/* Micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="micro-label inline-flex items-center gap-3 py-2 px-8 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-xl shadow-[0_0_30px_rgba(201,168,76,0.1)]">
            <Moon className="w-3 h-3" /> Eid ul-Adha 2026 — Bookings Open
          </span>
        </motion.div>

        {/* Oversized Display Typography */}
        <h1 className="display-text text-[12vw] md:text-[10vw] lg:text-[8vw] text-white mb-8 drop-shadow-2xl">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 1.2, 
                ease: [0.23, 1, 0.32, 1] 
              }}
              className={`inline-block mr-[0.2em] ${word === 'Honor.' ? 'shimmer-text font-medium' : 'font-light'}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Refined Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="font-serif text-xl md:text-3xl text-gold/80 italic mb-16 font-light tracking-wide max-w-3xl mx-auto"
        >
          Premium. Halal. Shariah-Compliant. Farm to Family.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <a
            href="#booking"
            className="group relative bg-gold text-primary px-12 py-5 font-sans font-semibold text-sm uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
          >
            <span className="relative z-10">Book Your Qurbani</span>
            <div className="absolute inset-0 bg-white transform translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
          </a>
          <a
            href="#packages"
            className="group px-12 py-5 font-sans font-semibold text-sm uppercase tracking-widest text-white border border-white/20 backdrop-blur-md transition-all hover:bg-white hover:text-primary"
          >
            View Packages
          </a>
        </motion.div>

        {/* Quranic Verse - Integrated more subtly */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="mt-24 max-w-xl mx-auto"
        >
          <p className="font-urdu text-gold/60 text-xl md:text-2xl mb-4 leading-relaxed">
            لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ
          </p>
          <p className="font-serif text-sm text-cream/40 italic tracking-widest uppercase">
            "It is not their flesh nor blood that reaches Allah — it is your piety."
          </p>
        </motion.div>
      </div>

      {/* Stats Bar - Sleeker */}
      <div className="absolute bottom-0 w-full border-t border-gold/10 bg-black/20 backdrop-blur-2xl z-20 hidden md:block">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            {[
              { icon: BullIcon, text: '1,200+ Orders' },
              { icon: Home, text: 'Shariah Certified' },
              { icon: Globe, text: 'UK · UAE · USA' },
              { icon: Camera, text: 'Proof Guaranteed' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-cream/50 text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
                <item.icon className="text-gold w-4 h-4 opacity-50" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
