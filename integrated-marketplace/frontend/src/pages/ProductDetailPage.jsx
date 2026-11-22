import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE, addToCart } = useApp();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.warn('Error fetching product:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, API_BASE]);

  const handleAddToCart = async () => {
    if (!product) return;
    const success = await addToCart(product.id, quantity);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    const success = await addToCart(product.id, quantity);
    if (success) {
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0', color: 'var(--neon-cyan)' }}>
        <RefreshCw size={40} className="animate-spin" />
        <p style={{ marginTop: '16px', fontWeight: 600 }}>Loading 3D Product View...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Product Not Found</h2>
        <Link to="/products" className="btn-3d btn-primary-3d">
          <ArrowLeft size={18} /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container-custom">
        {/* Breadcrumb / Back button */}
        <div style={{ marginBottom: '30px' }}>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        {/* Product Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '50px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: 3D Showcase Image */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              background: 'rgba(15, 9, 38, 0.7)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 245, 212, 0.2)'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '85%'
            }}>
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 6, 26, 0.7) 0%, transparent 40%)'
              }} />
            </div>

            {/* In-stock Floating Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 2
            }}>
              {product.stock > 0 ? (
                <span className="badge-neon badge-cyan">
                  <Check size={12} /> {product.stock} Units In Stock
                </span>
              ) : (
                <span className="badge-neon badge-magenta">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div>
            <div style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--neon-cyan)',
              fontWeight: 700,
              marginBottom: '10px'
            }}>
              {product.category_name || 'Marketplace Item'}
            </div>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '18px'
            }}>
              {product.name}
            </h1>

            {/* Price Row */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '14px',
              marginBottom: '24px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-glass)'
            }}>
              <span style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                color: '#ffffff',
                textShadow: '0 0 20px rgba(0, 245, 212, 0.4)'
              }}>
                ${parseFloat(product.price).toFixed(2)}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Tax Included • Free standard shipping
              </span>
            </div>

            {/* Product Description */}
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '32px'
            }}>
              {product.description}
            </p>

            {/* Quantity Selector and Action Buttons */}
            {product.stock > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Quantity:</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    padding: '4px'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        width: '36px',
                        height: '36px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        fontWeight: 600
                      }}
                    >
                      -
                    </button>
                    <span style={{ width: '40px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        width: '36px',
                        height: '36px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        fontWeight: 600
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleAddToCart}
                    className={`btn-3d ${added ? 'btn-magenta-3d' : 'btn-primary-3d'}`}
                    style={{ flex: 1, padding: '16px 28px', fontSize: '1rem' }}
                  >
                    {added ? (
                      <>
                        <Check size={20} /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} /> Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="btn-3d btn-magenta-3d"
                    style={{ flex: 1, padding: '16px 28px', fontSize: '1rem' }}
                  >
                    <Zap size={20} /> Buy Now
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                padding: '16px 20px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                color: '#ef4444',
                fontWeight: 600,
                marginBottom: '30px'
              }}>
                This item is currently out of stock. Please check back later.
              </div>
            )}

            {/* Value Proportions Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              paddingTop: '25px',
              borderTop: '1px solid var(--border-glass)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0, 245, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={18} color="var(--neon-cyan)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Fast Delivery</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2-3 business days</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255, 0, 127, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RotateCcw size={18} color="var(--neon-magenta)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Easy Returns</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>30-day money back</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(121, 40, 202, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={18} color="#c77dff" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Verified Authentic</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% Genuine gear</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
