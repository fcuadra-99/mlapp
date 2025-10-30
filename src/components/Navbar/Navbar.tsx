import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from '../Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Insights', path: '/insights' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Sales Forecasting', path: '/services/sales-forecasting' },
    { name: 'Customer Segmentation', path: '/services/customer-segmentation' },
    { name: 'Product Recommendation', path: '/services/product-recommendation' },
    { name: 'Fraud Detection', path: '/services/fraud-detection' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl sm:text-2xl">E</span>
            </div>
            <span className="text-lg sm:text-xl font-bold">ElectroSmart</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 lg:px-4 py-2 rounded-lg transition-all text-sm lg:text-base font-medium ${
                  isActive(link.path)
                    ? 'text-accent-cyan bg-accent-cyan/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="relative group">
              <button
                className="px-3 lg:px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-all text-sm lg:text-base font-medium"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 glass rounded-lg py-2 shadow-xl border border-white/10"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to="/services"
                    className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-accent-cyan transition-all font-medium"
                  >
                    All Services
                  </Link>
                  <div className="border-t border-white/10 my-2"></div>
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-accent-cyan transition-all"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Button variant="primary" className="ml-4">
              Request Demo
            </Button>
          </div>

          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-dark/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all font-medium text-base min-h-[48px] flex items-center ${
                  isActive(link.path)
                    ? 'text-accent-cyan bg-accent-cyan/10'
                    : 'text-gray-300 hover:bg-white/5 active:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 flex items-center justify-between font-medium text-base min-h-[48px]"
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="mt-2 ml-4 space-y-1">
                  <Link
                    to="/services"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 active:bg-white/10 min-h-[48px] flex items-center"
                  >
                    All Services
                  </Link>
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 active:bg-white/10 text-sm min-h-[48px] flex items-center"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <Button variant="primary" className="w-full justify-center min-h-[48px] text-base font-medium">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
