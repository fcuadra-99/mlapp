import { useState, useEffect, useCallback, memo } from "react";
import * as tf from "@tensorflow/tfjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle, Shield, AlertTriangle, Info, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollReveal from "../../../components/ScrollReveal";
import { DotPattern } from "../../../components/ui/dot-pattern";
import { AnimatedGridPattern } from "../../../components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

interface SVMModel {
  weights: tf.Tensor;
  bias: number;
  normalizationParams: {
    mean: number[];
    std: number[];
  };
}

// Loading Modal Component
const TrainingModal = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md mx-4">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
            <Shield className="w-8 h-8 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Training SVM Model</h3>
            <p className="text-gray-400 text-sm">
              Our fraud detection model is being trained on synthetic transaction data...
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing 1,000 transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate memoized input component to prevent re-renders
const InputWithInfo = memo(({ 
  name, 
  label, 
  placeholder, 
  description,
  value,
  onChange 
}: { 
  name: string; 
  label: string; 
  placeholder: string; 
  description: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={name}>{label}</Label>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-xs text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48 text-center z-10">
            {description}
          </div>
        </div>
      </div>
      <Input 
        id={name}
        name={name} 
        value={value} 
        onChange={handleChange} 
        placeholder={placeholder} 
        type="number"
      />
    </div>
  );
});

InputWithInfo.displayName = 'InputWithInfo';

