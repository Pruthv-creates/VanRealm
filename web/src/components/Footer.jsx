import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#2C3E50', color: 'white', padding: '40px 0', marginTop: 'auto' }}>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Leaf size={24} color="var(--color-soft-green)" />
                        <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>VIRTUAL HERBAL GARDEN</span>
                    </div>
                    <p style={{ color: '#bdc3c7', textAlign: 'center', maxWidth: '600px' }}>
                        Explore medicinal plants used in AYUSH systems. Empowering you with traditional knowledge through technology.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <a href="#" style={{ color: 'white', opacity: 0.8 }}>About</a>
                        <a href="#" style={{ color: 'white', opacity: 0.8 }}>Contact</a>
                        <a href="#" style={{ color: 'white', opacity: 0.8 }}>Privacy Policy</a>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#7f8c8d' }}>
                        © {new Date().getFullYear()} Virtual Herbal Garden. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
