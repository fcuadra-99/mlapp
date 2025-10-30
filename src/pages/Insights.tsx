import ScrollReveal from '../components/ScrollReveal';
import { TrendingUp, Users, ShoppingCart, DollarSign, Calendar } from 'lucide-react';
import { DotPattern } from '../components/ui/dot-pattern';
import { cn } from '@/lib/utils';

export default function Insights() {
  const insights = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Q1 2024 Retail Trends',
      date: 'March 15, 2024',
      summary: 'Electronics sales show 25% growth in Q1, driven by smart home devices and wearables.',
      category: 'Market Analysis',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Behavior Patterns',
      date: 'March 10, 2024',
      summary: 'New segmentation reveals three distinct buyer personas in electronics retail.',
      category: 'Customer Analytics',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Product Recommendation Impact',
      date: 'March 5, 2024',
      summary: 'Personalized recommendations increase average order value by 35%.',
      category: 'Sales Optimization',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Price Elasticity Analysis',
      date: 'February 28, 2024',
      summary: 'Dynamic pricing strategies yield 20% improvement in profit margins.',
      category: 'Pricing Strategy',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-dark via-accent-blue/5 to-slate-dark"></div>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "opacity-25"
          )}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
                Industry Insights
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Stay ahead of the curve with our latest research, trends, and data-driven insights 
                for the electronics retail industry.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6 sm:space-y-8">
            {insights.map((insight, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="glass rounded-xl p-6 sm:p-8 hover:glow transition-all duration-300 cursor-pointer active:scale-95">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="text-accent-cyan flex-shrink-0">
                      {insight.icon}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <span className="text-sm text-gray-400 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {insight.date}
                        </span>
                        <span className="text-sm px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full w-fit">
                          {insight.category}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold mb-3">{insight.title}</h3>
                      <p className="text-gray-400 text-base sm:text-lg">{insight.summary}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-12 sm:mt-16 glass rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Get Insights Delivered</h2>
              <p className="text-gray-400 text-base sm:text-lg mb-6 leading-relaxed">
                Subscribe to our newsletter for weekly insights and industry trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 sm:py-4 text-base bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan min-h-[48px]"
                />
                <button className="px-6 py-3 sm:py-4 bg-accent-blue hover:bg-blue-600 rounded-lg font-semibold transition-colors active:scale-95 min-h-[48px]">
                  Subscribe
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
