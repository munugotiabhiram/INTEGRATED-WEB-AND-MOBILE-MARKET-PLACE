import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context';

const LoginPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    }
  };

  // Demo autofill helpers
  const handleFillAdmin = () => {
    setEmail('admin@marketplace.com');
    setPassword('admin123');
  };

  const handleFillCustomer = () => {
    setEmail('john@example.com');
    setPassword('password123');
  };

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container-custom" style={{ maxWidth: '480px' }}>
        <div
          className="glass-panel"
          style={{
            padding: '40px',
            borderRadius: '26px',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(121, 40, 202, 0.25)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #00f5d4 0%, #7928ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 0 20px rgba(0, 245, 212, 0.4)'
            }}>
              <Sparkles size={28} color="#fff" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Sign in to your Integrated Marketplace account
            </p>
          </div>

          {/* Quick Demo One-Click Fill Pills */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-glass)',
            borderRadius: '14px',
            padding: '12px 14px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ Instant College Demo Credentials
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleFillAdmin}
                className="btn-3d"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  fontSize: '0.78rem',
                  background: 'rgba(255, 0, 127, 0.15)',
                  border: '1px solid rgba(255, 0, 127, 0.4)',
                  color: '#ff70a6'
                }}
              >
                <ShieldCheck size={14} /> Admin Account
              </button>
              <button
                type="button"
                onClick={handleFillCustomer}
                className="btn-3d"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  fontSize: '0.78rem',
                  background: 'rgba(0, 245, 212, 0.12)',
                  border: '1px solid rgba(0, 245, 212, 0.4)',
                  color: 'var(--neon-cyan)'
                }}
              >
                <User size={14} /> Customer Account
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-3d"
                  style={{ paddingLeft: '42px' }}
                />
                <Mail size={18} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-3d"
                  style={{ paddingLeft: '42px' }}
                />
                <Lock size={18} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-3d btn-primary-3d"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '10px' }}
            >
              <LogIn size={18} />
              <span>{loading ? 'Authenticating with MySQL...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Bottom link */}
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontWeight: 700 }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
