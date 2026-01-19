import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Explore Plants', path: '/explore' },
        { name: 'Tours', path: '/tours' },
        { name: 'My Garden', path: '/profile' }, // Placeholder path for now
    ];

    const isActive = (path) => {
        return location.pathname === path ? 'color: var(--color-primary); font-weight: 700;' : '';
    };

    return (
        <nav style={{
            backgroundColor: 'rgba(240, 234, 216, 0.95)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Leaf size={24} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-primary)', lineHeight: '1' }}>VIRTUAL</span>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-text-light)', letterSpacing: '1px' }}>HERBAL GARDEN</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <ul style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-menu">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                style={{
                                    color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-dark)',
                                    fontWeight: location.pathname === link.path ? '700' : '500',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <User size={20} color="var(--color-text-dark)" />
                            <span style={{ display: 'none' }}>Profile</span>
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer' }}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu Dropdown (Simplified) */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'var(--color-earthy-beige)',
                    padding: '20px',
                    boxShadow: 'var(--shadow-soft)',
                    zIndex: 999
                }}>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        display: 'block',
                                        fontSize: '1.1rem',
                                        color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-dark)',
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Responsive Styles Injection */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
