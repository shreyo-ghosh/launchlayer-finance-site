import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Services', href: '/services', icon: '⚙️' },
    { name: 'Calculators', href: '/calculators', icon: '🧮' },
    { name: 'Market Insights', href: '/market-insights', icon: '📊' },
    { name: 'Blog', href: '/blog', icon: '📰' },
    { name: 'About', href: '/about', icon: '👥' },
  ];

  const isActiveLink = (href) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  const handleNewsletterClick = () => {
    // Scroll to newsletter section or open modal
    const newsletterSection = document.getElementById('newsletter-signup');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: navigate to contact with newsletter anchor
      window.location.href = '/contact#newsletter';
    }
  };

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-navy-100 py-2' 
            : 'bg-white/90 backdrop-blur-sm py-3'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
                aria-label="LaunchLayer Finance - Go to homepage"
              >
                <div className="relative">
                  <img 
                    src="/Launch-Layer-logo.jpg" 
                    alt="LaunchLayer Finance Logo" 
                    className="h-10 w-10 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-gold-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-navy-800 to-blue-600 bg-clip-text text-transparent transition-all duration-300">
                    LaunchLayer
                  </span>
                  <span className="block text-sm text-gray-600 font-medium -mt-1">
                    Finance
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActiveLink(item.href)
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    aria-current={isActiveLink(item.href) ? 'page' : undefined}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    
                    {/* Active indicator */}
                    <span 
                      className={`absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-gold-500 origin-left transform transition-transform duration-300 ${
                        isActiveLink(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Newsletter CTA */}
              <button
                onClick={handleNewsletterClick}
                className="group flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 border border-gray-200 hover:border-blue-300 rounded-lg hover:bg-blue-50"
                aria-label="Subscribe to newsletter"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">📧</span>
                <span>Newsletter</span>
              </button>
              
              {/* Primary CTA */}
              <Link
                to="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Get started with LaunchLayer Finance"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute top-1.5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isOpen ? 'rotate-45 translate-y-1' : ''
                    }`}
                  />
                  <span 
                    className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                      isOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span 
                    className={`absolute top-4.5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isOpen ? '-rotate-45 -translate-y-1' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-blue-300'
                  }`}
                  aria-current={isActiveLink(item.href) ? 'page' : undefined}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                  {isActiveLink(item.href) && (
                    <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <button
                  onClick={handleNewsletterClick}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  <span className="text-lg">📧</span>
                  <span>Subscribe to Newsletter</span>
                </button>
                
                <Link
                  to="/contact"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
