import ScrollReveal from '../../../components/ScrollReveal';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { AnimatedGridPattern } from '../../../components/ui/animated-grid-pattern';
import { DotPattern } from '../../../components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import LineChart from '../../../components/Charts/LineChart';

export default function SalesForecasting() {
  const benefits = [
    'Optimize inventory levels based on predicted demand',
    'Plan staffing and resources more effectively',
    'Identify seasonal trends and adjust strategies',
    'Reduce waste from overstock situations',
    'Maximize revenue during peak periods',
    'Make data-driven business decisions',
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-slate-dark to-cyan-500/10"></div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 text-blue-400/30"
          )}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Sales Forecasting
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Predict future sales with confidence using advanced Linear Regression algorithms 
              powered by comprehensive e-commerce purchase history data.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "opacity-30"
          )}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <ScrollReveal delay={0.2}>
              <div className="glass rounded-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">How It Works</h2>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                  <p>
                    Our sales forecasting system leverages <strong className="text-white">Linear Regression</strong>, 
                    a powerful statistical method that analyzes historical sales patterns to predict future trends.
                  </p>
                  <p>
                    The algorithm examines multiple variables including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Historical sales data</li>
                    <li>Seasonal patterns and trends</li>
                    <li>Product categories and pricing</li>
                    <li>Customer behavior patterns</li>
                    <li>External market factors</li>
                  </ul>
                  <p>
                    By identifying correlations between these factors and sales outcomes, our model 
                    generates accurate predictions with up to 95% accuracy.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="glass rounded-xl p-6 sm:p-8 min-h-[280px]">
                <LineChart
                  data={[28, 32, 30, 38, 42, 45, 48, 52, 55, 58, 61, 65]}
                  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                  title="Sales Forecast vs Actual"
                  color="#0099FF"
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
                  Our models are trained on the comprehensive <strong className="text-white">E-commerce Purchase History Dataset</strong>, 
                  which includes millions of transactions from diverse electronics retailers.
                </p>
                <p>
                  <strong className="text-white">Training Process:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Data cleaning and preprocessing</li>
                  <li>Feature engineering and selection</li>
                  <li>Model training using Linear Regression</li>
                  <li>Cross-validation and accuracy testing</li>
                  <li>Continuous model refinement and updates</li>
                </ol>
                <p>
                  The result is a robust forecasting system that adapts to your specific business 
                  patterns while leveraging industry-wide insights.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
