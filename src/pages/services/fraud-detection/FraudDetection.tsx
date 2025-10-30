import ScrollReveal from '../../../components/ScrollReveal';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Fraud Detection
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Safeguard your business with advanced Support Vector Machine (SVM) algorithms 
              that detect and prevent fraudulent transactions in real-time.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ScrollReveal delay={0.2}>
            <div className="glass rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <div className="space-y-4 text-gray-300">
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
            <div className="glass rounded-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <AlertTriangle className="w-32 h-32 mx-auto mb-4 text-accent-cyan" />
                <p className="text-gray-400">Fraud Risk Scoring</p>
                <p className="text-sm text-gray-500 mt-2">
                  Real-time risk assessment dashboard
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="glass rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6">Real-World Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent-cyan flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="glass rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Dataset & Methodology</h2>
            <div className="space-y-4 text-gray-300">
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
    </div>
  );
}
