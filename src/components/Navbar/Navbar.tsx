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
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold">ElectroSmart</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all ${
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
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-all"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 glass rounded-lg py-2 shadow-xl"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-accent-cyan transition-all"
                  >
                    All Services
                  </Link>
                  <div className="border-t border-white/10 my-2"></div>
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-accent-cyan transition-all"
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
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg ${
                  isActive(link.path)
                    ? 'text-accent-cyan bg-accent-cyan/10'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2">
              <div className="text-gray-400 px-4 py-2 text-sm font-semibold">Services</div>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5"
              >
                All Services
              </Link>
              {serviceLinks.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5"
                >
                  {service.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4">
              <Button variant="primary" className="w-full justify-center">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
