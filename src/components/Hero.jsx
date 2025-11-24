import React from 'react';

const Hero = () => {
    return (
        <section id="hero" style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 1rem',
            backgroundColor: 'var(--color-bg)'
        }}>
            <div className="fade-in">
                <p style={{
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    marginBottom: '1rem',
                    color: 'var(--color-accent-sage)'
                }}>
                    We're getting married
                </p>
                <h1 style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    marginBottom: '1rem',
                    lineHeight: 1.1
                }}>
                    Simon & Cathy
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    marginBottom: '3rem',
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-serif)'
                }}>
                    September 20, 2025 • Amsterdam, NL
                </p>
                <a href="#rsvp" className="btn btn-primary">
                    RSVP Now
                </a>
            </div>
        </section>
    );
};

export default Hero;
