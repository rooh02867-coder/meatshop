import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Crown, Check, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { BullIcon } from './Navbar';

interface PackageProps {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  isPremium?: boolean;
  delay?: number;
  onSelect: (pkg: string) => void;
}

const PackageCard = ({ image, title, subtitle, price, features, isPopular, isPremium, delay = 0, onSelect }: PackageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className={cn(
      "luxury-glass rounded-sm overflow-hidden flex flex-col h-full group relative transition-all duration-500 hover:-translate-y-2",
      isPopular && "lg:-translate-y-6 border-gold shadow-[0_30px_60px_rgba(201,168,76,0.2)]"
    )}
  >
    {isPopular && (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gold text-primary px-6 py-1.5 micro-label text-[10px] shadow-xl z-20">
        Most Popular
      </div>
    )}
    {isPremium && (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-charcoal border border-gold text-gold px-6 py-1.5 micro-label text-[10px] shadow-xl z-20">
        <Crown className="w-3 h-3 inline mr-1" /> Premium
      </div>
    )}
    
    <div className="relative h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
    </div>
    
    <div className="p-10 pt-6 flex flex-col flex-grow">
      <h3 className="display-text text-3xl text-white mb-2">{title}</h3>
      <p className="font-serif text-gold/60 italic mb-8 border-b border-gold/10 pb-4 inline-block mx-auto">
        {subtitle}
      </p>
      
      <ul className="text-left space-y-4 mb-10 text-cream/70 font-sans flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="text-gold w-4 h-4 mt-0.5 shrink-0" />
            <span className="text-sm tracking-wide">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mb-10">
        <span className="micro-label text-gold/50 block mb-1">Starting at</span>
        <span className="font-sans text-4xl font-bold text-white tracking-tighter">{price}</span>
      </div>
      
      <button
        onClick={() => onSelect(title)}
        className={cn(
          "w-full block py-4 micro-label tracking-[0.3em] transition-all duration-300",
          isPopular 
            ? "bg-gold text-primary hover:bg-white" 
            : "bg-transparent border border-gold/30 text-gold hover:bg-gold hover:text-primary"
        )}
      >
        Book This Package
      </button>
    </div>
  </motion.div>
);

export const Packages = ({ onSelect }: { onSelect: (pkg: string) => void }) => {
  return (
    <section id="packages" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="micro-label text-gold mb-4 block"
          >
            Selection 2026
          </motion.span>
          <h2 className="display-text text-5xl md:text-7xl text-white mb-6">
            Sacrificial <span className="italic font-light text-gold">Offerings</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="font-serif text-cream/60 text-lg max-w-2xl mx-auto italic">
            Choose from our hand-reared, healthy livestock, prepared with the utmost respect for tradition.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <PackageCard
            image="https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=2070&auto=format&fit=crop"
            title="Bakra / Goat"
            subtitle="Individual Qurbani"
            price="PKR 55,000"
            features={[
              "Premium Farm-raised animal",
              "Shariah-compliant sacrifice",
              "Video & photo proof included",
              "Hygienic home delivery available"
            ]}
            delay={0.1}
            onSelect={onSelect}
          />
          <PackageCard
            image="https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2070&auto=format&fit=crop"
            title="Bull Hissa"
            subtitle="1/7 Share of Brahman Bull"
            price="PKR 27,000"
            features={[
              "Equal 1/7th premium meat share",
              "Name recited before sacrifice",
              "Dedicated video proof via WhatsApp",
              "Neatly packed, ready to cook/freeze"
            ]}
            isPopular
            delay={0.2}
            onSelect={onSelect}
          />
          <PackageCard
            image="https://images.unsplash.com/photo-1563500310-70f90e633a6e?q=80&w=2070&auto=format&fit=crop"
            title="Whole Bull"
            subtitle="Full Brahman Bull Qurbani"
            price="PKR 185,000"
            features={[
              "250kg+ live weight premium bull",
              "Dedicated slaughtering schedule",
              "Custom meat distribution & cuts",
              "Comprehensive video coverage"
            ]}
            isPremium
            delay={0.3}
            onSelect={onSelect}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-primary-dark border border-gold/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-primary/50 border border-gold/30 flex items-center justify-center text-gold text-2xl">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-2xl text-gold mb-1">Sadqah / Damm Qurbani</h4>
              <p className="text-cream/70 font-sans text-sm">Year-round charitable sacrifice distributed to the needy.</p>
            </div>
          </div>
          <button
            onClick={() => onSelect('Sadqah')}
            className="text-cream hover:text-gold font-sans text-sm uppercase tracking-widest transition-colors whitespace-nowrap border-b border-gold/50 pb-1"
          >
            Inquire Now &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
};
