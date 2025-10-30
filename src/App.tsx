import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'overview', 'services', 'gallery', 'about', 'why', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Counter = ({ end, duration, suffix = '' }: { end: number; duration: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
      const element = document.getElementById(`counter-${end}`);
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      });

      if (element) observer.observe(element);
      return () => observer.disconnect();
    }, [end, duration, hasStarted]);

    return <span id={`counter-${end}`}>{count}{suffix}</span>;
  };

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">ElectroSmart Analytics</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#overview" className={activeSection === 'overview' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }}>Overview</a></li>
            <li><a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
            <li><a href="#gallery" className={activeSection === 'gallery' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Data in Action</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Powering Smarter Decisions for Electronics Retail</h1>
          <p className="hero-subtitle">Transform your business with AI-powered analytics that drive growth, optimize inventory, and enhance customer satisfaction</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>Get Started</button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('services')}>Explore Services</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">+<Counter end={30} duration={2000} />%</div>
              <div className="stat-label">Sales Growth</div>
            </div>
            <div className="stat">
              <div className="stat-number"><Counter end={95} duration={2000} />%</div>
              <div className="stat-label">Prediction Accuracy</div>
            </div>
            <div className="stat">
              <div className="stat-number"><Counter end={500} duration={2000} />+</div>
              <div className="stat-label">Clients Worldwide</div>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="grid-pattern"></div>
        </div>
      </section>

      <section id="overview" className="overview fade-in">
        <div className="container">
          <h2 className="section-title">Company Overview</h2>
          <div className="overview-content">
            <div className="overview-text">
              <p className="lead">ElectroSmart Analytics is on a mission to empower electronics retailers with intelligent, data-driven insights that transform how they operate.</p>
              <p>We serve both online and physical electronics stores, providing predictive analytics that increase revenue, reduce waste, and deliver exceptional customer experiences. Our AI-powered platform analyzes purchasing patterns, market trends, and customer behavior to help retailers make smarter decisions in real-time.</p>
              <p>From small boutiques to large retail chains, we're helping businesses unlock the full potential of their data to stay competitive in today's fast-paced electronics market.</p>
            </div>
            <div className="overview-features">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Real-Time Insights</h3>
                <p>Make informed decisions with live analytics dashboards</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Precision Targeting</h3>
                <p>Reach the right customers with AI-driven segmentation</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Business Growth</h3>
                <p>Accelerate revenue with predictive forecasting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services fade-in">
        <div className="container">
          <h2 className="section-title">AI-Powered Services</h2>
          <p className="section-subtitle">Cutting-edge machine learning solutions tailored for electronics retail</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📈</div>
              <h3>Sales Forecasting</h3>
              <p className="service-tech">Linear Regression</p>
              <p>Predict future sales trends with precision using advanced regression models. Optimize inventory levels and plan marketing campaigns based on accurate demand forecasts.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👥</div>
              <h3>Customer Segmentation</h3>
              <p className="service-tech">Naive Bayes • Decision Tree</p>
              <p>Identify distinct customer groups based on purchasing behavior, preferences, and demographics. Tailor your marketing strategies for maximum impact.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎁</div>
              <h3>Product Recommendation</h3>
              <p className="service-tech">KNN • ANN</p>
              <p>Boost cross-selling and upselling with intelligent product recommendations. Our neural networks learn customer preferences to suggest the perfect products.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>Fraud Detection</h3>
              <p className="service-tech">Support Vector Machine</p>
              <p>Protect your business from fraudulent transactions with real-time risk analysis. Our SVM models identify suspicious patterns before they impact your bottom line.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery fade-in">
        <div className="container">
          <h2 className="section-title">Data in Action</h2>
          <p className="section-subtitle">Visual insights that drive business decisions</p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="chart-placeholder chart-line">
                <div className="chart-title">Sales Trend Analysis</div>
                <svg viewBox="0 0 300 200" className="chart-svg">
                  <polyline points="20,180 60,120 100,140 140,80 180,100 220,40 260,60" fill="none" stroke="#0066ff" strokeWidth="3"/>
                  <polyline points="20,180 60,150 100,160 140,130 180,140 220,100 260,110" fill="none" stroke="#00d4ff" strokeWidth="2" opacity="0.5"/>
                </svg>
              </div>
            </div>
            <div className="gallery-item">
              <div className="chart-placeholder chart-bar">
                <div className="chart-title">Revenue by Category</div>
                <svg viewBox="0 0 300 200" className="chart-svg">
                  <rect x="30" y="80" width="40" height="100" fill="#0066ff"/>
                  <rect x="80" y="60" width="40" height="120" fill="#0088ff"/>
                  <rect x="130" y="100" width="40" height="80" fill="#00aaff"/>
                  <rect x="180" y="40" width="40" height="140" fill="#00ccff"/>
                  <rect x="230" y="90" width="40" height="90" fill="#00eeff"/>
                </svg>
              </div>
            </div>
            <div className="gallery-item">
              <div className="chart-placeholder chart-pie">
                <div className="chart-title">Customer Segments</div>
                <svg viewBox="0 0 300 200" className="chart-svg">
                  <circle cx="150" cy="100" r="60" fill="#0066ff"/>
                  <path d="M 150 100 L 150 40 A 60 60 0 0 1 210 100 Z" fill="#0088ff"/>
                  <path d="M 150 100 L 210 100 A 60 60 0 0 1 180 155 Z" fill="#00aaff"/>
                  <path d="M 150 100 L 180 155 A 60 60 0 0 1 120 155 Z" fill="#00ccff"/>
                  <path d="M 150 100 L 120 155 A 60 60 0 0 1 90 100 Z" fill="#00eeff"/>
                </svg>
              </div>
            </div>
            <div className="gallery-item">
              <div className="chart-placeholder chart-scatter">
                <div className="chart-title">Prediction Accuracy</div>
                <svg viewBox="0 0 300 200" className="chart-svg">
                  {[...Array(30)].map((_, i) => (
                    <circle key={i} cx={20 + Math.random() * 260} cy={20 + Math.random() * 160} r="4" fill="#0066ff" opacity="0.6"/>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about fade-in">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Real-World Machine Learning in Action</h3>
              <p>ElectroSmart Analytics leverages comprehensive e-commerce purchase history data from electronics stores to power our machine learning models. Our platform is built on real-world transaction data, customer interactions, and market trends.</p>
              <p>By analyzing millions of data points from actual electronics purchases, we've developed algorithms that understand the nuances of the electronics retail market—from seasonal trends to product lifecycles, from customer preferences to pricing dynamics.</p>
              <p>Our team of data scientists and industry experts continuously refine our models to ensure they deliver actionable insights that directly impact your business performance.</p>
            </div>
            <div className="about-image">
              <div className="data-visual">
                <div className="data-layer"></div>
                <div className="data-layer"></div>
                <div className="data-layer"></div>
                <div className="data-center">
                  <div className="pulse"></div>
                  <span className="data-label">AI Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="why-choose fade-in">
        <div className="container">
          <h2 className="section-title">Why Choose ElectroSmart?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-number">01</div>
              <h3>Data-Driven Decisions</h3>
              <p>Stop guessing and start knowing. Our analytics platform provides concrete, actionable insights backed by real data, enabling you to make confident business decisions.</p>
            </div>
            <div className="why-card">
              <div className="why-number">02</div>
              <h3>AI Precision</h3>
              <p>Our advanced machine learning algorithms deliver 95%+ prediction accuracy, ensuring you can trust our forecasts to guide your inventory, pricing, and marketing strategies.</p>
            </div>
            <div className="why-card">
              <div className="why-number">03</div>
              <h3>Business Growth</h3>
              <p>Our clients see an average 30% increase in sales within the first year. We don't just provide data—we drive results that impact your bottom line.</p>
            </div>
            <div className="why-card">
              <div className="why-number">04</div>
              <h3>Industry Expertise</h3>
              <p>Specialized in electronics retail, we understand your unique challenges and opportunities. Our solutions are tailored specifically for your market.</p>
            </div>
            <div className="why-card">
              <div className="why-number">05</div>
              <h3>Scalable Solutions</h3>
              <p>Whether you're a single store or a national chain, our platform scales with your business, providing consistent value at every stage of growth.</p>
            </div>
            <div className="why-card">
              <div className="why-number">06</div>
              <h3>Continuous Innovation</h3>
              <p>We're constantly evolving our algorithms and adding new features to keep you ahead of the competition in the rapidly changing retail landscape.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact fade-in">
        <div className="container">
          <h2 className="section-title">Get Started Today</h2>
          <p className="section-subtitle">Transform your electronics retail business with AI-powered analytics</p>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Ready to revolutionize your retail operations?</h3>
              <p>Schedule a demo to see ElectroSmart Analytics in action, or request a custom analytics report for your business.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>contact@electrosmart.ai</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest! We will contact you soon.'); }}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="text" placeholder="Company Name" required />
                <select required>
                  <option value="">Select Service Interest</option>
                  <option value="demo">Request Demo</option>
                  <option value="report">Custom Analytics Report</option>
                  <option value="consultation">Book Consultation</option>
                  <option value="pricing">Pricing Information</option>
                </select>
                <textarea placeholder="Tell us about your needs" rows={4} required></textarea>
                <button type="submit" className="btn btn-primary">Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">⚡</span>
                <span className="logo-text">ElectroSmart Analytics</span>
              </div>
              <p>Powering smarter decisions for electronics retail through AI-driven analytics.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Services</h4>
                <ul>
                  <li><a href="#services">Sales Forecasting</a></li>
                  <li><a href="#services">Customer Segmentation</a></li>
                  <li><a href="#services">Product Recommendations</a></li>
                  <li><a href="#services">Fraud Detection</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#why">Why Choose Us</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ElectroSmart Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
