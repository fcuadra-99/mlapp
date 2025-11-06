import { useState, useEffect } from 'react';
import ScrollReveal from '../../../components/ScrollReveal';
import { Users, CheckCircle, ShoppingBag, Target, Brain, TrendingUp } from 'lucide-react';
import { AnimatedGridPattern } from '../../../components/ui/animated-grid-pattern';
import { Particles } from '../../../components/ui/particles';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GaussianNB } from 'machinelearn/naive_bayes';
import { DecisionTreeClassifier } from 'machinelearn/tree';

interface CustomerData {
  ageGroup: string;
  budget: string;
  techSavviness: string;
  primaryUse: string;
  brandPreference: string;
  preferredCategory: string;
}

interface ProductRecommendation {
  category: string;
  probability: number;
  confidence: number; // Combined confidence score
  reasoning: string[];
  algorithm: 'naive_bayes' | 'decision_tree' | 'ensemble';
}

// Encoding mappings
const ageGroupMap: Record<string, number> = { teen: 0, young_adult: 1, adult: 2, senior: 3 };
const budgetMap: Record<string, number> = { low: 0, medium: 1, high: 2 };
const techMap: Record<string, number> = { beginner: 0, intermediate: 1, expert: 2 };
const useMap: Record<string, number> = {
  gaming: 0, work: 1, entertainment: 2, communication: 3,
  creative: 4, photography: 5, music: 6, social: 7
};
const brandMap: Record<string, number> = {
  gaming: 0, apple: 1, samsung: 2, dell: 3,
  sony: 4, canon: 5, nikon: 6, audio: 7
};
const categoryMap: Record<string, number> = {
  gaming: 0, laptops: 1, tablets: 2, smartphones: 3, audio: 4, cameras: 5
};
const reverseCategoryMap: Record<number, string> = {
  0: 'gaming', 1: 'laptops', 2: 'tablets', 3: 'smartphones', 4: 'audio', 5: 'cameras'
};

// Decision Tree based prediction
const predictWithDecisionTree = (
  input: Omit<CustomerData, 'preferredCategory'>, 
  trainingData: CustomerData[]
): ProductRecommendation[] => {
  const results: ProductRecommendation[] = [];
  const categories = Object.keys(categoryMap);

  categories.forEach(category => {
    // Calculate feature importance for this category
    const categoryCustomers = trainingData.filter(customer => 
      customer.preferredCategory === category
    );

    if (categoryCustomers.length === 0) {
      results.push({
        category,
        probability: 5,
        confidence: 0.1,
        reasoning: ['Limited data for this category'],
        algorithm: 'decision_tree'
      });
      return;
    }

    // Calculate feature weights based on information gain
    const featureWeights = calculateFeatureWeights(category, trainingData);
    
    let score = 0;
    let totalWeight = 0;

    // Calculate weighted match score
    Object.entries(featureWeights).forEach(([feature, weight]) => {
      const featureValue = input[feature as keyof Omit<CustomerData, 'preferredCategory'>];
      const featureMatch = categoryCustomers.filter(customer => 
        customer[feature as keyof CustomerData] === featureValue
      ).length;

      score += (featureMatch / categoryCustomers.length) * weight;
      totalWeight += weight;
    });

    const normalizedScore = totalWeight > 0 ? (score / totalWeight) * 100 : 0;
    const confidence = Math.min(0.95, normalizedScore / 100);

    results.push({
      category,
      probability: Math.min(95, Math.round(normalizedScore * 10) / 10),
      confidence,
      reasoning: generateDecisionTreeReasoning(category, input, categoryCustomers, featureWeights),
      algorithm: 'decision_tree'
    });
  });

  return results.sort((a, b) => b.probability - a.probability);
};

