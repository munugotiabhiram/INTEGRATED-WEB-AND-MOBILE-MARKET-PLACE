import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Smartphone, ShieldCheck, Database, Layers } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(7, 3, 20, 0.95)',
      borderTop: '1px solid var(--border-glass)',
      padding: '60px 0 30px 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00f5d4 0%, #7928ca 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 245, 212, 0.4)'
              }}>
                <Sparkles size={20} color="#fff" />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ffffff'
              }}>
                NEXUS 3D
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Integrated Web and Mobile Marketplace connecting businesses and customers through synchronized 3D e-commerce architecture.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="badge-neon badge-cyan">
                <Database size={12} /> MySQL Backend
              </span>
              <span className="badge-neon badge-purple">
                <Smartphone size={12} /> React Native Sync
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '18px', fontWeight: 700 }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/" style={footerLinkStyle}>Homepage</Link></li>
              <li><Link to="/products" style={footerLinkStyle}>Product Catalog</Link></li>
              <li><Link to="/cart" style={footerLinkStyle}>Shopping Cart</Link></li>
              <li><Link to="/orders" style={footerLinkStyle}>Order Tracking</Link></li>
              <li><Link to="/admin" style={footerLinkStyle}>Admin Control Center</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '18px', fontWeight: 700 }}>
              Product Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/products?category=Electronics" style={footerLinkStyle}>High-Tech Electronics</Link></li>
              <li><Link to="/products?category=Smart%20Gadgets" style={footerLinkStyle}>Smart Gadgets & Wearables</Link></li>
              <li><Link to="/products?category=Gaming%20Gear" style={footerLinkStyle}>Gaming Peripherals</Link></li>
              <li><Link to="/products?category=Fashion%20%26%20Wear" style={footerLinkStyle}>Cyber Streetwear</Link></li>
              <li><Link to="/products?category=Home%20%26%20Ambience" style={footerLinkStyle}>Ambient Lighting</Link></li>
            </ul>
          </div>

          {/* College Project Architecture */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '18px', fontWeight: 700 }}>
              Architecture & Stack
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Built with Node.js, Express, MySQL, React, Three.js 3D Canvas, and React Native for unified cross-platform state synchronization.
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-glass)',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <ShieldCheck size={20} color="var(--neon-green)" />
              <div style={{ fontSize: '0.8rem', color: '#ffffff' }}>
                <strong>Role-Based Access</strong>
                <div style={{ color: 'var(--text-muted)' }}>Admin & Customer Secured by JWT</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 Integrated Web and Mobile Marketplace. Final Year College Project.
          </div>
          <div>
            Single Node.js + Express Backend & MySQL Database Synchronization
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerLinkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'color 0.2s',
  display: 'inline-block'
};

export default Footer;
