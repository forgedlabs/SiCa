import React from 'react';

const DressCode = () => {
    return (
        <section id="dress-code" className="section container text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Dress Code</h2>
            <p style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-serif)',
                marginBottom: '2rem',
                color: 'var(--color-accent-sage)'
            }}>
                Black Tie Optional
            </p>

            <div style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '2rem' }}>
                    We ask that men wear a tuxedo or a dark suit and tie.
                    Women can choose a floor-length gown, a fancy cocktail dress, or a dressy suit.
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginTop: '3rem'
                }}>
                    {/* Color Palette Swatches */}
                    {['#333333', '#8FA398', '#E8DCCA', '#F0EBE5'].map((color, i) => (
                        <div key={i} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: '1px solid #eee'
                        }} />
                    ))}
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#999' }}>
                    Suggested Palette
                </p>
            </div>
        </section>
    );
};

export default DressCode;
