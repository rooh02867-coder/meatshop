import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, MessageCircle, Youtube, Mail, Phone, MapPin, Plus, Minus } from 'lucide-react';

export const Gallery = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2070&auto=format&fit=crop', title: 'Majestic Brahman' },
    { src: 'https://images.unsplash.com/photo-1563500310-70f90e633a6e?q=80&w=2070&auto=format&fit=crop', title: 'Healthy Brahman Bulls' },
    { src: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=2070&auto=format&fit=crop', title: 'Premium Sheep' },
    { src: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2070&auto=format&fit=crop', title: 'Modern Baras' },
    { src: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2070&auto=format&fit=crop', title: 'Farm Life' },
    { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop', title: 'Prize Bull' }
  ];

  return (
    <section className="py-24 bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-white">From Our Farm</h2>
          <div className="gold-divider bg-primary-div"></div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="break-inside-avoid relative group overflow-hidden rounded-sm cursor-pointer shadow-lg"
            >
              <img src={img.src} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" alt={img.title} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/100 transition-colors duration-500 z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h4 className="font-serif text-2xl text-gold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const faqs = [
    { q: 'Is your Qurbani Shariah-compliant and scholar-verified?', a: 'Yes, absolutely. Every step from the selection of the animal to the final sacrifice is overseen by certified Islamic scholars. We ensure the animal is of the correct age, healthy, and the sacrifice is performed exactly according to Sunnah.' },
    { q: 'Can I book from the UK, UAE, or USA?', a: 'We specialize in serving overseas Pakistanis. You can easily book online and pay via international remittance (Remitly, Zoom, Western Union). We will send the video proof directly to your international WhatsApp number.' },
    { q: 'Will I receive proof of my Qurbani?', a: 'Yes. We provide clear, dedicated video coverage. The butcher will announce your name (or your family\'s names) immediately before the sacrifice is performed.' },
    { q: 'How is meat delivered or distributed to the poor?', a: 'If you choose home delivery, the meat is vacuum-packed and delivered in temperature-controlled vans. If you choose to donate, we distribute it directly to verified madrasas, orphanages, and deeply impoverished families in surrounding villages.' },
    { q: 'What are the accepted payment methods?', a: 'We accept local Bank Transfers (IBFT), JazzCash, EasyPaisa, Cash on Delivery (Lahore only), and International Remittance for overseas clients.' }
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-white font-bold mb-4">Frequently Asked Questions</h2>
          <div className="gold-divider bg-primary-div"></div>
        </div>

        <div className="space-y-4 font-sans">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-primary-dark border border-gold/20 rounded-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer text-gold font-medium text-lg outline-none select-none">
                {faq.q}
                <span className="transition-transform duration-300 group-open:rotate-180 text-gold/50">
                  <Plus className="w-5 h-5 group-open:hidden" />
                  <Minus className="w-5 h-5 hidden group-open:block" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-cream/70 border-t border-gold/10 pt-4 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-charcoal pt-24 pb-8 border-t-2 border-gold relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 font-sans">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-gold w-6 h-6" />
              <h2 className="font-serif font-bold text-2xl text-gold">Mushtaq Cattle</h2>
            </div>
            <p className="text-cream/60 italic font-serif text-lg mb-6">"Qurbani, Done With Honor."</p>
            <div className="flex gap-4">
              {[Facebook, Instagram, MessageCircle, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Our Farm & Values', 'Pricing & Packages', 'How It Works', 'Customer Reviews', 'Terms & Conditions'].map((link, i) => (
                <li key={i}><a href="#" className="text-cream/50 hover:text-gold transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-gold mt-1 mr-3 w-4 h-4" />
                <span className="text-cream/50 text-sm">{import.meta.env.VITE_FARM_ADDRESS || 'Mushtaq Farm, Ring Road, Lahore, Pakistan'}</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gold mr-3 w-4 h-4" />
                <a href={`tel:+${import.meta.env.VITE_WHATSAPP_NUMBER || '15551385960'}`} className="text-cream/50 hover:text-gold transition-colors text-sm">+{import.meta.env.VITE_WHATSAPP_NUMBER || '1 555 138 5960'}</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-gold mr-3 w-4 h-4" />
                <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'info@mushtaqcattle.com'}`} className="text-cream/50 hover:text-gold transition-colors text-sm">{import.meta.env.VITE_CONTACT_EMAIL || 'info@mushtaqcattle.com'}</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="bg-primary/20 border border-gold/20 p-6 rounded-sm">
              <h4 className="font-serif text-xl text-gold mb-2">Ready to Book?</h4>
              <p className="text-cream/60 text-sm mb-6">Reach out to our team instantly via WhatsApp for quick booking.</p>
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '15551385960'}`} target="_blank" className="block w-full text-center bg-[#25D366] text-white py-3 rounded-sm font-bold hover:bg-[#1EBE5D] transition-colors font-sans text-sm">
                Chat with Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-cream/40 tracking-wider">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Mushtaq Cattle Farm. All Rights Reserved.</p>
          <p>Lahore, Pakistan <span className="mx-2 text-gold">◆</span> 100% Halal</p>
        </div>
      </div>
    </footer>
  );
};
