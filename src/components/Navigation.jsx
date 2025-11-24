import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/index.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Details', href: '#location' },
    { name: 'Hotels', href: '#hotels' },
    { name: 'Dress Code', href: '#dress-code' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: '1.5rem 2rem',
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(249, 249, 247, 0.95)' : 'transparent',
      boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="logo" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 'bold' }}>
        S & J
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'none', gap: '2rem' }}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button className="mobile-toggle" onClick={toggleMenu} style={{ zIndex: 1001 }}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          zIndex: 1000
        }}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={toggleMenu}
              style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
      
      <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
