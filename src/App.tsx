import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Packages } from './components/Packages';
import { Process } from './components/Process';
import { Farm } from './components/Farm';
import { Stats, Testimonials } from './components/Stats';
import { Gallery, FAQ, Footer } from './components/Footer';
import { BookingForm } from './components/BookingForm';
import { Chatbot } from './components/Chatbot';
import { Check, Video, Truck, Snowflake, Camera, Tractor, Plane } from 'lucide-react';

const TrustBadges = () => (
  <section className="bg-cream py-6 border-b border-gold/20 overflow-hidden relative z-10">
    <div className="flex w-full whitespace-nowrap hide-scroll">
      <div className="marquee-content inline-flex text-gold font-sans font-medium text-sm md:text-base uppercase tracking-[2px]">
        {[
          { icon: Check, text: 'Shariah Compliant' },
          { icon: Video, text: 'Video Proof Sent' },
          { icon: Truck, text: 'Home Delivery' },
          { icon: Snowflake, text: 'Hygienic Packaging' },
          { icon: Camera, text: 'Photo Confirmation' },
          { icon: Tractor, text: 'Farm-Raised Animals' },
          { icon: Plane, text: 'Overseas Booking' }
        ].map((badge, i) => (
          <React.Fragment key={i}>
            <span className="mx-8 flex items-center gap-2">
              <badge.icon className="w-4 h-4" /> {badge.text}
            </span>
            <span className="text-primary/30">◆</span>
          </React.Fragment>
        ))}
        {/* Duplicate for seamless loop */}
        {[
          { icon: Check, text: 'Shariah Compliant' },
          { icon: Video, text: 'Video Proof Sent' },
          { icon: Truck, text: 'Home Delivery' }
        ].map((badge, i) => (
          <React.Fragment key={i + 10}>
            <span className="mx-8 flex items-center gap-2">
              <badge.icon className="w-4 h-4" /> {badge.text}
            </span>
            <span className="text-primary/30">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '923000000000'}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center group"
  >
    <div className="bg-charcoal border border-gold/30 text-gold text-xs font-sans font-bold px-4 py-2 rounded-sm mr-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg tracking-widest uppercase">
      Inquire Now
    </div>
    <div className="bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] wa-float">
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dz6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
    </div>
  </a>
);

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePackageSelect = (pkg: string) => {
    setSelectedPackage(pkg);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-primary text-cream selection:bg-gold selection:text-primary overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full noise-bg opacity-20"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-dark/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-5s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustBadges />
        
        <div className="space-y-0">
          <Process />
          <Farm />
          <Packages onSelect={handlePackageSelect} />
          <Stats />
          <Testimonials />
          
          <section id="booking" className="py-32 relative">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="micro-label text-gold mb-4 block">Reservation</span>
                <h2 className="display-text text-5xl text-white mb-6">Secure Your <span className="italic font-light text-gold">Sacrifice</span></h2>
                <div className="w-24 h-1 bg-gold mx-auto"></div>
              </div>
              <div className="luxury-glass p-8 md:p-12 rounded-2xl shadow-2xl">
                <BookingForm selectedPackage={selectedPackage} onPackageSelect={setSelectedPackage} />
              </div>
            </div>
          </section>

          <Gallery />
          <FAQ />
          <Footer />
        </div>

        {/* Floating Actions */}
        <Chatbot />
        <WhatsAppFloat />
      </div>
    </main>
  );
}
