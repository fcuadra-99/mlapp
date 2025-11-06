import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, ShoppingBag, Shield, Mail } from 'lucide-react';
import Button from '../components/Button';
import AnimatedStats from '../components/AnimatedStats';
import ScrollReveal from '../components/ScrollReveal';
import { AnimatedGridPattern } from '../components/ui/animated-grid-pattern';
import { DotPattern } from '../components/ui/dot-pattern';
import { Particles } from '../components/ui/particles';
import { cn } from '@/lib/utils';

export default function Home() {
  const stats = [
    { value: 95, suffix: '%', label: 'Prediction Accuracy' },
    { value: 30, prefix: '+', suffix: '%', label: 'Sales Increase' },
    { value: 500, suffix: '+', label: 'Active Clients' },
  ];

  const services = [
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Sales Forecasting',
      description: 'Predict future sales trends with AI-powered Linear Regression models.',
      link: '/services/sales-forecasting',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Customer Segmentation',
      description: 'Understand your customers better with Naive Bayes and Decision Tree algorithms.',
      link: '/services/customer-segmentation',
    },
    {
      icon: <ShoppingBag className="w-12 h-12" />,
      title: 'Product Recommendation',
      description: 'Boost sales with personalized recommendations using KNN and ANN.',
      link: '/services/product-recommendation',
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Fraud Detection',
      description: 'Protect your business with advanced SVM-based fraud detection.',
      link: '/services/fraud-detection',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-slate-dark to-accent-cyan/20"></div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 text-accent-cyan/30"
          )}
        />
        <Particles
          className="absolute inset-0"
          quantity={80}
          ease={70}
          color="#22d3ee"
          refresh
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <ScrollReveal>
            <div className="inline-block px-4 py-2 sm:px-6 sm:py-2.5 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full mb-6 sm:mb-8">
              <span className="text-accent-cyan font-semibold text-sm sm:text-base">Trusted by 500+ Retailers</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-accent-cyan to-accent-blue bg-clip-text text-transparent leading-tight px-4">
              Powering Smarter Decisions for Electronics Retail
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
              Transform your business with predictive insights that increase revenue by 30%, 
              optimize inventory, and enhance customer engagement through AI-powered analytics.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="primary" className="group w-full sm:w-auto min-h-[48px]">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="ghost" className="w-full sm:w-auto min-h-[48px]">Watch Demo</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-transparent to-slate-dark/50 overflow-hidden">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "opacity-30"
          )}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">Our Services</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link to={service.link} className="block h-full">
                  <div className="glass rounded-xl p-6 sm:p-8 hover:glow transition-all duration-300 group cursor-pointer h-full flex flex-col min-h-[280px] active:scale-95">
                    <div className="text-accent-cyan mb-4 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow text-base sm:text-lg">{service.description}</p>
                    <div className="flex items-center text-accent-cyan group-hover:translate-x-2 transition-transform font-medium">
                      Learn more <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-transparent to-slate-dark/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">About Our Data</h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                We leverage the comprehensive E-commerce Purchase History Dataset to train our models, 
                ensuring accurate predictions and actionable insights for your retail business.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">Why Choose Us</h2>
          </ScrollReveal>
          
          <AnimatedStats stats={stats} />
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-transparent to-slate-dark/50 overflow-hidden">
        <DotPattern
          className={cn(
            "[mask-image:linear-gradient(to_bottom,transparent,white,transparent)]",
            "opacity-20"
          )}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="glass rounded-2xl p-6 sm:p-8 md:p-12 text-center">
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-accent-cyan" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">Ready to Transform Your Business?</h2>
              <p className="text-gray-400 mb-8 text-base sm:text-lg leading-relaxed">
                Get in touch with our team to learn how ElectroSmart Analytics can help you achieve your goals.
              </p>
              <Link to="/contact" className="inline-block w-full sm:w-auto">
                <Button variant="primary" className="group w-full sm:w-auto min-h-[48px]">
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
