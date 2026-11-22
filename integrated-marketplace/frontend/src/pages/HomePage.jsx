import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Cpu,
  Layers,
  Zap,
  TrendingUp,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { API_BASE } = useApp();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${API_BASE}/products?featured=true`),
          axios.get(`${API_BASE}/products/categories`)
        ]);
        setFeaturedProducts(prodRes.data.slice(0, 8));
        setCategories(catRes.data);
      } catch (err) {
        console.warn('Error fetching homepage data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE]);

  return (
    <div>
      {/* ========================================================
          1. HERO SECTION (3D THEMED E-COMMERCE HERO)
          ======================================================== */}
      <section style={{
        position: 'relative',
        padding: '80px 0 60px 0',
        overflow: 'hidden'
      }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '50px'
          }}>
            {/* Left Column: Heading and Action */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(0, 245, 212, 0.12)',
                border: '1px solid rgba(0, 245, 212, 0.4)',
                borderRadius: '30px',
                fontSize: '0.85rem',
                color: 'var(--neon-cyan)',
                fontWeight: 700,
                marginBottom: '20px',
                boxShadow: '0 0 15px rgba(0, 245, 212, 0.2)'
              }}>
                <Sparkles size={16} />
                <span>Next-Gen Unified E-Commerce Platform</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '24px',
                letterSpacing: '-0.03em'
              }}>
                Integrated Web &amp; <br />
                <span className="gradient-text-cyan">Mobile Marketplace</span>
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '36px',
                maxWidth: '540px'
              }}>
                A complete full-stack marketplace connecting small businesses and consumers with synchronized product catalogs, live MySQL database cart persistence, and real-time order tracking across Web &amp; Mobile applications.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to="/products" className="btn-3d btn-primary-3d" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                  <ShoppingBag size={18} />
                  <span>Explore Products</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/admin" className="btn-3d btn-outline-3d" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <ShieldCheck size={18} color="var(--neon-magenta)" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>

              {/* Synchronized Metrics Highlights */}
              <div style={{
                display: 'flex',
                gap: '30px',
                marginTop: '45px',
                paddingTop: '25px',
                borderTop: '1px solid var(--border-glass)'
              }}>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MySQL Synchronized</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-magenta)' }}>Dual</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Web &amp; Mobile Portals</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c77dff' }}>Real-Time</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order Life-Cycle</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Holographic Showcase Card */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                className="glass-panel animate-float"
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  padding: '30px',
                  borderRadius: '28px',
                  border: '1px solid rgba(0, 245, 212, 0.4)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(121, 40, 202, 0.35)',
                  background: 'linear-gradient(145deg, rgba(22, 14, 52, 0.85) 0%, rgba(10, 6, 26, 0.95) 100%)',
                  position: 'relative'
                }}
              >
                {/* Floating Holographic Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '25px',
                  background: 'linear-gradient(135deg, #ff007f, #9d4edd)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  boxShadow: '0 0 15px rgba(255, 0, 127, 0.6)'
                }}>
                  3D Interactive Sync
                </div>

                <div style={{
                  height: '240px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '20px'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"
                    alt="Featured 3D Product"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 6, 26, 0.9) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px'
                  }}>
                    <div>
                      <span className="badge-neon badge-cyan" style={{ marginBottom: '6px' }}>
                        Trending Now
                      </span>
                      <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                        Quantum ANC Wireless Headphones
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Cross-Platform Sync Pill */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(0, 245, 212, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Smartphone size={18} color="var(--neon-cyan)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                        Mobile Client Ready
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Connected to Node.js Backend
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>
                    $199.99
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. POPULAR CATEGORIES SECTION
          ======================================================== */}
      <section style={{ padding: '60px 0' }}>
        <div className="container-custom">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '35px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <span className="badge-neon badge-purple" style={{ marginBottom: '10px' }}>
                Curated Collections
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                Popular Categories
              </h2>
            </div>
            <Link to="/products" style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              View All Categories <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '20px'
          }}>
            {categories.map((cat, idx) => {
              const gradients = [
                'linear-gradient(135deg, rgba(0, 245, 212, 0.15), rgba(121, 40, 202, 0.2))',
                'linear-gradient(135deg, rgba(255, 0, 127, 0.15), rgba(157, 78, 221, 0.2))',
                'linear-gradient(135deg, rgba(0, 112, 243, 0.15), rgba(0, 245, 212, 0.2))',
                'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(255, 0, 127, 0.2))',
                'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(0, 112, 243, 0.2))'
              ];

              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="glass-panel glass-panel-interactive"
                  style={{
                    padding: '24px 20px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: gradients[idx % gradients.length],
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
                  }}>
                    <Zap size={24} color="var(--neon-cyan)" />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {cat.description || 'Explore products'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED PRODUCTS (MODULE 1 SHOWCASE)
          ======================================================== */}
      <section style={{ padding: '60px 0' }}>
        <div className="container-custom">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '35px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <span className="badge-neon badge-magenta" style={{ marginBottom: '10px' }}>
                Handpicked Innovations
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                Featured Products
              </h2>
            </div>
            <Link to="/products" className="btn-3d btn-outline-3d" style={{ padding: '8px 20px' }}>
              Browse Complete Catalog <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--neon-cyan)' }}>
              <RefreshCw size={36} className="animate-spin" />
              <p style={{ marginTop: '14px' }}>Loading 3D Product Catalog...</p>
            </div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          4. SYNCHRONIZATION ARCHITECTURE HIGHLIGHT
          ======================================================== */}
      <section style={{ padding: '70px 0' }}>
        <div className="container-custom">
          <div
            className="glass-panel"
            style={{
              padding: '50px 40px',
              borderRadius: '28px',
              border: '1px solid rgba(121, 40, 202, 0.4)',
              background: 'linear-gradient(135deg, rgba(20, 12, 45, 0.9) 0%, rgba(8, 4, 22, 0.95) 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div>
                <span className="badge-neon badge-cyan" style={{ marginBottom: '12px' }}>
                  Unified Architecture
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '18px' }}>
                  Shared Backend &amp; <br />
                  <span className="gradient-text-magenta">Cross-Device Sync</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Both the web store and the React Native mobile application query the same Node.js &amp; Express API endpoints and read/write to the synchronized MySQL database.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0, 245, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={16} color="var(--neon-cyan)" />
                    </div>
                    <span style={{ fontSize: '0.95rem', color: '#fff' }}>
                      Shared Cart: Add on web, purchase on mobile seamlessly.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0, 245, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={16} color="var(--neon-cyan)" />
                    </div>
                    <span style={{ fontSize: '0.95rem', color: '#fff' }}>
                      Synchronized Orders: Real-time status updates from Admin.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0, 245, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={16} color="var(--neon-cyan)" />
                    </div>
                    <span style={{ fontSize: '0.95rem', color: '#fff' }}>
                      Role-Based Access: Secure customer and admin operations.
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphic Flow */}
              <div style={{
                background: 'rgba(10, 6, 26, 0.7)',
                border: '1px solid var(--border-glass)',
                borderRadius: '20px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--neon-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>
                    WEB APPLICATION (React)
                  </span>
                  <span className="badge-neon badge-green">Connected</span>
                </div>
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(121, 40, 202, 0.15)',
                  border: '1px dashed var(--neon-purple)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#fff'
                }}>
                  ⇄ RESTful APIs (Node.js &amp; Express on Port 5000) ⇄
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--neon-magenta)', fontWeight: 700, fontSize: '0.85rem' }}>
                    MOBILE APP (React Native)
                  </span>
                  <span className="badge-neon badge-green">Connected</span>
                </div>
                <div style={{
                  padding: '14px',
                  background: 'rgba(0, 245, 212, 0.1)',
                  border: '1px solid rgba(0, 245, 212, 0.3)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--neon-cyan)'
                }}>
                  MySQL Database: integrated_marketplace
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function CheckCircle2({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

export default HomePage;
