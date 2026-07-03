import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Demo', href: '#live-demo' },
    { name: 'Experience', href: '#experience' },
    { name: 'Case Study', href: '#case-study' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/85 dark:bg-dark-950/85 backdrop-blur-md border-primary-500/15 shadow-[0_4px_30px_-12px_rgba(34,211,238,0.5)] py-3'
          : 'bg-white/60 dark:bg-dark-950/60 backdrop-blur-sm border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#hero"
            className="group flex items-center gap-1 text-xl sm:text-2xl font-bold font-serif transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
          >
            <span className="font-mono text-primary-400 group-hover:neon-text transition-all">[</span>
            <span className="gradient-text">Hariharan Elangovan</span>
            <span className="font-mono text-primary-400 group-hover:neon-text transition-all">]</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-4">
            <nav>
              <ul className="flex space-x-1 lg:space-x-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className={`text-sm font-medium transition-colors px-2.5 py-2 rounded-md ${
                          isActive
                            ? 'text-primary-600 dark:text-primary-300 bg-primary-500/10'
                            : 'text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-primary-500/5'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors border border-gray-200 dark:border-dark-700"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-primary-400" />
              ) : (
                <Moon size={20} className="text-primary-600" />
              )}
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme} 
              className="p-2 mr-2 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-primary-400" />
              ) : (
                <Moon size={20} className="text-primary-600" />
              )}
            </button>
            
            <button
              className="p-2 rounded-md hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-dark-900 dark:text-white" />
              ) : (
                <Menu size={24} className="text-dark-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-900 shadow-lg border-t border-dark-200 dark:border-dark-700 animate-slide-down">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="block py-2 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;