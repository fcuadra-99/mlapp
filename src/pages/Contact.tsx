import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { DotPattern } from '../components/ui/dot-pattern';
import { Particles } from '../components/ui/particles';
import { cn } from '@/lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-slate-dark to-accent-cyan/5"></div>
        <DotPattern
          className={cn(
            "[mask-image:linear-gradient(to_bottom,transparent,white,white,transparent)]",
            "opacity-20"
          )}
        />
        <Particles
          className="absolute inset-0"
          quantity={70}
          ease={85}
          color="#3b82f6"
          refresh
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your retail business? Let's discuss how ElectroSmart Analytics 
                can help you achieve your goals.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <ScrollReveal delay={0.2}>
              <div className="space-y-6 sm:space-y-8">
                <div className="glass rounded-xl p-6 flex items-start gap-4 hover:glow transition-all duration-300 active:scale-95 cursor-pointer">
                  <div className="text-accent-cyan">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base sm:text-lg">Email Us</h3>
                    <p className="text-gray-400 text-sm sm:text-base">contact@electrosmart.ai</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 flex items-start gap-4 hover:glow transition-all duration-300 active:scale-95 cursor-pointer">
                  <div className="text-accent-cyan">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base sm:text-lg">Call Us</h3>
                    <p className="text-gray-400 text-sm sm:text-base">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 flex items-start gap-4 hover:glow transition-all duration-300 active:scale-95 cursor-pointer">
                  <div className="text-accent-cyan">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base sm:text-lg">Visit Us</h3>
                    <p className="text-gray-400 text-sm sm:text-base">
                      123 Innovation Drive<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p>Saturday: 10:00 AM - 2:00 PM PST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <form onSubmit={handleSubmit} className="glass rounded-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Send us a Message</h2>
                
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-4 text-base bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors min-h-[48px]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-4 text-base bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors min-h-[48px]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-4 text-base bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 sm:py-4 text-base bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors resize-none min-h-[120px]"
                      required
                    ></textarea>
                  </div>

                  <Button type="submit" variant="primary" className="w-full justify-center min-h-[48px] active:scale-95">
                    Send Message
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
