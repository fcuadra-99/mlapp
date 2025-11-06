import ScrollReveal from '../../../components/ScrollReveal';
import { Shield, CheckCircle } from 'lucide-react';
import { AnimatedGridPattern } from '../../../components/ui/animated-grid-pattern';
import { DotPattern } from '../../../components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import BarChart from '../../../components/Charts/BarChart';

export default function FraudDetection() {
  const benefits = [
    'Protect revenue from fraudulent transactions',
    'Reduce chargeback rates and associated costs',
    'Maintain customer trust and brand reputation',
    'Comply with payment industry security standards',
    'Minimize false positives on legitimate purchases',
    'Real-time fraud detection and prevention',
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-slate-dark to-orange-500/10"></div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 text-red-400/30"
          )}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-6">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Fraud Detection
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Safeguard your business with advanced Support Vector Machine (SVM) algorithms 
              that detect and prevent fraudulent transactions in real-time.
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
                    Our fraud detection system uses <strong className="text-white">Support Vector Machines (SVM)</strong>, 
                    a powerful machine learning algorithm that excels at classification tasks.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">SVM Classification</h3>
                      <p>
                        SVMs create optimal boundaries between legitimate and fraudulent transactions 
                        by analyzing patterns in transaction data. The algorithm handles complex, 
                        high-dimensional data and adapts to evolving fraud patterns.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Real-Time Analysis</h3>
                      <p>
                        Every transaction is analyzed in milliseconds, checking hundreds of features 
                        to identify suspicious patterns while maintaining a seamless customer experience.
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong className="text-white">Fraud Indicators Analyzed:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Transaction amount and frequency patterns</li>
                    <li>Location and device anomalies</li>
                    <li>Customer behavior deviations</li>
                    <li>Payment method characteristics</li>
                    <li>Time-based patterns and velocity</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="glass rounded-xl p-6 sm:p-8 min-h-[280px]">
                <BarChart
                  data={[2, 5, 3, 8, 4, 6, 3]}
                  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                  title="Fraud Attempts Blocked"
                  color="#EF4444"
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
                  Trained on the <strong className="text-white">E-commerce Purchase History Dataset</strong> 
                  with additional fraud labels, our SVM models learn to distinguish legitimate transactions 
                  from fraudulent ones.
                </p>
                <p>
                  <strong className="text-white">Detection Process:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Collect and label historical transaction data</li>
                  <li>Extract relevant fraud indicators and features</li>
                  <li>Train SVM model with optimal kernel selection</li>
                  <li>Tune decision threshold to balance precision/recall</li>
                  <li>Deploy model for real-time transaction scoring</li>
                  <li>Continuously update with new fraud patterns</li>
                </ol>
                <p>
                  Our system achieves 99.5% accuracy in fraud detection while maintaining a false 
                  positive rate below 0.1%, ensuring that legitimate customers aren't unnecessarily 
                  blocked while effectively stopping fraudulent transactions.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
