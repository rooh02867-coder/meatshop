import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Counter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const totalFrames = Math.round(duration / 16);
      const increment = end / totalFrames;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

export const Stats = () => {
  const stats = [
    { label: 'Orders Served', target: 1200, suffix: '+' },
    { label: 'Families Fed', target: 500, suffix: '+' },
    { label: 'Years of Trust', target: 15, suffix: '+' },
    { label: 'Cities Covered', target: 5, suffix: '' }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 grayscale">
        <img 
          src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Cattle background"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="display-text text-5xl md:text-7xl text-white mb-4 tracking-tighter group-hover:text-gold transition-colors duration-500">
                <Counter target={stat.target} />{stat.suffix}
              </div>
              <div className="micro-label text-gold/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Zayn Ahmed',
      location: 'London',
      text: "Living in London, it was impossible to find a trustworthy farm for Qurbani. Mushtaq Cattle Farm changed that. The video proof was clear, taking our family names right before the sacrifice.",
      rating: 5
    },
    {
      name: 'Saad Malik',
      location: 'Lahore',
      text: "Booked a cow share. The meat was delivered clean, well-packed in vacuum bags, and exactly on time. True professionalism and respect for the Islamic tradition.",
      rating: 5
    },
    {
      name: 'Fatima Khan',
      location: 'Dubai',
      text: "I chose to donate 100% of my Qurbani to the needy. They sent me pictures of the meat being distributed to madrasas. Total transparency. May Allah bless them.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="micro-label text-gold mb-4 block"
          >
            Voices of Trust
          </motion.span>
          <h2 className="display-text text-5xl md:text-7xl text-white mb-6">
            Global <span className="italic font-light text-gold">Reflections</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="luxury-glass p-10 relative group h-full flex flex-col"
            >
              <Star className="absolute top-6 right-6 w-10 h-10 text-gold/10 group-hover:text-gold/20 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              <p className="font-serif text-cream/80 text-lg italic mb-10 leading-relaxed flex-grow">
                "{t.text}"
              </p>

              <div className="border-t border-gold/10 pt-8">
                <div className="display-text text-2xl text-white mb-1">{t.name}</div>
                <div className="flex items-center gap-2 micro-label text-gold/50 text-[10px]">
                  <MapPin className="w-3 h-3" /> {t.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
