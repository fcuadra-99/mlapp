import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
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
