import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Check, Star } from 'lucide-react';
import { useApp } from '../context';

const ProductCard = ({ product }) => {
  const { addToCart } = useApp();
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const success = await addToCart(product.id, 1);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  return (
    <div
      className="glass-panel glass-panel-interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        borderRadius: '18px',
        background: 'rgba(18, 12, 40, 0.7)',
        border: isHovered ? '1px solid rgba(0, 245, 212, 0.4)' : '1px solid var(--border-glass)',
        boxShadow: isHovered
          ? '0 20px 35px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 245, 212, 0.2)'
          : 'var(--shadow-3d)'
      }}
    >
      {/* Top Badges */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2
      }}>
        {product.is_featured ? (
          <span className="badge-neon badge-magenta">
            Featured
          </span>
        ) : <span />}

        {product.stock > 0 ? (
          <span className="badge-neon badge-cyan" style={{ fontSize: '0.7rem' }}>
            {product.stock} In Stock
          </span>
        ) : (
          <span className="badge-neon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
            Out of Stock
          </span>
        )}
      </div>

      {/* Image Container with 3D Depth Zoom */}
      <Link
        to={`/product/${product.id}`}
        style={{
          display: 'block',
          position: 'relative',
          paddingTop: '75%', // 4:3 Aspect Ratio
          overflow: 'hidden',
          background: 'rgba(5, 2, 15, 0.6)'
        }}
      >
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80'}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
          loading="lazy"
        />

        {/* Hover Quick Action Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10, 6, 26, 0.8) 0%, transparent 60%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '16px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease'
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--neon-cyan)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>
            <Eye size={16} /> View 3D Details
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--neon-cyan)',
          fontWeight: 700,
          marginBottom: '6px'
        }}>
          {product.category_name || 'Marketplace'}
        </div>

        <Link
          to={`/product/${product.id}`}
          style={{
            textDecoration: 'none',
            color: '#ffffff',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '10px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </Link>

        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {product.description}
        </p>

        {/* Price & Action Bottom Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              Price
            </span>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`btn-3d ${added ? 'btn-magenta-3d' : 'btn-primary-3d'}`}
            style={{
              padding: '10px 16px',
              fontSize: '0.85rem',
              borderRadius: '12px',
              opacity: product.stock <= 0 ? 0.5 : 1,
              cursor: product.stock <= 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
