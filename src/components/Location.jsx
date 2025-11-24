import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const Location = () => {
    return (
        <section id="location" className="section container">
            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Details</h2>
                <p style={{ color: 'var(--color-accent-sage)' }}>Where & When</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'start'
            }}>
                {/* Venue Info */}
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={20} /> The Venue
                    </h3>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Silverado Resort
                    </p>
                    <p style={{ marginBottom: '1rem', color: '#666' }}>
                        1600 Atlas Peak Rd<br />
                        Napa, CA 94558
                    </p>
                    <p style={{ marginBottom: '2rem' }}>
                        The ceremony will take place in the Grove, followed by a reception in the Grand Ballroom.
                        Parking is available on-site. Shuttles will be provided from recommended hotels.
                    </p>

                    {/* Map Placeholder */}
                    <div style={{
                        width: '100%',
                        height: '250px',
                        backgroundColor: '#eee',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999'
                    }}>
                        [Map Integration]
                    </div>
                </div>

                {/* Schedule */}
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} /> Schedule of Events
                    </h3>

                    <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '2rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>4:00 PM</span>
                            <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>Ceremony</span>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>5:00 PM</span>
                            <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>Cocktail Hour</span>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>6:30 PM</span>
                            <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>Dinner & Dancing</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>11:00 PM</span>
                            <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>Send Off</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
