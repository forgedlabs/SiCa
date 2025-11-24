import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Location from './components/Location';
import Hotels from './components/Hotels';
import DressCode from './components/DressCode';
import AddressForm from './components/AddressForm';
import RSVP from './components/RSVP';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Location />
      <Hotels />
      <DressCode />
      <AddressForm />
      <RSVP />

      <footer style={{
        backgroundColor: 'var(--color-text)',
        color: 'white',
        padding: '3rem 0',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem' }}>Simon & Cathy</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>September 20, 2025 • Amsterdam, NL</p>
      </footer>
    </div>
  );
}

export default App;
