import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`fixed w-full py-3 md:py-4 px-4 md:px-6 flex justify-between items-center z-50 transition-all duration-300 ${scrolled ? 'bg-[#0E0A1F]/90 backdrop-blur-md shadow-lg' : 'bg-[#0E0A1F]/70 backdrop-blur-sm'}`}>
      <div className="flex items-center">
        <div className="text-white text-xl font-bold tracking-wide">Crypquue</div>
      </div>
      
      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-white hover:text-purple-300 transition-all duration-300 relative group">
          <span>Home</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#products" className="text-white hover:text-purple-300 transition-all duration-300 relative group">
          <span>Products</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#about" className="text-white hover:text-purple-300 transition-all duration-300 relative group">
          <span>About Us</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>
      
      {/* Mobile menu button */}
      <div className="flex items-center md:hidden">
        <button className="glow-button mr-4 py-1 px-3 text-sm">
          Start
        </button>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> :
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      
      <button className="hidden md:block glow-button">
        Get Started
      </button>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0E0A1F]/95 backdrop-blur-md p-4 flex flex-col space-y-3 shadow-lg md:hidden animate-fadeIn border-t border-purple-900/30">
          <a href="#" className="text-white py-2 px-4 rounded-md hover:bg-purple-900/20" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#products" className="text-white py-2 px-4 rounded-md hover:bg-purple-900/20" onClick={() => setMobileMenuOpen(false)}>Products</a>
          <a href="#about" className="text-white py-2 px-4 rounded-md hover:bg-purple-900/20" onClick={() => setMobileMenuOpen(false)}>About Us</a>
          <button className="glow-button w-full py-2 mt-2" onClick={() => setMobileMenuOpen(false)}>Get Started</button>
        </div>
      )}
    </header>
  );
};

export default Header;