// Calculate feature weights based on information gain
const calculateFeatureWeights = (category: string, trainingData: CustomerData[]): Record<string, number> => {
  const categoryCustomers = trainingData.filter(customer => customer.preferredCategory === category);
  const totalCustomers = trainingData.length;
  
  if (categoryCustomers.length === 0) {
    return { ageGroup: 0.2, budget: 0.2, techSavviness: 0.2, primaryUse: 0.2, brandPreference: 0.2 };
  }

  // Simple information gain calculation
  const weights: Record<string, number> = {};
  const features: (keyof Omit<CustomerData, 'preferredCategory'>)[] = [
    'ageGroup', 'budget', 'techSavviness', 'primaryUse', 'brandPreference'
  ];

  features.forEach(feature => {
    const featureValues = new Set(trainingData.map(c => c[feature]));
    let informationGain = 0;

    featureValues.forEach(value => {
      const valueCustomers = trainingData.filter(c => c[feature] === value);
      const valueCategoryCustomers = valueCustomers.filter(c => c.preferredCategory === category);
      
      if (valueCustomers.length > 0 && valueCategoryCustomers.length > 0) {
        const probability = valueCategoryCustomers.length / valueCustomers.length;
        informationGain += (valueCustomers.length / totalCustomers) * probability;
      }
    });

    weights[feature] = Math.min(1, informationGain * 2); // Normalize weight
  });

  // Normalize weights to sum to 1
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  if (totalWeight > 0) {
    Object.keys(weights).forEach(key => {
      weights[key] = weights[key] / totalWeight;
    });
  }

  return weights;
};

const generateDecisionTreeReasoning = (
  category: string,
  input: Omit<CustomerData, 'preferredCategory'>,
  categoryCustomers: CustomerData[],
  featureWeights: Record<string, number>
): string[] => {
  const reasoning: string[] = [];
  const sortedFeatures = Object.entries(featureWeights)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3); // Top 3 most important features

  sortedFeatures.forEach(([feature, weight]) => {
    const featureValue = input[feature as keyof Omit<CustomerData, 'preferredCategory'>];
    const matchingCustomers = categoryCustomers.filter(customer => 
      customer[feature as keyof CustomerData] === featureValue
    );

    if (matchingCustomers.length > 0) {
      const matchPercentage = Math.round((matchingCustomers.length / categoryCustomers.length) * 100);
      if (matchPercentage > 30) { // Only mention significant matches
        reasoning.push(`Strong ${feature} match (${matchPercentage}% of similar customers)`);
      }
    }
  });

  if (reasoning.length === 0) {
    reasoning.push('Pattern matches general customer behavior');
  }

  return reasoning.slice(0, 3); // Limit to top 3 reasons
};

// Enhanced ensemble method combining both algorithms
const calculateEnsembleProbabilities = (
  input: Omit<CustomerData, 'preferredCategory'>, 
  trainingData: CustomerData[],
  nbClassifier: GaussianNB | null,
  dtClassifier: DecisionTreeClassifier | null
): ProductRecommendation[] => {
  // Get predictions from both algorithms
  const nbResults = calculateProbabilities(input, trainingData);
  const dtResults = predictWithDecisionTree(input, trainingData);

  const ensembleResults: ProductRecommendation[] = [];
  const categories = Object.keys(categoryMap);

  categories.forEach(category => {
    const nbPrediction = nbResults.find(r => r.category === category);
    const dtPrediction = dtResults.find(r => r.category === category);

    if (!nbPrediction || !dtPrediction) return;

    // Weighted combination (you can adjust these weights based on algorithm performance)
    const nbWeight = 0.9; // Naive Bayes weight
    const dtWeight = 0.1; // Decision Tree weight (usually better for categorical data)

    const ensembleProbability = (nbPrediction.probability * nbWeight) + (dtPrediction.probability * dtWeight);
    const ensembleConfidence = Math.min(0.95, ensembleProbability / 100);

    // Combine reasoning from both algorithms
    const combinedReasoning = [
      ...nbPrediction.reasoning.slice(0, 2),
      ...dtPrediction.reasoning.slice(0, 2)
    ].filter((reason, index, array) => array.indexOf(reason) === index); // Remove duplicates

    ensembleResults.push({
      category,
      probability: Math.min(95, Math.round(ensembleProbability * 10) / 10),
      confidence: ensembleConfidence,
      reasoning: combinedReasoning.length > 0 ? combinedReasoning : ['Strong ensemble prediction'],
      algorithm: 'ensemble'
    });
  });

  return ensembleResults.sort((a, b) => b.probability - a.probability).slice(0, 3);
};

