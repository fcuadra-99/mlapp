import ScrollReveal from '../../../components/ScrollReveal';
import { ShoppingBag, CheckCircle, BarChart3 } from 'lucide-react';

export default function ProductRecommendation() {
  const benefits = [
    'Increase average order value through smart upselling',
    'Improve customer satisfaction with personalized suggestions',
    'Drive cross-sell opportunities automatically',
    'Reduce cart abandonment with relevant recommendations',
    'Boost conversion rates across your product catalog',
    'Create personalized shopping experiences at scale',
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-6">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Product Recommendation
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Drive sales with intelligent product recommendations powered by K-Nearest Neighbors (KNN) 
              and Artificial Neural Networks (ANN) for personalized customer experiences.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ScrollReveal delay={0.2}>
            <div className="glass rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Our recommendation engine combines two advanced machine learning approaches:
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">K-Nearest Neighbors (KNN)</h3>
                    <p>
                      Identifies similar customers based on purchase history and browsing behavior, 
                      then recommends products that similar customers have purchased. This collaborative 
                      filtering approach excels at finding unexpected but relevant product connections.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Artificial Neural Networks (ANN)</h3>
                    <p>
                      Deep learning models that understand complex patterns in customer preferences and 
                      product relationships. ANNs can capture non-linear relationships and provide highly 
                      accurate personalized recommendations.
                    </p>
                  </div>
                </div>
                <p>
                  <strong className="text-white">Recommendation Factors:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Purchase history and patterns</li>
                  <li>Browsing behavior and interests</li>
                  <li>Similar customer preferences</li>
                  <li>Product relationships and bundles</li>
                  <li>Seasonal and trending items</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="glass rounded-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-32 h-32 mx-auto mb-4 text-accent-cyan" />
                <p className="text-gray-400">Recommendation Accuracy</p>
                <p className="text-sm text-gray-500 mt-2">
                  Performance metrics and A/B test results
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
                Trained on the extensive <strong className="text-white">E-commerce Purchase History Dataset</strong>, 
                our recommendation models learn from millions of customer interactions.
              </p>
              <p>
                <strong className="text-white">Implementation Process:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Build customer-product interaction matrix</li>
                <li>Train KNN model for collaborative filtering</li>
                <li>Develop ANN architecture for deep personalization</li>
                <li>Combine predictions using ensemble methods</li>
                <li>A/B test recommendations against baselines</li>
                <li>Continuously refine based on user feedback</li>
              </ol>
              <p>
                Our hybrid approach achieves a 35% increase in average order value compared to 
                traditional recommendation systems, while maintaining high customer satisfaction scores.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
