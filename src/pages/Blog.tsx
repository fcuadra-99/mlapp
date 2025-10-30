import ScrollReveal from '../components/ScrollReveal';
import { Calendar, Clock, User } from 'lucide-react';
import { Particles } from '../components/ui/particles';
import { AnimatedGridPattern } from '../components/ui/animated-grid-pattern';
import { cn } from '@/lib/utils';

export default function Blog() {
  const posts = [
    {
      title: 'The Future of AI in Retail Analytics',
      excerpt: 'Exploring how artificial intelligence is transforming the retail landscape and creating new opportunities for growth.',
      author: 'Dr. Sarah Chen',
      date: 'March 20, 2024',
      readTime: '5 min read',
      category: 'AI & Machine Learning',
    },
    {
      title: 'Optimizing Inventory with Predictive Analytics',
      excerpt: 'Learn how predictive models can help reduce overstock, prevent stockouts, and improve cash flow.',
      author: 'Michael Rodriguez',
      date: 'March 18, 2024',
      readTime: '7 min read',
      category: 'Inventory Management',
    },
    {
      title: 'Understanding Customer Segmentation',
      excerpt: 'A deep dive into customer segmentation techniques and how they can drive personalized marketing strategies.',
      author: 'Emily Watson',
      date: 'March 15, 2024',
      readTime: '6 min read',
      category: 'Customer Analytics',
    },
    {
      title: 'Fraud Detection Best Practices',
      excerpt: 'Essential strategies for identifying and preventing fraudulent transactions in e-commerce.',
      author: 'David Kim',
      date: 'March 12, 2024',
      readTime: '8 min read',
      category: 'Security',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/10 via-slate-dark to-accent-blue/10"></div>
        <AnimatedGridPattern
          numSquares={35}
          maxOpacity={0.12}
          duration={3.5}
          repeatDelay={0.8}
          className={cn(
            "[mask-image:radial-gradient(650px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-20%] h-[150%] text-accent-blue/25"
          )}
        />
        <Particles
          className="absolute inset-0"
          quantity={50}
          ease={90}
          color="#22d3ee"
          refresh
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
                Blog & Resources
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Expert insights, tutorials, and best practices for leveraging analytics 
                in the electronics retail industry.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {posts.map((post, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <article className="glass rounded-xl p-6 sm:p-8 hover:glow transition-all duration-300 cursor-pointer h-full flex flex-col active:scale-95">
                  <span className="text-sm px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full w-fit mb-4">
                    {post.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3">{post.title}</h2>
                  <p className="text-gray-400 mb-6 flex-1 text-base sm:text-lg">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-400 pt-4 border-t border-white/10">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="truncate">{post.author}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
