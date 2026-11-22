import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, ShieldCheck, LogOut, Package, Menu, X, Sparkles, Smartphone } from 'lucide-react';
import { useApp } from '../context';

const Navbar = () => {
  const { user, logout, cartCount } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="glass-nav">
      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo with 3D Holographic Glow */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f5d4 0%, #7928ca 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 245, 212, 0.5)',
            transform: 'perspective(400px) rotateY(-10deg)'
          }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #00f5d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              lineHeight: 1.1
            }}>
              NEXUS
            </span>
            <span style={{
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--neon-cyan)',
              fontWeight: 700
            }}>
              Marketplace 3D
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          <Link to="/" className="nav-link" style={navLinkStyle}>Home</Link>
          <Link to="/products" className="nav-link" style={navLinkStyle}>Catalog</Link>
          <Link to="/orders" className="nav-link" style={navLinkStyle}>My Orders</Link>
          
          {/* Mobile App Sync Link Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            background: 'rgba(0, 245, 212, 0.1)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: 'var(--neon-cyan)',
            fontWeight: 600
          }}>
            <Smartphone size={14} />
            <span>Mobile Synced</span>
          </div>
        </nav>

        {/* Right Section Actions (Cart, User, Admin) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          
          {/* Admin Dashboard shortcut if admin */}
          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className="btn-3d btn-magenta-3d"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <ShieldCheck size={16} />
              <span>Admin Portal</span>
            </Link>
          )}

          {/* Cart Icon with Live Badge */}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            <ShoppingCart size={20} color="var(--neon-cyan)" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                minWidth: '20px',
                height: '20px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ff007f, #9d4edd)',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                boxShadow: '0 0 10px rgba(255, 0, 127, 0.6)'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile / Auth State */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '24px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7928ca, #0070f3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={14} color="#fff" />
                </div>
                <span style={{ fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
              </Link>

              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '8px'
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="btn-3d btn-outline-3d" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Login
              </Link>
              <Link to="/register" className="btn-3d btn-primary-3d" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(10, 6, 26, 0.98)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={navLinkStyle}>Home</Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} style={navLinkStyle}>Product Catalog</Link>
          <Link to="/orders" onClick={() => setMobileMenuOpen(false)} style={navLinkStyle}>My Orders</Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} style={navLinkStyle}>Shopping Cart ({cartCount})</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ ...navLinkStyle, color: 'var(--neon-magenta)' }}>
              Admin Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-3d btn-outline-3d" style={{ flex: 1 }}>Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-3d btn-primary-3d" style={{ flex: 1 }}>Register</Link>
            </div>
          )}
        </div>
      )}

      {/* Style for Responsive helper */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

const navLinkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '0.95rem',
  transition: 'color 0.2s',
  letterSpacing: '-0.01em'
};

export default Navbar;
