import ScrollReveal from '../components/ScrollReveal';
import { BarChart3, LineChart, PieChart, TrendingUp } from 'lucide-react';

export default function Gallery() {
  const galleryItems = [
    { icon: <BarChart3 className="w-16 h-16" />, title: 'Sales Analytics Dashboard', category: 'Dashboard' },
    { icon: <LineChart className="w-16 h-16" />, title: 'Revenue Trends', category: 'Forecasting' },
    { icon: <PieChart className="w-16 h-16" />, title: 'Customer Segments', category: 'Segmentation' },
    { icon: <TrendingUp className="w-16 h-16" />, title: 'Growth Predictions', category: 'Analytics' },
    { icon: <BarChart3 className="w-16 h-16" />, title: 'Product Performance', category: 'Insights' },
    { icon: <LineChart className="w-16 h-16" />, title: 'Inventory Optimization', category: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Data Visualization Gallery
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore how we transform complex data into actionable insights through 
              beautiful, intuitive visualizations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="glass rounded-xl p-8 aspect-square flex flex-col items-center justify-center hover:glow transition-all duration-300 group cursor-pointer">
                <div className="text-accent-cyan mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <span className="text-sm text-gray-400">{item.category}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-16 glass rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to See More?</h2>
            <p className="text-gray-400 text-lg">
              Schedule a demo to explore our full suite of analytics tools and visualizations.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
