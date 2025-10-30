import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import { TrendingUp, Users, ShoppingBag, Shield, ArrowRight } from 'lucide-react';
import { AnimatedGridPattern } from '../../components/ui/animated-grid-pattern';
import { DotPattern } from '../../components/ui/dot-pattern';
import { cn } from '@/lib/utils';

export default function ServicesHub() {
  const services = [
    {
      icon: <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16" />,
      title: 'Sales Forecasting',
      description: 'Predict future sales trends with precision using Linear Regression models trained on historical data.',
      features: ['Revenue predictions', 'Trend analysis', 'Seasonal patterns', 'Demand forecasting'],
      link: '/services/sales-forecasting',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Users className="w-12 h-12 sm:w-16 sm:h-16" />,
      title: 'Customer Segmentation',
      description: 'Understand your customers better with Naive Bayes and Decision Tree algorithms for precise segmentation.',
      features: ['Buyer personas', 'Behavioral grouping', 'Value segmentation', 'Churn prediction'],
      link: '/services/customer-segmentation',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16" />,
      title: 'Product Recommendation',
      description: 'Boost sales with personalized recommendations powered by KNN and ANN algorithms.',
      features: ['Personalized suggestions', 'Cross-sell optimization', 'Upsell strategies', 'Bundle recommendations'],
      link: '/services/product-recommendation',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Shield className="w-12 h-12 sm:w-16 sm:h-16" />,
      title: 'Fraud Detection',
      description: 'Protect your business with advanced SVM-based fraud detection and prevention systems.',
      features: ['Real-time monitoring', 'Anomaly detection', 'Risk scoring', 'Transaction validation'],
      link: '/services/fraud-detection',
      color: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24">
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive AI-powered solutions designed to transform your electronics retail business 
              through data-driven insights and predictive analytics.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <DotPattern
          className={cn(
            "[mask-image:linear-gradient(to_bottom,transparent,white,white,transparent)]",
            "opacity-20"
          )}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="space-y-8 sm:space-y-12">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="glass rounded-2xl p-6 sm:p-8 md:p-12 hover:glow transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <div>
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
                        {service.icon}
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                      <p className="text-gray-400 text-base sm:text-lg mb-6">{service.description}</p>
                      <Link to={service.link}>
                        <button className="flex items-center gap-2 text-accent-cyan hover:gap-4 transition-all active:scale-95 min-h-[48px]">
                          Learn More <ArrowRight className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-accent-cyan rounded-full flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-12 sm:mt-16 text-center glass rounded-2xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-400 text-base sm:text-lg mb-6">
                Contact us today to learn how these services can transform your business.
              </p>
              <Link to="/contact" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-accent-blue hover:bg-blue-600 text-white rounded-lg font-semibold glow transition-all active:scale-95 min-h-[48px]">
                  Request a Demo
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
