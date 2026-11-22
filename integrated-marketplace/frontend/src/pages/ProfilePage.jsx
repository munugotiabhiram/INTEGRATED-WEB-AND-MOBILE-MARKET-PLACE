import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, ShieldCheck, Save, ArrowLeft, LogOut } from 'lucide-react';
import { useApp } from '../context';

const ProfilePage = () => {
  const { user, token, updateProfile, logout } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  if (!token) {
    return (
      <div className="container-custom" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>Please Log In</h2>
        <Link to="/login" className="btn-3d btn-primary-3d">Log In</Link>
      </div>
    );
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({ name, phone, address });
    setSaving(false);
  };

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container-custom" style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div style={{ marginBottom: '35px' }}>
          <span className="badge-neon badge-purple" style={{ marginBottom: '10px' }}>
            Account Management
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            User Profile
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your personal contact information and delivery address.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '35px', borderRadius: '24px' }}>
          {/* Avatar and Role Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '24px',
            marginBottom: '28px',
            borderBottom: '1px solid var(--border-glass)',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7928ca 0%, #00f5d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 245, 212, 0.4)'
              }}>
                <User size={32} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
                  {user?.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {user?.email}
                </div>
              </div>
            </div>

            <div>
              {user?.role === 'admin' ? (
                <span className="badge-neon badge-magenta">
                  <ShieldCheck size={14} /> Administrator Role
                </span>
              ) : (
                <span className="badge-neon badge-cyan">
                  Customer Account
                </span>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-3d"
                  style={{ paddingLeft: '42px' }}
                />
                <User size={18} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                Email Address (Read-only)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="input-3d"
                  style={{ paddingLeft: '42px', opacity: 0.6 }}
                />
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-3d"
                  style={{ paddingLeft: '42px' }}
                />
                <Phone size={18} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                Primary Shipping Address
              </label>
              <div style={{ position: 'relative' }}>
                <textarea
                  rows={3}
                  placeholder="Street, City, State, ZIP..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-3d"
                  style={{ paddingLeft: '42px' }}
                />
                <MapPin size={18} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '20px' }} />
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-glass)',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <button
                type="button"
                onClick={() => { logout(); navigate('/'); }}
                className="btn-3d btn-outline-3d"
                style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                <LogOut size={16} /> Sign Out
              </button>

              <button
                type="submit"
                disabled={saving}
                className="btn-3d btn-primary-3d"
                style={{ padding: '12px 28px' }}
              >
                <Save size={18} />
                <span>{saving ? 'Updating MySQL...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
