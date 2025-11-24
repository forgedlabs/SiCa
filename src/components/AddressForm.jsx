import React, { useState } from 'react';
import { Send } from 'lucide-react';

const AddressForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => setSubmitted(true), 1000);
    };

    if (submitted) {
        return (
            <div className="text-center fade-in" style={{ padding: '4rem 0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Thank You!</h3>
                <p>We've received your address.</p>
            </div>
        );
    }

    return (
        <section id="address" className="section container" style={{ maxWidth: '600px' }}>
            <div className="text-center" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Mailing Address</h2>
                <p style={{ color: '#666' }}>Please help us update our address book.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                    <input type="text" required style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-sans)'
                    }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Address</label>
                    <input type="text" required style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-sans)'
                    }} placeholder="Street Address" />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input type="text" required placeholder="City" style={{
                            padding: '12px',
                            border: '1px solid var(--color-border)',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-sans)'
                        }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input type="text" required placeholder="State" style={{
                                padding: '12px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-sans)'
                            }} />
                            <input type="text" required placeholder="Zip" style={{
                                padding: '12px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-sans)'
                            }} />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    Submit Address <Send size={16} />
                </button>
            </form>
        </section>
    );
};

export default AddressForm;
