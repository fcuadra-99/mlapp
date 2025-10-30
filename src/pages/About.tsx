import ScrollReveal from '../components/ScrollReveal';
import { Target, Eye, Award, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Our Mission',
      description: 'To empower electronics retailers with cutting-edge AI analytics that drive growth and innovation.',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Our Vision',
      description: 'Becoming the global leader in retail analytics, transforming how businesses make data-driven decisions.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Our Values',
      description: 'Innovation, integrity, and customer success are at the heart of everything we do.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Our Team',
      description: 'A diverse group of data scientists, engineers, and retail experts committed to your success.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              About ElectroSmart Analytics
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're on a mission to revolutionize the electronics retail industry through 
              advanced AI-powered analytics and predictive insights.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Founded in 2020, ElectroSmart Analytics emerged from a simple observation: 
                electronics retailers were drowning in data but starving for insights. 
                Our founders, a team of data scientists and retail veterans, saw an opportunity 
                to bridge this gap.
              </p>
              <p>
                Today, we serve over 500 retailers globally, helping them increase revenue by 
                an average of 30% through predictive analytics, optimized inventory management, 
                and enhanced customer engagement strategies.
              </p>
              <p>
                Our platform leverages the comprehensive E-commerce Purchase History Dataset, 
                combined with proprietary machine learning algorithms, to deliver actionable 
                insights that drive real business results.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="glass rounded-xl p-8">
                <div className="text-accent-cyan mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center glass rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Join Us on This Journey</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you're a small retailer or a large enterprise, we're here to help you 
              harness the power of your data and achieve unprecedented growth.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
