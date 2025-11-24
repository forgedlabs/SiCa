import React from 'react';
import { ExternalLink } from 'lucide-react';

const Hotels = () => {
    const hotels = [
        {
            name: "Silverado Resort",
            tier: "$$$",
            distance: "On-site",
            address: "1600 Atlas Peak Rd, Napa",
            link: "#"
        },
        {
            name: "Napa Valley Marriott",
            tier: "$$",
            distance: "10 mins away",
            address: "3425 Solano Ave, Napa",
            link: "#"
        },
        {
            name: "Archer Hotel",
            tier: "$$$$",
            distance: "15 mins away",
            address: "1230 1st St, Napa",
            link: "#"
        }
    ];

    return (
        <section id="hotels" className="section" style={{ backgroundColor: 'var(--color-accent-beige)' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Where to Stay</h2>
                    <p style={{ color: 'var(--color-text)', opacity: 0.7 }}>We've reserved blocks at these hotels</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {hotels.map((hotel, index) => (
                        <div key={index} style={{
                            backgroundColor: 'var(--color-white)',
                            padding: '2rem',
                            borderRadius: '4px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                            transition: 'transform 0.3s ease'
                        }} className="hotel-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>{hotel.name}</h3>
                                <span style={{ color: 'var(--color-accent-sage)' }}>{hotel.tier}</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>{hotel.address}</p>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>{hotel.distance}</p>
                            <a href={hotel.link} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                textDecoration: 'underline'
                            }}>
                                Book Now <ExternalLink size={14} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hotels;
