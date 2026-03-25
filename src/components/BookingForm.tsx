import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { cn } from '../lib/utils';

interface BookingFormProps {
  selectedPackage: string | null;
  onPackageSelect: (pkg: string) => void;
}

export const BookingForm = ({ selectedPackage, onPackageSelect }: BookingFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    package: selectedPackage || '',
    name: '',
    whatsapp: '',
    location: '',
    email: '',
    delivery: '',
    payment: ''
  });

  const packages = [
    { id: 'Goat', name: 'Bakra / Goat', img: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=200&h=200&auto=format&fit=crop' },
    { id: 'Cow Share', name: 'Cow Share (1/7)', img: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=200&h=200&auto=format&fit=crop' },
    { id: 'Whole Cow', name: 'Whole Cow', img: 'https://images.unsplash.com/photo-1563500310-70f90e633a6e?q=80&w=200&h=200&auto=format&fit=crop', premium: true },
    { id: 'Sadqah', name: 'Sadqah / Damm', img: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=200&h=200&auto=format&fit=crop' }
  ];

  const handleNext = () => {
    if (step === 1 && !formData.package) {
      alert("Please select a package.");
      return;
    }
    if (step === 2 && (!formData.name || !formData.whatsapp || !formData.location || !formData.delivery)) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      package: '',
      name: '',
      whatsapp: '',
      location: '',
      email: '',
      delivery: '',
      payment: ''
    });
    onPackageSelect('');
  };

  return (
    <section id="booking" className="py-24 bg-cream relative arabesque-pattern cream-bg border-t border-gold/20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] grayscale">
        <img 
          src="https://images.unsplash.com/photo-1563500310-70f90e633a6e?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Cattle background"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-4">Reserve Your Qurbani</h2>
          <div className="gold-divider bg-cream-div"></div>
        </div>

        <div className="bg-white shadow-[0_20px_60px_rgba(139,0,0,0.08)] border border-gold/20 rounded-sm overflow-hidden">
          {/* Progress Bar */}
          <div className="flex border-b border-gold/20 bg-cream-dark">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "flex-1 py-5 text-center font-sans text-xs md:text-sm font-bold uppercase tracking-widest transition-all",
                  step >= s ? "text-gold border-b-2 border-gold" : "text-gold/40 border-b-2 border-transparent",
                  s < 3 && "border-r border-gold/20"
                )}
              >
                <span className="hidden md:inline">Step {s}: </span>
                {s === 1 ? 'Package' : s === 2 ? 'Details' : 'Payment'}
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12 relative">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="w-24 h-24 bg-primary text-gold rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-lg">
                    <Check className="w-12 h-12" />
                  </div>
                  <h3 className="font-serif text-4xl text-primary mb-4">Alhamdulillah!</h3>
                  <p className="font-sans text-charcoal/70 text-lg mb-8 max-w-md mx-auto">
                    Your booking request has been securely placed. Our team will contact you via WhatsApp shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="bg-transparent border border-primary text-primary px-8 py-3 rounded-sm font-sans font-medium hover:bg-primary hover:text-gold transition-colors"
                  >
                    Book Another Package
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        {packages.map((pkg) => (
                          <label key={pkg.id} className="cursor-pointer group">
                            <input
                              type="radio"
                              name="package"
                              value={pkg.id}
                              checked={formData.package === pkg.id}
                              onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                              className="peer sr-only"
                            />
                            <div className="p-6 border-2 border-cream-dark bg-cream rounded-sm peer-checked:border-primary peer-checked:bg-primary/5 transition-all text-center h-full flex flex-col items-center justify-center relative overflow-hidden">
                              {pkg.premium && (
                                <div className="absolute top-0 right-0 bg-gold text-primary text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                                  Premium
                                </div>
                              )}
                              <img 
                                src={pkg.img} 
                                alt={pkg.name} 
                                className="w-16 h-16 rounded-full object-cover mb-4 group-hover:scale-110 transition-transform border-2 border-gold/20"
                                referrerPolicy="no-referrer"
                              />
                              <div className="font-serif text-2xl text-primary font-bold">{pkg.name}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="bg-primary text-gold px-10 py-4 font-sans uppercase tracking-widest text-sm font-bold hover:bg-primary-light transition-colors rounded-sm shadow-md flex items-center gap-2"
                        >
                          Next Step <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block font-sans text-xs text-gold-dark uppercase tracking-widest font-bold mb-2">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-cream border border-gold/30 text-charcoal px-4 py-3 font-sans transition-colors rounded-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs text-gold-dark uppercase tracking-widest font-bold mb-2">WhatsApp No *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+92 3XX XXXXXXX"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            className="w-full bg-cream border border-gold/30 text-charcoal px-4 py-3 font-sans transition-colors rounded-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs text-gold-dark uppercase tracking-widest font-bold mb-2">City & Country *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. London, UK"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full bg-cream border border-gold/30 text-charcoal px-4 py-3 font-sans transition-colors rounded-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs text-gold-dark uppercase tracking-widest font-bold mb-2">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-cream border border-gold/30 text-charcoal px-4 py-3 font-sans transition-colors rounded-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-gold-dark uppercase tracking-widest font-bold mb-4">Meat Delivery Preference *</label>
                        <div className="space-y-4">
                          {[
                            { id: 'Home', label: 'Home Delivery (Lahore & Surrounding)' },
                            { id: 'Donate', label: 'Donate 100% to Needy Families' },
                            { id: 'Self', label: 'Self Pickup from Farm' }
                          ].map((opt) => (
                            <label key={opt.id} className="flex items-center p-4 border border-gold/20 bg-cream rounded-sm cursor-pointer hover:border-primary transition-colors">
                              <input
                                type="radio"
                                name="delivery"
                                value={opt.id}
                                checked={formData.delivery === opt.id}
                                onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                                className="text-primary focus:ring-primary w-5 h-5 border-gold/50"
                              />
                              <span className="ml-4 font-sans text-charcoal font-medium">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-charcoal/50 hover:text-primary font-sans font-medium transition-colors flex items-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="bg-primary text-gold px-10 py-4 font-sans uppercase tracking-widest text-sm font-bold hover:bg-primary-light transition-colors rounded-sm shadow-md flex items-center gap-2"
                        >
                          Next Step <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div>
                        <label className="block font-sans text-xs text-gold-dark uppercase tracking-widest font-bold mb-4">Select Payment Method *</label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { id: 'Bank', label: 'Bank Transfer', desc: 'Direct IBFT to Meezan/HBL' },
                            { id: 'Wallet', label: 'Mobile Wallet', desc: 'JazzCash / EasyPaisa' },
                            { id: 'Remittance', label: 'Intl. Remittance', desc: 'Remitly, Zoom, Western Union' },
                            { id: 'Cash', label: 'Cash on Delivery', desc: 'Available in Lahore only' }
                          ].map((opt) => (
                            <label key={opt.id} className="border border-gold/20 bg-cream p-4 rounded-sm cursor-pointer hover:border-primary transition-colors group flex items-start">
                              <input
                                type="radio"
                                name="payment"
                                value={opt.id}
                                checked={formData.payment === opt.id}
                                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                                className="mt-1 text-primary focus:ring-primary"
                              />
                              <div className="ml-3">
                                <div className="font-sans font-bold text-primary">{opt.label}</div>
                                <div className="text-xs text-charcoal/60 mt-1">{opt.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center border-t border-gold/20 pt-8">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-charcoal/50 hover:text-primary font-sans font-medium transition-colors order-2 sm:order-1 flex items-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          type="submit"
                          className="w-full sm:w-auto bg-gold text-primary px-12 py-5 font-sans uppercase tracking-widest text-sm font-bold hover:bg-gold-light transition-colors rounded-sm shadow-[0_10px_20px_rgba(201,168,76,0.3)] order-1 sm:order-2 flex items-center justify-center gap-3"
                        >
                          Confirm Booking <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </AnimatePresence>

            {!isSubmitted && (
              <div className="mt-8 text-center">
                <p className="font-sans text-xs text-charcoal/50 flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3 text-gold" /> Your booking is 100% secure and Shariah-verified. No upfront payment deducted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