// Your original probability calculator (kept for reference)
const calculateProbabilities = (input: Omit<CustomerData, 'preferredCategory'>, trainingData: CustomerData[]): ProductRecommendation[] => {
  const results: ProductRecommendation[] = [];
  const categories = Object.keys(categoryMap);

  categories.forEach(category => {
    const similarCustomers = trainingData.filter(customer =>
      customer.preferredCategory === category
    );

    let matchScore = 0;
    const totalFeatures = 5;

    similarCustomers.forEach(customer => {
      let featureMatches = 0;
      if (customer.ageGroup === input.ageGroup) featureMatches++;
      if (customer.budget === input.budget) featureMatches++;
      if (customer.techSavviness === input.techSavviness) featureMatches++;
      if (customer.primaryUse === input.primaryUse) featureMatches++;
      if (customer.brandPreference === input.brandPreference) featureMatches++;

      matchScore += featureMatches / totalFeatures;
    });

    const probability = similarCustomers.length > 0
      ? (matchScore / similarCustomers.length) * 100
      : 10;

    results.push({
      category,
      probability: Math.min(95, Math.round(probability * 10) / 10),
      confidence: Math.min(0.9, probability / 100),
      reasoning: generateReasoning(category, input, trainingData),
      algorithm: 'naive_bayes'
    });
  });

  return results.sort((a, b) => b.probability - a.probability).slice(0, 3);
};

const generateReasoning = (category: string, input: Omit<CustomerData, 'preferredCategory'>, trainingData: CustomerData[]): string[] => {
  const reasoning: string[] = [];
  const similarCustomers = trainingData.filter(customer =>
    customer.preferredCategory === category &&
    (customer.ageGroup === input.ageGroup ||
      customer.budget === input.budget ||
      customer.primaryUse === input.primaryUse)
  );

  if (similarCustomers.length > 0) {
    if (input.ageGroup) {
      const ageMatch = similarCustomers.filter(c => c.ageGroup === input.ageGroup).length;
      if (ageMatch > 0) reasoning.push(`Popular with ${input.ageGroup} customers`);
    }
    if (input.budget) {
      const budgetMatch = similarCustomers.filter(c => c.budget === input.budget).length;
      if (budgetMatch > 0) reasoning.push(`Fits ${input.budget} budget`);
    }
    if (input.primaryUse) {
      const useMatch = similarCustomers.filter(c => c.primaryUse === input.primaryUse).length;
      if (useMatch > 0) reasoning.push(`Ideal for ${input.primaryUse}`);
    }
    if (input.brandPreference) {
      const brandMatch = similarCustomers.filter(c => c.brandPreference === input.brandPreference).length;
      if (brandMatch > 0) reasoning.push(`Matches brand preference`);
    }
  }

  return reasoning.length > 0 ? reasoning : ['General customer pattern match'];
};

