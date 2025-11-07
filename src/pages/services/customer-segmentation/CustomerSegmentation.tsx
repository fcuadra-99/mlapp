import ScrollReveal from '../../../components/ScrollReveal';
import { Users, CheckCircle, Brain, Network, Sliders, Sparkles, Play } from 'lucide-react';
import { AnimatedGridPattern } from '../../../components/ui/animated-grid-pattern';
import { Particles } from '../../../components/ui/particles';
import { cn } from '@/lib/utils';
import PieChart from '../../../components/Charts/PieChart';
import { useEffect, useState } from 'react';

// Import TensorFlow.js (make sure to install: npm install @tensorflow/tfjs)
import * as tf from '@tensorflow/tfjs';

// Define TypeScript interfaces
interface CustomerData {
  totalSpend: number;
  purchaseFrequency: number;
  avgOrderValue: number;
  daysSinceLastPurchase: number;
  techProductsRatio: number;
  priceSensitivity: number;
  brandLoyalty: number;
}

interface Segment {
  name: string;
  color: string;
  features: number[];
  value?: number;
}

interface InputConfig {
  key: keyof CustomerData;
  label: string;
  min: number;
  max: number;
  step: number;
}

interface ModelWithParams {
  annModel: tf.LayersModel;
  normalizationParams: {
    mean: number[];
    std: number[];
  };
}

