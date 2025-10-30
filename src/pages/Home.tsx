import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, ShoppingBag, Shield, BarChart3, Mail } from 'lucide-react';
import Button from '../components/Button';
import AnimatedStats from '../components/AnimatedStats';
import ScrollReveal from '../components/ScrollReveal';

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
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-transparent to-accent-cyan/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-block px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full mb-6">
              <span className="text-accent-cyan font-semibold">Trusted by 500+ Retailers</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-accent-cyan to-accent-blue bg-clip-text text-transparent">
              Powering Smarter Decisions for Electronics Retail
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your business with predictive insights that increase revenue by 30%, 
              optimize inventory, and enhance customer engagement through AI-powered analytics.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" className="group">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="ghost">Watch Demo</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent to-slate-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Services</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link to={service.link}>
                  <div className="glass rounded-xl p-6 hover:glow transition-all duration-300 group cursor-pointer h-full">
                    <div className="text-accent-cyan mb-4 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <div className="flex items-center text-accent-cyan group-hover:translate-x-2 transition-transform">
                      Learn more <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Data in Action</h2>
              <p className="text-gray-400 text-lg">Real insights from real data</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="glass rounded-xl p-6 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-20 h-20 mx-auto mb-4 text-accent-cyan" />
                    <p className="text-gray-400">Chart Placeholder {item}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent to-slate-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">About Our Data</h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                We leverage the comprehensive E-commerce Purchase History Dataset to train our models, 
                ensuring accurate predictions and actionable insights for your retail business.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Choose Us</h2>
          </ScrollReveal>
          
          <AnimatedStats stats={stats} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent to-slate-dark/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 md:p-12 text-center">
              <Mail className="w-16 h-16 mx-auto mb-6 text-accent-cyan" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-gray-400 mb-8">
                Get in touch with our team to learn how ElectroSmart Analytics can help you achieve your goals.
              </p>
              <Link to="/contact">
                <Button variant="primary" className="group">
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
