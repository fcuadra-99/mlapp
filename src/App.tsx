import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="app">
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <svg className="logo-svg" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="url(#gradient)"/>
              <path d="M20 10L28 18L20 26L12 18L20 10Z" fill="white"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#1e40af"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="nav-logo-text">ElectroSmart</span>
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>Solutions</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Customers</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a>
            <button className="btn-secondary" onClick={() => scrollToSection('contact')}>Get Started</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Trusted by 500+ Retailers</span>
            </div>
            <h1 className="hero-title">
              AI-Powered Analytics for <span className="gradient-text">Electronics Retail</span>
            </h1>
            <p className="hero-description">
              Transform your business with predictive insights that increase revenue by 30%, optimize inventory, and enhance customer engagement.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                Start Free Trial
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="btn-outline">
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">95%</div>
                <div className="stat-label">Prediction Accuracy</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">30%</div>
                <div className="stat-label">Sales Increase</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">500+</div>
                <div className="stat-label">Active Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="logos">
        <div className="container">
          <p className="logos-title">Trusted by leading electronics retailers</p>
          <div className="logos-grid">
            <div className="logo-item">TechMart</div>
            <div className="logo-item">ElectroHub</div>
            <div className="logo-item">GadgetPro</div>
            <div className="logo-item">SmartStore</div>
            <div className="logo-item">DigiRetail</div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful features for retail success</h2>
            <p className="section-subtitle">Everything you need to make data-driven decisions and grow your business</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"/>
                  <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
              </div>
              <h3>Sales Forecasting</h3>
              <p>Predict future sales trends with 95% accuracy using advanced linear regression models.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Customer Segmentation</h3>
              <p>Identify high-value customer groups with AI-powered segmentation algorithms.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="8" width="18" height="4" rx="1"/>
                  <path d="M12 8v13"/>
                  <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
                  <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
                </svg>
              </div>
              <h3>Product Recommendations</h3>
              <p>Boost revenue with intelligent product recommendation engine powered by neural networks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon red">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Fraud Detection</h3>
              <p>Protect your business with real-time fraud detection using support vector machines.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3>Inventory Optimization</h3>
              <p>Never overstock or run out. AI-driven inventory management reduces waste by 40%.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <h3>Real-time Reports</h3>
              <p>Access comprehensive analytics dashboards with live data visualization.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="solutions">
        <div className="container">
          <div className="solutions-content">
            <div className="solutions-image">
              <div className="dashboard-preview">
                <div className="dashboard-header">
                  <div className="dashboard-dot"></div>
                  <div className="dashboard-dot"></div>
                  <div className="dashboard-dot"></div>
                </div>
                <div className="dashboard-body">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
                    <div className="bar" style={{height: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="solutions-text">
              <h2>Built for electronics retailers</h2>
              <p className="lead">Our platform analyzes millions of transactions from e-commerce purchase history data to deliver actionable insights.</p>
              <div className="solutions-list">
                <div className="solution-item">
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16 6L7.5 14.5L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h4>E-commerce Integration</h4>
                    <p>Seamless integration with your existing online store</p>
                  </div>
                </div>
                <div className="solution-item">
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16 6L7.5 14.5L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h4>POS System Support</h4>
                    <p>Works with physical stores and online platforms</p>
                  </div>
                </div>
                <div className="solution-item">
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16 6L7.5 14.5L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h4>Custom ML Models</h4>
                    <p>Tailored algorithms trained on your specific data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Loved by retail leaders</h2>
            <p className="section-subtitle">See how ElectroSmart is transforming electronics retail businesses</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"ElectroSmart increased our sales by 35% in just 6 months. The predictive analytics are incredibly accurate."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div>
                  <div className="author-name">John Davidson</div>
                  <div className="author-role">CEO, TechMart</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"The fraud detection system saved us thousands in the first month. Best investment we've made."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SC</div>
                <div>
                  <div className="author-name">Sarah Chen</div>
                  <div className="author-role">Operations Director, GadgetPro</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"Customer segmentation helped us target the right audience. Our conversion rate doubled."</p>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div>
                  <div className="author-name">Michael Roberts</div>
                  <div className="author-role">Marketing Lead, ElectroHub</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Simple, transparent pricing</h2>
            <p className="section-subtitle">Choose the plan that fits your business needs</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Starter</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">299</span>
                  <span className="period">/month</span>
                </div>
                <p>Perfect for small retailers</p>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Up to 10,000 transactions/month
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Sales forecasting
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Basic reporting
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Email support
                </li>
              </ul>
              <button className="btn-outline full-width">Start Free Trial</button>
            </div>
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Professional</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">699</span>
                  <span className="period">/month</span>
                </div>
                <p>For growing businesses</p>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Up to 100,000 transactions/month
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  All ML models included
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Advanced analytics
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Priority support
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  API access
                </li>
              </ul>
              <button className="btn-primary full-width">Start Free Trial</button>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="price">
                  <span className="amount">Custom</span>
                </div>
                <p>For large operations</p>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Unlimited transactions
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Custom ML models
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Dedicated support team
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Custom integrations
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  SLA guarantee
                </li>
              </ul>
              <button className="btn-outline full-width">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to transform your retail business?</h2>
            <p>Join 500+ retailers using ElectroSmart to drive growth</p>
            <div className="cta-buttons">
              <button className="btn-primary-white">Start Free Trial</button>
              <button className="btn-outline-white">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <div className="footer-brand">
                <svg className="logo-svg" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="url(#gradient2)"/>
                  <path d="M20 10L28 18L20 26L12 18L20 10Z" fill="white"/>
                  <defs>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="40" y2="40">
                      <stop offset="0%" stopColor="#1e40af"/>
                      <stop offset="100%" stopColor="#3b82f6"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span>ElectroSmart</span>
              </div>
              <p>AI-powered analytics for electronics retail. Make smarter decisions, grow faster.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#solutions">Solutions</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#testimonials">Customers</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <p>contact@electrosmart.ai</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
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
