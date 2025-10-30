import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import { TrendingUp, Users, ShoppingBag, Shield, ArrowRight } from 'lucide-react';

export default function ServicesHub() {
  const services = [
    {
      icon: <TrendingUp className="w-16 h-16" />,
      title: 'Sales Forecasting',
      description: 'Predict future sales trends with precision using Linear Regression models trained on historical data.',
      features: ['Revenue predictions', 'Trend analysis', 'Seasonal patterns', 'Demand forecasting'],
      link: '/services/sales-forecasting',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: 'Customer Segmentation',
      description: 'Understand your customers better with Naive Bayes and Decision Tree algorithms for precise segmentation.',
      features: ['Buyer personas', 'Behavioral grouping', 'Value segmentation', 'Churn prediction'],
      link: '/services/customer-segmentation',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <ShoppingBag className="w-16 h-16" />,
      title: 'Product Recommendation',
      description: 'Boost sales with personalized recommendations powered by KNN and ANN algorithms.',
      features: ['Personalized suggestions', 'Cross-sell optimization', 'Upsell strategies', 'Bundle recommendations'],
      link: '/services/product-recommendation',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: 'Fraud Detection',
      description: 'Protect your business with advanced SVM-based fraud detection and prevention systems.',
      features: ['Real-time monitoring', 'Anomaly detection', 'Risk scoring', 'Transaction validation'],
      link: '/services/fraud-detection',
      color: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive AI-powered solutions designed to transform your electronics retail business 
              through data-driven insights and predictive analytics.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="glass rounded-2xl p-8 md:p-12 hover:glow transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
                      {service.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                    <p className="text-gray-400 text-lg mb-6">{service.description}</p>
                    <Link to={service.link}>
                      <button className="flex items-center gap-2 text-accent-cyan hover:gap-4 transition-all">
                        Learn More <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                          <span className="text-gray-300">{feature}</span>
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
          <div className="mt-16 text-center glass rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 text-lg mb-6">
              Contact us today to learn how these services can transform your business.
            </p>
            <Link to="/contact">
              <button className="px-8 py-4 bg-accent-blue hover:bg-blue-600 text-white rounded-lg font-semibold glow transition-all">
                Request a Demo
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
