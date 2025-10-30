import ScrollReveal from '../components/ScrollReveal';
import { Calendar, Clock, User } from 'lucide-react';

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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
              Blog & Resources
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Expert insights, tutorials, and best practices for leveraging analytics 
              in the electronics retail industry.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <article className="glass rounded-xl p-8 hover:glow transition-all duration-300 cursor-pointer h-full flex flex-col">
                <span className="text-sm px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full w-fit mb-4">
                  {post.category}
                </span>
                <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-400 mb-6 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
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
    </div>
  );
}