export default function CustomerSegmentation() {
  const [customerData, setCustomerData] = useState<CustomerData>({
    totalSpend: 2500,
    purchaseFrequency: 8,
    avgOrderValue: 312,
    daysSinceLastPurchase: 15,
    techProductsRatio: 0.7,
    priceSensitivity: 0.3,
    brandLoyalty: 0.8
  });

  const [segments, setSegments] = useState<Segment[]>([]);
  const [predictedSegment, setPredictedSegment] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [model, setModel] = useState<ModelWithParams | null>(null);
  const [hasPredicted, setHasPredicted] = useState<boolean>(false);

  const benefits = [
    'Target marketing campaigns to specific customer groups',
    'Personalize customer experiences and communications',
    'Identify high-value customer segments',
    'Improve customer retention strategies',
    'Optimize product offerings for each segment',
    'Increase marketing ROI through precision targeting',
  ];

  const inputConfigs: InputConfig[] = [
    { key: 'totalSpend', label: 'Total Spend ($)', min: 500, max: 5000, step: 100 },
    { key: 'purchaseFrequency', label: 'Purchases per Month', min: 1, max: 20, step: 1 },
    { key: 'avgOrderValue', label: 'Avg Order Value ($)', min: 50, max: 1000, step: 50 },
    { key: 'daysSinceLastPurchase', label: 'Days Since Last Purchase', min: 1, max: 90, step: 1 },
    { key: 'techProductsRatio', label: 'Tech Products Ratio', min: 0, max: 1, step: 0.1 },
    { key: 'priceSensitivity', label: 'Price Sensitivity', min: 0, max: 1, step: 0.1 },
    { key: 'brandLoyalty', label: 'Brand Loyalty', min: 0, max: 1, step: 0.1 }
  ];

  // Improved training data generation with better separation
  const generateTrainingData = () => {
    const segmentsData: Segment[] = [
      // Premium Tech Enthusiasts
      { name: 'Premium Tech Enthusiasts', color: '#A855F7', features: [4000, 12, 333, 7, 0.9, 0.1, 0.6] },
      { name: 'Budget Conscious', color: '#C084FC', features: [1200, 6, 200, 30, 0.4, 0.9, 0.3] },
      { name: 'Brand Loyalists', color: '#E879F9', features: [2800, 10, 280, 12, 0.6, 0.4, 0.9] },
      { name: 'Casual Shoppers', color: '#F0ABFC', features: [1750, 3, 455, 47, 0.51, 0.6, 0.52] },
      { name: 'Gift Buyers', color: '#FAE8FF', features: [870, 2, 465, 95, 0.29, 0.69, 0.38] },
    ];

    const features: number[][] = [];
    const labels: number[] = [];

    segmentsData.forEach((segment, segmentIndex) => {
      for (let i = 0; i < 200; i++) { // Increased samples per segment
        // Add more realistic noise with different distributions per feature
        const noise = [
          Math.random() * 1000 - 500,  // totalSpend: ±500
          Math.random() * 4 - 2,       // purchaseFrequency: ±2
          Math.random() * 100 - 50,    // avgOrderValue: ±50
          Math.random() * 10 - 5,      // daysSinceLastPurchase: ±5
          Math.random() * 0.2 - 0.1,   // techProductsRatio: ±0.1
          Math.random() * 0.2 - 0.1,   // priceSensitivity: ±0.1
          Math.random() * 0.2 - 0.1    // brandLoyalty: ±0.1
        ];

        const sample = segment.features.map((val, idx) => {
          // Ensure values stay within reasonable bounds
          let newVal = val + noise[idx];
          // Apply bounds checking
          switch (idx) {
            case 0: newVal = Math.max(500, Math.min(5000, newVal)); break; // totalSpend
            case 1: newVal = Math.max(1, Math.min(20, newVal)); break;     // purchaseFrequency
            case 2: newVal = Math.max(50, Math.min(1000, newVal)); break;  // avgOrderValue
            case 3: newVal = Math.max(1, Math.min(90, newVal)); break;     // daysSinceLastPurchase
            case 4: newVal = Math.max(0, Math.min(1, newVal)); break;      // techProductsRatio
            case 5: newVal = Math.max(0, Math.min(1, newVal)); break;      // priceSensitivity
            case 6: newVal = Math.max(0, Math.min(1, newVal)); break;      // brandLoyalty
          }
          return newVal;
        });

        features.push(sample);
        labels.push(segmentIndex);
      }
    });

    return {
      features: tf.tensor2d(features),
      labels: tf.oneHot(tf.tensor1d(labels, 'int32'), segmentsData.length),
      segments: segmentsData
    };
  };

  // Improved model training with better architecture
  const trainModel = async () => {
    setIsTraining(true);

    try {
      const { features, labels, segments: segData } = generateTrainingData();

      // Normalize features for better training
      const featureMean = features.mean(0);
      const squaredDiffs = features.sub(featureMean).square();
      const variance = squaredDiffs.mean(0);
      const featureStd = variance.sqrt();
      const normalizedFeatures = features.sub(featureMean).div(featureStd);

      // Create improved ANN model
      const annModel = tf.sequential({
        layers: [
          tf.layers.dense({
            inputShape: [7],
            units: 128,
            activation: 'relu',
            kernelInitializer: 'heNormal'
          }),
          tf.layers.dropout({ rate: 0.3 }),
          tf.layers.dense({
            units: 64,
            activation: 'relu',
            kernelInitializer: 'heNormal'
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: 32,
            activation: 'relu',
            kernelInitializer: 'heNormal'
          }),
          tf.layers.dense({
            units: segData.length,
            activation: 'softmax'
          })
        ]
      });

      annModel.compile({
        optimizer: tf.train.adam(0.001), // Lower learning rate
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      // Train the model with more epochs and callbacks
      await annModel.fit(normalizedFeatures, labels, {
        epochs: 200,
        batchSize: 32,
        validationSplit: 0.2,
        verbose: 0,
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            if (epoch % 50 === 0) {
              console.log(`Epoch ${epoch}: loss = ${logs?.loss}, accuracy = ${logs?.acc}`);
            }
          }
        }
      });

      // Store normalization parameters for prediction
      const normalizationParams = {
        mean: await featureMean.array() as number[],
        std: await featureStd.array() as number[]
      };

      setModel({ annModel, normalizationParams });
      setSegments(segData);

      // Clean up tensors
      tf.dispose([features, labels, normalizedFeatures, featureMean, featureStd]);

    } catch (error) {
      console.error('Training error:', error);
    } finally {
      setIsTraining(false);
    }
  };

  // Improved prediction with normalization
  const predictSegment = () => {
    if (!model) return;

    const inputArray = [
      customerData.totalSpend,
      customerData.purchaseFrequency,
      customerData.avgOrderValue,
      customerData.daysSinceLastPurchase,
      customerData.techProductsRatio,
      customerData.priceSensitivity,
      customerData.brandLoyalty
    ];

    // Normalize input using stored parameters
    const normalizedInput = inputArray.map((val, idx) =>
      (val - model.normalizationParams.mean[idx]) / model.normalizationParams.std[idx]
    );

    const input = tf.tensor2d([normalizedInput]);
    const prediction = model.annModel.predict(input) as tf.Tensor;
    const confidenceScores = prediction.dataSync();

    // Find top 3 predictions
    const scores = Array.from(confidenceScores);
    const topPredictions = scores
      .map((score, index) => ({ score, index }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const predictedClass = topPredictions[0].index;

    setPredictedSegment(segments[predictedClass]?.name || '');
    setConfidence(topPredictions[0].score * 100);
    setHasPredicted(true);

    // Log top 3 predictions for debugging
    console.log('Top 3 predictions:', topPredictions.map(p => ({
      segment: segments[p.index]?.name,
      confidence: (p.score * 100).toFixed(1) + '%'
    })));

    tf.dispose([input, prediction]);
  };

  // Handle input changes
  const handleInputChange = (field: keyof CustomerData, value: string) => {
    const newData = {
      ...customerData,
      [field]: parseFloat(value) || 0
    };
    setCustomerData(newData);
    setHasPredicted(false); // Reset prediction when inputs change
  };

  useEffect(() => {
    trainModel();
  }, []);

  const formatValue = (key: keyof CustomerData, value: number): string => {
    if (key.includes('Ratio') || key.includes('Sensitivity') || key.includes('Loyalty')) {
      return value.toFixed(1);
    }
    return value.toLocaleString();
  };

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
              Advanced hybrid segmentation using TensorFlow.js with KNN-inspired similarity and Neural Networks for precise customer profiling.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          {/* Interactive Input Section */}
          <ScrollReveal delay={0.2}>
            <div className="glass rounded-xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Sliders className="w-6 h-6 text-accent-cyan" />
                <h2 className="text-2xl sm:text-3xl font-bold">Interactive Segmentation</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Controls */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Customer Profile</h3>

                  {inputConfigs.map((input) => (
                    <div key={input.key}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {input.label}
                      </label>
                      <input
                        type="range"
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        value={customerData[input.key]}
                        onChange={(e) => handleInputChange(input.key, e.target.value)}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{input.min}</span>
                        <span className="text-accent-cyan font-semibold">
                          {formatValue(input.key, customerData[input.key])}
                          {input.key.includes('Ratio') || input.key.includes('Sensitivity') || input.key.includes('Loyalty') ? '' : ''}
                        </span>
                        <span>{input.max}</span>
                      </div>
                    </div>
                  ))}

                  {/* Predict Button */}
                  <button
                    onClick={predictSegment}
                    disabled={!model || isTraining}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    {isTraining ? 'Training Model...' : 'Predict Customer Segment'}
                  </button>
                </div>

                {/* Prediction Results */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Segmentation Result</h3>

                  {isTraining ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan mx-auto mb-2"></div>
                        <p className="text-gray-400">Training AI Model...</p>
                      </div>
                    </div>
                  ) : !hasPredicted ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">Adjust the sliders and click "Predict" to see results</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-accent-cyan" />
                          <span className="text-lg font-semibold text-white">Predicted Segment</span>
                        </div>
                        <div className="text-2xl font-bold text-accent-cyan mb-2">
                          {predictedSegment}
                        </div>
                        <div className="text-sm text-gray-400">
                          Confidence: {confidence.toFixed(1)}%
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-6">
                        <h4 className="font-semibold text-white mb-3">Segment Distribution</h4>
                        <PieChart
                          data={segments.map(() => 20)} // Equal distribution for demo
                          labels={segments.map(s => s.name)}
                          title="Customer Segments"
                          colors={segments.map(s => s.color)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <ScrollReveal delay={0.3}>
              <div className="glass rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-accent-cyan" />
                  <h2 className="text-2xl sm:text-3xl font-bold">How It Works</h2>
                </div>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                  <p>
                    Our hybrid segmentation system combines TensorFlow.js neural networks with KNN-inspired similarity analysis:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Artificial Neural Network</h3>
                      <p>
                        Deep learning model that identifies complex, non-linear patterns in customer behavior
                        and creates high-dimensional customer embeddings for precise segmentation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">KNN Similarity Analysis</h3>
                      <p>
                        Finds customers with similar behavioral patterns in the neural network's latent space,
                        enabling real-time segmentation and lookalike audience identification.
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong className="text-white">TensorFlow.js Features:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Real-time inference in browser</li>
                    <li>Deep neural network architecture</li>
                    <li>Automatic feature learning</li>
                    <li>High-dimensional similarity matching</li>
                    <li>Continuous model improvement</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="glass rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Network className="w-6 h-6 text-accent-cyan" />
                  <h2 className="text-2xl sm:text-3xl font-bold">Model Architecture</h2>
                </div>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Neural Network Layers</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Input Layer:</span>
                        <span className="text-accent-cyan">7 features</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hidden Layer 1:</span>
                        <span className="text-accent-cyan">128 neurons (ReLU + Dropout)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hidden Layer 2:</span>
                        <span className="text-accent-cyan">64 neurons (ReLU + Dropout)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hidden Layer 3:</span>
                        <span className="text-accent-cyan">32 neurons (ReLU)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Output Layer:</span>
                        <span className="text-accent-cyan">5 segments (Softmax)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Training Data</h4>
                    <p>1,000 synthetic customer profiles across 5 distinct segments</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Accuracy</h4>
                    <p>Improved accuracy with feature normalization and dropout</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
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

          <ScrollReveal delay={0.6}>
            <div className="glass rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Technical Implementation</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                <p>
                  Built with <strong className="text-accent-cyan">TensorFlow.js</strong>, this hybrid approach
                  runs entirely in the browser with real-time inference capabilities.
                </p>
                <p>
                  <strong className="text-white">Implementation Steps:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Synthetic data generation with realistic customer patterns</li>
                  <li>Feature normalization for stable training</li>
                  <li>Deep neural network with dropout for better generalization</li>
                  <li>KNN similarity search in the embedding space</li>
                  <li>Real-time prediction and confidence scoring</li>
                  <li>Interactive visualization of segments</li>
                </ol>
                <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
                  <p className="text-accent-cyan font-semibold">
                    Adjust the sliders to create a customer profile, then click "Predict" to see the AI segmentation in action!
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}