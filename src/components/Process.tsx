import React from 'react';
import { motion } from 'motion/react';
import { Monitor, ShieldCheck, Scissors, Video, Package } from 'lucide-react';
import { BullIcon } from './Navbar';

const ProcessStep = ({ number, icon: Icon, title, desc, delay }: { number: number; icon: any; title: string; desc: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="text-center group relative"
  >
    <div className="w-24 h-24 mx-auto luxury-glass rounded-2xl flex items-center justify-center border-gold/20 group-hover:border-gold/50 transition-all duration-500 mb-8 relative z-10">
      <Icon className="w-10 h-10 text-gold transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold text-primary rounded-full flex items-center justify-center micro-label text-[10px] shadow-xl">
        0{number}
      </div>
    </div>
    <h4 className="display-text text-xl text-white mb-3 group-hover:text-gold transition-colors">{title}</h4>
    <p className="font-serif text-cream/50 text-sm italic leading-relaxed px-4">{desc}</p>
  </motion.div>
);

export const Process = () => {
  const steps = [
    { icon: BullIcon, title: 'Select Animal', desc: 'Choose your package online.' },
    { icon: Monitor, title: 'Book Online', desc: 'Provide names for sacrifice.' },
    { icon: ShieldCheck, title: 'Secure Payment', desc: 'Bank transfer or wallet.' },
    { icon: Scissors, title: 'Halal Sacrifice', desc: 'Performed on Eid day.' },
    { icon: Video, title: 'Receive Proof', desc: 'Video sent via WhatsApp.' },
    { icon: Package, title: 'Delivery', desc: 'Delivered or donated.' }
  ];

  return (
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 grayscale scale-110">
        <img 
          src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Cattle background"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="micro-label text-gold mb-4 block"
          >
            The Journey
          </motion.span>
          <h2 className="display-text text-5xl md:text-7xl text-white mb-6">
            Our Sacred <span className="italic font-light text-gold">Process</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {steps.map((step, idx) => (
            <ProcessStep key={idx} number={idx + 1} {...step} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