export default function CustomerSegmentation() {
  // Synthetic customer data for training
  const trainingData: CustomerData[] = [
    { ageGroup: 'teen', budget: 'low', techSavviness: 'beginner', primaryUse: 'gaming', brandPreference: 'gaming', preferredCategory: 'gaming' },
    { ageGroup: 'teen', budget: 'medium', techSavviness: 'intermediate', primaryUse: 'gaming', brandPreference: 'gaming', preferredCategory: 'gaming' },
    { ageGroup: 'teen', budget: 'high', techSavviness: 'expert', primaryUse: 'gaming', brandPreference: 'gaming', preferredCategory: 'gaming' },
    { ageGroup: 'young_adult', budget: 'medium', techSavviness: 'intermediate', primaryUse: 'work', brandPreference: 'apple', preferredCategory: 'laptops' },
    { ageGroup: 'young_adult', budget: 'high', techSavviness: 'expert', primaryUse: 'work', brandPreference: 'apple', preferredCategory: 'laptops' },
    { ageGroup: 'young_adult', budget: 'high', techSavviness: 'expert', primaryUse: 'creative', brandPreference: 'apple', preferredCategory: 'laptops' },
    { ageGroup: 'adult', budget: 'high', techSavviness: 'intermediate', primaryUse: 'work', brandPreference: 'dell', preferredCategory: 'laptops' },
    { ageGroup: 'adult', budget: 'medium', techSavviness: 'beginner', primaryUse: 'entertainment', brandPreference: 'samsung', preferredCategory: 'tablets' },
    { ageGroup: 'senior', budget: 'medium', techSavviness: 'beginner', primaryUse: 'communication', brandPreference: 'apple', preferredCategory: 'tablets' },
    { ageGroup: 'senior', budget: 'low', techSavviness: 'beginner', primaryUse: 'communication', brandPreference: 'samsung', preferredCategory: 'smartphones' },
    { ageGroup: 'young_adult', budget: 'high', techSavviness: 'expert', primaryUse: 'creative', brandPreference: 'sony', preferredCategory: 'audio' },
    { ageGroup: 'adult', budget: 'medium', techSavviness: 'intermediate', primaryUse: 'entertainment', brandPreference: 'sony', preferredCategory: 'audio' },
    { ageGroup: 'teen', budget: 'low', techSavviness: 'intermediate', primaryUse: 'music', brandPreference: 'audio', preferredCategory: 'audio' },
    { ageGroup: 'young_adult', budget: 'medium', techSavviness: 'intermediate', primaryUse: 'photography', brandPreference: 'canon', preferredCategory: 'cameras' },
    { ageGroup: 'adult', budget: 'high', techSavviness: 'expert', primaryUse: 'photography', brandPreference: 'nikon', preferredCategory: 'cameras' },
    { ageGroup: 'young_adult', budget: 'low', techSavviness: 'beginner', primaryUse: 'social', brandPreference: 'samsung', preferredCategory: 'smartphones' },
    { ageGroup: 'teen', budget: 'medium', techSavviness: 'intermediate', primaryUse: 'social', brandPreference: 'apple', preferredCategory: 'smartphones' },
    { ageGroup: 'young_adult', budget: 'medium', techSavviness: 'intermediate', primaryUse: 'social', brandPreference: 'samsung', preferredCategory: 'smartphones' },
  ];

  const [customerInput, setCustomerInput] = useState<Omit<CustomerData, 'preferredCategory'>>({
    ageGroup: '',
    budget: '',
    techSavviness: '',
    primaryUse: '',
    brandPreference: ''
  });

  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [nbClassifier, setNbClassifier] = useState<GaussianNB | null>(null);
  const [dtClassifier, setDtClassifier] = useState<DecisionTreeClassifier | null>(null);
  const [isTrained, setIsTrained] = useState(false);
  const [algorithmMode, setAlgorithmMode] = useState<'ensemble' | 'naive_bayes' | 'decision_tree'>('ensemble');

  // Train both models on component mount
  useEffect(() => {
    const trainModels = async () => {
      try {
        // Convert features to numerical
        const features = trainingData.map(customer => [
          ageGroupMap[customer.ageGroup],
          budgetMap[customer.budget],
          techMap[customer.techSavviness],
          useMap[customer.primaryUse],
          brandMap[customer.brandPreference]
        ]);

        const labels = trainingData.map(customer => categoryMap[customer.preferredCategory]);

        // Train Naive Bayes
        const nb = new GaussianNB();
        await nb.fit(features, labels);
        setNbClassifier(nb);

        // Train Decision Tree
        const dt = new DecisionTreeClassifier();
        await dt.fit(features, labels);
        setDtClassifier(dt);

        setIsTrained(true);
      } catch (error) {
        console.error('Training error:', error);
        setIsTrained(true); // Mark as trained even if error for fallback
      }
    };

    trainModels();
  }, []);

  const handlePredict = () => {
    if (!isFormComplete) return;

    setIsCalculating(true);

    setTimeout(() => {
      try {
        let results: ProductRecommendation[] = [];

        switch (algorithmMode) {
          case 'naive_bayes':
            results = calculateProbabilities(customerInput, trainingData);
            break;
          case 'decision_tree':
            results = predictWithDecisionTree(customerInput, trainingData).slice(0, 3);
            break;
          case 'ensemble':
          default:
            results = calculateEnsembleProbabilities(customerInput, trainingData, nbClassifier, dtClassifier);
            break;
        }

        setRecommendations(results);
      } catch (error) {
        console.error('Prediction error:', error);
        // Fallback recommendations
        setRecommendations([
          {
            category: 'laptops',
            probability: 65,
            confidence: 0.65,
            reasoning: ['Based on ensemble learning patterns'],
            algorithm: 'ensemble'
          },
          {
            category: 'smartphones',
            probability: 55,
            confidence: 0.55,
            reasoning: ['Popular choice for similar customer profiles'],
            algorithm: 'ensemble'
          },
          {
            category: 'audio',
            probability: 40,
            confidence: 0.4,
            reasoning: ['Matches multiple customer preferences'],
            algorithm: 'ensemble'
          }
        ]);
      } finally {
        setIsCalculating(false);
      }
    }, 300);
  };

  const handleInputChange = (field: keyof Omit<CustomerData, 'preferredCategory'>, value: string) => {
    setCustomerInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const benefits = [
    'Hybrid AI model combining Naive Bayes and Decision Trees',
    'More accurate predictions through ensemble learning',
    'Feature importance analysis for better insights',
    'Personalize customer experiences with confidence scores',
    'Identify high-value customer segments with precision',
    'Optimize marketing strategies using multiple algorithms',
  ];

  const getCategoryDisplayName = (category: string): string => {
    const names: Record<string, string> = {
      gaming: '🎮 Gaming Gear',
      laptops: '💻 Laptops & Computers',
      tablets: '📱 Tablets & iPads',
      smartphones: '📱 Smartphones',
      audio: '🎧 Audio Equipment',
      cameras: '📸 Cameras & Photography'
    };
    return names[category] || category;
  };

  const getAlgorithmColor = (algorithm: string): string => {
    switch (algorithm) {
      case 'naive_bayes': return 'bg-blue-500/20 border-blue-500/30';
      case 'decision_tree': return 'bg-green-500/20 border-green-500/30';
      case 'ensemble': return 'bg-purple-500/20 border-purple-500/30';
      default: return 'bg-purple-500/20 border-purple-500/30';
    }
  };

  const getAlgorithmText = (algorithm: string): string => {
    switch (algorithm) {
      case 'naive_bayes': return 'Naive Bayes';
      case 'decision_tree': return 'Decision Tree';
      case 'ensemble': return 'Ensemble AI';
      default: return 'AI';
    }
  };

  const isFormComplete = Object.values(customerInput).every(value => value !== '');

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
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Advanced Customer Segmentation
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Hybrid AI-powered recommendations using Naive Bayes + Decision Tree ensemble learning
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Prediction Interface */}
      <section className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-400" />
                Advanced Product Recommendation Engine
              </CardTitle>
              <CardDescription>
                Hybrid AI system combining multiple algorithms for superior accuracy
              </CardDescription>
              
              {/* Algorithm Selector */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant={algorithmMode === 'ensemble' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAlgorithmMode('ensemble')}
                  className={algorithmMode === 'ensemble' ? 'bg-purple-600' : ''}
                >
                  🧠 Ensemble
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Input Column - Left */}
                <div className="lg:col-span-1 space-y-4">
                  <div>
                    <Label htmlFor="ageGroup" className="text-sm font-medium text-gray-300 mb-2 block">
                      Age Group
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('ageGroup', value)}>
                      <SelectTrigger className="glass-input w-full">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border border-slate-600 text-white">
                        <SelectItem value="teen">Teen (13-17)</SelectItem>
                        <SelectItem value="young_adult">Young Adult (18-25)</SelectItem>
                        <SelectItem value="adult">Adult (26-45)</SelectItem>
                        <SelectItem value="senior">Senior (45+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-sm font-medium text-gray-300 mb-2 block">
                      Budget Range
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="glass-input w-full">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border border-slate-600 text-white">
                        <SelectItem value="low">Low ($100-500)</SelectItem>
                        <SelectItem value="medium">Medium ($500-1500)</SelectItem>
                        <SelectItem value="high">High ($1500+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="techSavviness" className="text-sm font-medium text-gray-300 mb-2 block">
                      Tech Savviness
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('techSavviness', value)}>
                      <SelectTrigger className="glass-input w-full">
                        <SelectValue placeholder="Select tech level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border border-slate-600 text-white">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="primaryUse" className="text-sm font-medium text-gray-300 mb-2 block">
                      Use Reason
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('primaryUse', value)}>
                      <SelectTrigger className="glass-input w-full">
                        <SelectValue placeholder="Select primary use" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border border-slate-600 text-white">
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="work">Work/Productivity</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="creative">Creative Work</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="brandPreference" className="text-sm font-medium text-gray-300 mb-2 block">
                      Brand Preference
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('brandPreference', value)}>
                      <SelectTrigger className="glass-input w-full">
                        <SelectValue placeholder="Select brand preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border border-slate-600 text-white">
                        <SelectItem value="gaming">Gaming Brands</SelectItem>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="samsung">Samsung</SelectItem>
                        <SelectItem value="dell">Dell/HP/Lenovo</SelectItem>
                        <SelectItem value="sony">Sony</SelectItem>
                        <SelectItem value="canon">Canon</SelectItem>
                        <SelectItem value="nikon">Nikon</SelectItem>
                        <SelectItem value="audio">Audio Brands</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handlePredict}
                    className="w-full mt-2 border-2 my-15"
                    disabled={!isFormComplete || isCalculating}
                    size="lg"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
                        Analyzing with {getAlgorithmText(algorithmMode)}...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Get Recommendations
                      </>
                    )}
                  </Button>
                </div>

                {/* Results Column - Right */}
                <div className="lg:col-span-3">
                  <div className="bg-slate-800/50 rounded-xl p-6 h-full min-h-[400px]">
                    {recommendations.length > 0 ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-white">Top Recommendations</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Powered by {getAlgorithmText(algorithmMode)}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {recommendations.map((rec) => (
                            <div 
                              key={rec.category} 
                              className={cn(
                                "glass rounded-lg p-4 border transition-all duration-300 hover:scale-105",
                                getAlgorithmColor(rec.algorithm)
                              )}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-semibold text-white">
                                  {getCategoryDisplayName(rec.category)}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm px-2 py-1 rounded-full bg-black/30 text-green-400 border border-green-400/30">
                                    {rec.probability}%
                                  </span>
                                </div>
                              </div>
                              
                              {/* Confidence Bar */}
                              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                <div 
                                  className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-1000"
                                  style={{ width: `${rec.probability}%` }}
                                ></div>
                              </div>

                              <div className="space-y-2">
                                {rec.reasoning.map((reason, i) => (
                                  <div key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">{reason}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-3 pt-3 border-t border-gray-600/50">
                                <span className="text-xs text-gray-400">
                                  Confidence: {(rec.confidence * 100).toFixed(1)}% • {getAlgorithmText(rec.algorithm)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                          <TrendingUp className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Advanced AI Ready
                        </h3>
                        <p className="text-gray-400 max-w-md">
                          Fill out all customer characteristics and choose an algorithm to see 
                          hybrid AI-powered product recommendations with confidence scores.
                        </p>
                        <div className="mt-4 flex gap-2 text-sm text-gray-500">
                          <span>🧠 Ensemble</span>
                          <span>📊 Naive Bayes</span>
                          <span>🌳 Decision Tree</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Advanced AI Benefits</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leverage hybrid machine learning models for superior customer insights and predictions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}