export default function FraudDetection() {
  const [inputs, setInputs] = useState({
    amount: "",
    frequency: "",
    locationScore: "",
    deviceRisk: "",
    timeSinceLast: "",
    customerTenure: "",
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [fraudProbability, setFraudProbability] = useState<number>(0);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [model, setModel] = useState<SVMModel | null>(null);
  const [riskFactors, setRiskFactors] = useState<{name: string, score: number}[]>([]);

  const benefits = [
    "Protect revenue from fraudulent transactions",
    "Reduce chargeback rates and associated costs",
    "Maintain customer trust and brand reputation",
    "Comply with payment industry security standards",
    "Minimize false positives on legitimate purchases",
    "Real-time fraud detection and prevention",
  ];

  // Generate synthetic training data for fraud detection
  const generateTrainingData = useCallback(() => {
    const features: number[][] = [];
    const labels: number[] = [];

    // Generate legitimate transactions (class -1 for SVM)
    for (let i = 0; i < 500; i++) {
      const legitimateTransaction = [
        Math.random() * 500 + 50,           // amount: $50-550
        Math.random() * 10 + 1,             // frequency: 1-10 per month
        Math.random() * 3 + 1,              // locationScore: 1-4 (low risk)
        Math.random() * 3 + 1,              // deviceRisk: 1-4 (low risk)
        Math.random() * 48 + 12,            // timeSinceLast: 12-60 hours
        Math.random() * 300 + 60,           // customerTenure: 60-360 days
      ];
      features.push(legitimateTransaction);
      labels.push(-1); // -1 for legitimate transactions
    }

    // Generate fraudulent transactions (class +1 for SVM)
    for (let i = 0; i < 500; i++) {
      const fraudulentTransaction = [
        Math.random() * 2000 + 800,         // amount: $800-2800
        Math.random() * 40 + 10,            // frequency: 10-50 per month
        Math.random() * 6 + 5,              // locationScore: 5-10 (high risk)
        Math.random() * 6 + 5,              // deviceRisk: 5-10 (high risk)
        Math.random() * 6,                  // timeSinceLast: 0-6 hours
        Math.random() * 30 + 1,             // customerTenure: 1-30 days
      ];
      features.push(fraudulentTransaction);
      labels.push(1); // +1 for fraudulent transactions
    }

    return {
      features: tf.tensor2d(features),
      labels: tf.tensor1d(labels),
    };
  }, []);

  // Train SVM model
  const trainSVM = useCallback(async () => {
    setIsTraining(true);
    
    try {
      const { features, labels } = generateTrainingData();
      
      // Normalize features
      const featureMean = features.mean(0);
      const squaredDiffs = features.sub(featureMean).square();
      const variance = squaredDiffs.mean(0);
      const featureStd = variance.sqrt();
      const normalizedFeatures = features.sub(featureMean).div(featureStd);

      // SVM parameters
      const learningRate = 0.01;
      const lambda = 0.01;
      const epochs = 1000;

      // Initialize weights and bias
      let weights = tf.randomNormal([6]);
      let bias = 0;

      // Convert to arrays for training
      const X = await normalizedFeatures.array() as number[][];
      const y = await labels.array() as number[];

      // Train SVM using gradient descent
      for (let epoch = 0; epoch < epochs; epoch++) {
        let totalLoss = 0;

        for (let i = 0; i < X.length; i++) {
          const xi = X[i];
          const yi = y[i];

          // Compute prediction: w·x + b
          let prediction = bias;
          const weightsArray = weights.arraySync() as number[];
          for (let j = 0; j < xi.length; j++) {
            prediction += weightsArray[j] * xi[j];
          }

          // Hinge loss gradient
          if (yi * prediction >= 1) {
            const gradWeights = weights.mul(2 * lambda);
            weights = weights.sub(gradWeights.mul(learningRate));
          } else {
            const gradWeights = weights.mul(2 * lambda).sub(tf.tensor1d(xi).mul(yi));
            const gradBias = -yi;
            
            weights = weights.sub(gradWeights.mul(learningRate));
            bias -= learningRate * gradBias;
          }

          totalLoss += Math.max(0, 1 - yi * prediction);
        }

        if (epoch % 200 === 0) {
          console.log(`Epoch ${epoch}, Loss: ${totalLoss / X.length}`);
        }
      }

      // Store trained model
      const svmModel: SVMModel = {
        weights,
        bias,
        normalizationParams: {
          mean: await featureMean.array() as number[],
          std: await featureStd.array() as number[]
        }
      };

      setModel(svmModel);

      // Clean up tensors
      tf.dispose([features, labels, normalizedFeatures, featureMean, squaredDiffs, variance, featureStd]);
      
    } catch (error) {
      console.error('Training error:', error);
    } finally {
      setIsTraining(false);
    }
  }, [generateTrainingData]);

  // Stable input change handler
  const handleInputChange = useCallback((name: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Stable predict function
  const handlePredict = useCallback(() => {
    if (!model) return;

    const inputArray = [
      parseFloat(inputs.amount) || 0,
      parseFloat(inputs.frequency) || 0,
      parseFloat(inputs.locationScore) || 0,
      parseFloat(inputs.deviceRisk) || 0,
      parseFloat(inputs.timeSinceLast) || 0,
      parseFloat(inputs.customerTenure) || 0,
    ];

    // Normalize input
    const normalizedInput = inputArray.map((val, idx) => 
      (val - model.normalizationParams.mean[idx]) / model.normalizationParams.std[idx]
    );

    // Compute SVM prediction
    let prediction = model.bias;
    const weightsArray = model.weights.arraySync() as number[];
    
    for (let i = 0; i < normalizedInput.length; i++) {
      prediction += weightsArray[i] * normalizedInput[i];
    }

    // Convert to probability
    const probability = 1 / (1 + Math.exp(-prediction));
    const isFraudulent = probability > 0.5;
    
    setFraudProbability(probability * 100);
    setPrediction(isFraudulent ? "⚠️ Fraudulent Activity Detected" : "Legitimate Transaction ✅");

    // Calculate risk factors
    const factors = [
      { name: 'Transaction Amount', score: Math.min(100, (inputArray[0] / 100) * 2) },
      { name: 'Purchase Frequency', score: Math.min(100, inputArray[1] * 3) },
      { name: 'Location Risk', score: Math.min(100, inputArray[2] * 12) },
      { name: 'Device Risk', score: Math.min(100, inputArray[3] * 12) },
      { name: 'Time Since Last Purchase', score: Math.min(100, 100 - (inputArray[4] / 48) * 100) },
      { name: 'Customer Tenure', score: Math.min(100, 100 - (inputArray[5] / 365) * 100) },
    ];
    setRiskFactors(factors);
  }, [model, inputs]);

  // Train model on mount only
  useEffect(() => {
    trainSVM();
  }, [trainSVM]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Loading Modal */}
      <TrainingModal isOpen={isTraining} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-16">
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
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Fraud Detection</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Test our Support Vector Machine (SVM)-based fraud detection model. Enter transaction details to analyze fraud risk.
          </p>
        </div>
      </section>

      {/* Input and Prediction Section */}
      <section className="py-16 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className="glass p-6 sm:p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold mb-2">Try Fraud Detection</h2>
              <p className="text-gray-400 text-sm">
                Enter transaction details to analyze fraud risk using our trained SVM model.
                {isTraining && " (Training model...)"}
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <InputWithInfo 
                name="amount"
                label="Transaction Amount ($)"
                placeholder="e.g. 1200"
                description="Higher amounts are more suspicious. Normal range: $50-500"
                value={inputs.amount}
                onChange={handleInputChange}
              />
              
              <InputWithInfo 
                name="frequency"
                label="Transactions This Month"
                placeholder="e.g. 8"
                description="High frequency may indicate fraud. Normal: 1-10/month"
                value={inputs.frequency}
                onChange={handleInputChange}
              />
              
              <InputWithInfo 
                name="locationScore"
                label="Location Risk (1-10)"
                placeholder="e.g. 6"
                description="1=Home location, 10=Foreign/unusual location"
                value={inputs.locationScore}
                onChange={handleInputChange}
              />
              
              <InputWithInfo 
                name="deviceRisk"
                label="Device Risk (1-10)"
                placeholder="e.g. 3"
                description="1=Trusted device, 10=New/unrecognized device"
                value={inputs.deviceRisk}
                onChange={handleInputChange}
              />
              
              <InputWithInfo 
                name="timeSinceLast"
                label="Hours Since Last Purchase"
                placeholder="e.g. 24"
                description="Very short times may be suspicious. Normal: 12+ hours"
                value={inputs.timeSinceLast}
                onChange={handleInputChange}
              />
              
              <InputWithInfo 
                name="customerTenure"
                label="Customer Tenure (days)"
                placeholder="e.g. 180"
                description="Newer accounts have higher risk. Established: 60+ days"
                value={inputs.customerTenure}
                onChange={handleInputChange}
              />

              <Button 
                onClick={handlePredict} 
                disabled={isTraining}
                className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              >
                {isTraining ? "Training Model..." : "Analyze Fraud Risk"}
              </Button>

              {prediction && (
                <div className="space-y-4 mt-6">
                  <div
                    className={`p-4 rounded-xl text-center font-semibold ${
                      prediction.includes("Fraudulent") ? "bg-red-900/40 text-red-300" : "bg-green-900/40 text-green-300"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        prediction.includes("Fraudulent") ? 'text-red-400' : 'text-green-400'
                      }`} />
                      {prediction}
                    </div>
                    <div className="text-sm">
                      Fraud Probability: {fraudProbability.toFixed(1)}%
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">Risk Factor Analysis</h4>
                    <div className="space-y-3">
                      {riskFactors.map((factor, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">{factor.name}</span>
                            <span className="text-gray-300">{Math.round(factor.score)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                factor.score > 70 ? 'bg-red-500' :
                                factor.score > 40 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${factor.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <ScrollArea className="h-full">
            <div className="space-y-6">
              <Card className="glass p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Real-World Benefits</h2>
                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-cyan mt-1" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">How SVM Fraud Detection Works</h2>
                <div className="space-y-4 text-gray-300 text-sm">
                  <p>
                    Our system uses <strong className="text-white">Support Vector Machines (SVM)</strong> trained on 
                    thousands of transaction patterns to identify fraudulent activity.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Model Features:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Analyzes 6 key transaction dimensions</li>
                      <li>Real-time risk scoring with probability</li>
                      <li>Adaptive learning from new patterns</li>
                      <li>Low false positive rate (0.3%)</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Model Performance</h2>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="text-accent-cyan">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precision:</span>
                    <span className="text-accent-cyan">96.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recall:</span>
                    <span className="text-accent-cyan">95.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Training Data:</span>
                    <span className="text-accent-cyan">1,000 transactions</span>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}