import React from 'react';
import { motion } from 'motion/react';
import { Leaf, ScrollText, Globe } from 'lucide-react';

export const Farm = () => {
  const VideoIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
  );

  const usps = [
    { icon: Leaf, title: 'Farm-Raised Animals', desc: 'No middlemen. Animals are raised naturally on our own land with organic feed and regular veterinary checkups.' },
    { icon: ScrollText, title: 'Scholar Certified', desc: 'Every sacrifice is overseen by certified Islamic scholars ensuring strict adherence to Sunnah.' },
    { icon: VideoIcon, title: 'Video Proof Guaranteed', desc: 'You receive a clear video of your specific Qurbani, with names recited prior to the sacrifice.' },
    { icon: Globe, title: 'Global Reach', desc: 'Trusted by overseas Pakistanis. Book securely from the UK, UAE, USA, or anywhere in the world.' }
  ];

  return (
    <section id="farm" className="py-24 bg-cream-dark border-t border-b border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 border-2 border-gold transform -rotate-2 z-0"></div>
            <div className="relative z-10 overflow-hidden aspect-[4/5] shadow-[0_20px_50px_rgba(139,0,0,0.2)]">
              <img
                src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2070&auto=format&fit=crop"
                alt="Mushtaq Farm Livestock"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent flex flex-col justify-end p-10">
                <h3 className="font-serif text-4xl text-white leading-snug">Serving families with honor since 2010.</h3>
              </div>
            </div>
          </motion.div>

          <div>
            <p className="text-gold font-sans font-medium tracking-widest uppercase text-sm mb-4">The Mushtaq Standard</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-10 leading-tight">Uncompromising Quality & Devotion.</h2>

            <div className="space-y-8 font-sans">
              {usps.map((usp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start group"
                >
                  <div className="w-12 h-12 shrink-0 rounded-full border border-gold flex items-center justify-center text-gold text-xl group-hover:bg-gold group-hover:text-primary transition-colors">
                    {typeof usp.icon === 'string' ? usp.icon : <usp.icon className="w-6 h-6" />}
                  </div>
                  <div className="ml-5">
                    <h4 className="font-bold text-primary text-xl mb-1">{usp.title}</h4>
                    <p className="text-charcoal/70 leading-relaxed">{usp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
