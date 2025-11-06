import ScrollReveal from '../../../components/ScrollReveal';
import { Users, CheckCircle } from 'lucide-react';
import { AnimatedGridPattern } from '../../../components/ui/animated-grid-pattern';
import { Particles } from '../../../components/ui/particles';
import { cn } from '@/lib/utils';
import PieChart from '../../../components/Charts/PieChart';

export default function CustomerSegmentation() {
  const benefits = [
    'Target marketing campaigns to specific customer groups',
    'Personalize customer experiences and communications',
    'Identify high-value customer segments',
    'Improve customer retention strategies',
    'Optimize product offerings for each segment',
    'Increase marketing ROI through precision targeting',
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-slate-dark to-pink-500/10"></div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 text-purple-400/30"
          )}
        />
        <Particles
          className="absolute inset-0"
          quantity={60}
          ease={70}
          color="#c084fc"
          refresh
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Customer Segmentation
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Unlock deeper customer insights with Naive Bayes and Decision Tree algorithms 
              that reveal distinct buyer personas and behavioral patterns.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <ScrollReveal delay={0.2}>
              <div className="glass rounded-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">How It Works</h2>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                  <p>
                    Our customer segmentation system combines two powerful algorithms:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Naive Bayes</h3>
                      <p>
                        A probabilistic classifier that categorizes customers based on their purchasing 
                        behavior, demographics, and engagement patterns. Ideal for predicting customer 
                        category membership.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Decision Tree</h3>
                      <p>
                        Creates a hierarchical model of customer characteristics, making it easy to 
                        understand the key factors that differentiate customer segments and make 
                        actionable business decisions.
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong className="text-white">Key Features Analyzed:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Purchase frequency and recency</li>
                    <li>Average order value</li>
                    <li>Product category preferences</li>
                    <li>Shopping behavior patterns</li>
                    <li>Customer lifetime value</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="glass rounded-xl p-6 sm:p-8 min-h-[280px]">
                <PieChart
                  data={[30, 25, 22, 15, 8]}
                  labels={['Premium', 'Regular', 'Occasional', 'First-time', 'Dormant']}
                  title="Customer Segments"
                  colors={['#A855F7', '#C084FC', '#E879F9', '#F0ABFC', '#FAE8FF']}
                />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="glass rounded-xl p-6 sm:p-8 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Real-World Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent-cyan flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="glass rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Dataset & Methodology</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                <p>
                  Using the <strong className="text-white">E-commerce Purchase History Dataset</strong>, 
                  our algorithms identify natural groupings in customer behavior patterns.
                </p>
                <p>
                  <strong className="text-white">Segmentation Process:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Collect and preprocess customer data</li>
                  <li>Extract relevant behavioral features</li>
                  <li>Apply Naive Bayes for probabilistic classification</li>
                  <li>Use Decision Trees for interpretable segment rules</li>
                  <li>Validate segments against business metrics</li>
                  <li>Generate actionable insights for each segment</li>
                </ol>
                <p>
                  The combination of both algorithms provides robust segmentation with clear, 
                  actionable insights that drive targeted marketing strategies.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
