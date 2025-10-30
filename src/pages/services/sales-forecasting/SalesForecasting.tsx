import ScrollReveal from '../../../components/ScrollReveal';
import { TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';

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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Sales Forecasting
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Predict future sales with confidence using advanced Linear Regression algorithms 
              powered by comprehensive e-commerce purchase history data.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ScrollReveal delay={0.2}>
            <div className="glass rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <div className="space-y-4 text-gray-300">
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
            <div className="glass rounded-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-32 h-32 mx-auto mb-4 text-accent-cyan" />
                <p className="text-gray-400">Sample Forecast Visualization</p>
                <p className="text-sm text-gray-500 mt-2">
                  Interactive charts show predicted vs. actual sales
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
    </div>
  );
}
