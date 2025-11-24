import React, { useState } from 'react';
import { Check } from 'lucide-react';

const RSVP = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        attending: 'yes',
        meal: '',
        plusOne: false,
        plusOneName: '',
        plusOneMeal: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(2); // Show confirmation
    };

    if (step === 2) {
        return (
            <section id="rsvp" className="section container text-center" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="fade-in">
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent-sage)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <Check size={32} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>RSVP Confirmed</h2>
                    <p style={{ fontSize: '1.2rem' }}>We can't wait to celebrate with you, {formData.name.split(' ')[0]}!</p>
                </div>
            </section>
        );
    }

    return (
        <section id="rsvp" className="section" style={{ backgroundColor: 'var(--color-accent-beige)' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="text-center" style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>RSVP</h2>
                    <p style={{ color: '#666' }}>Kindly respond by August 1st</p>
                </div>

                <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-white)', padding: '3rem', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>

                    {/* Name */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    {/* Attendance */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Will you be attending?</label>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="attending"
                                    value="yes"
                                    checked={formData.attending === 'yes'}
                                    onChange={handleChange}
                                /> Joyfully Accept
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="attending"
                                    value="no"
                                    checked={formData.attending === 'no'}
                                    onChange={handleChange}
                                /> Regretfully Decline
                            </label>
                        </div>
                    </div>

                    {formData.attending === 'yes' && (
                        <div className="fade-in">
                            {/* Meal Preference */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Meal Preference</label>
                                <select
                                    name="meal"
                                    value={formData.meal}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
                                >
                                    <option value="">Select a meal...</option>
                                    <option value="beef">Braised Short Rib</option>
                                    <option value="fish">Miso Glazed Salmon</option>
                                    <option value="veg">Wild Mushroom Risotto (V)</option>
                                </select>
                            </div>

                            {/* Plus One */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem' }}>
                                    <input
                                        type="checkbox"
                                        name="plusOne"
                                        checked={formData.plusOne}
                                        onChange={handleChange}
                                    /> I am bringing a plus one
                                </label>

                                {formData.plusOne && (
                                    <div style={{ paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-accent-sage)' }}>
                                        <input
                                            type="text"
                                            name="plusOneName"
                                            value={formData.plusOneName}
                                            onChange={handleChange}
                                            placeholder="Plus One's Name"
                                            required
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem' }}
                                        />
                                        <select
                                            name="plusOneMeal"
                                            value={formData.plusOneMeal}
                                            onChange={handleChange}
                                            required
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
                                        >
                                            <option value="">Select their meal...</option>
                                            <option value="beef">Braised Short Rib</option>
                                            <option value="fish">Miso Glazed Salmon</option>
                                            <option value="veg">Wild Mushroom Risotto (V)</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dietary Restrictions / Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="3"
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Send RSVP
                    </button>
                </form>
            </div>
        </section>
    );
};

export default RSVP;
