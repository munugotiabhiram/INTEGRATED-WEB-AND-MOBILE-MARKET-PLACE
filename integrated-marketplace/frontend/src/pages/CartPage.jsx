import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useApp } from '../context';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, token } = useApp();
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="container-custom" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '50px 30px' }}>
          <ShoppingBag size={54} color="var(--neon-cyan)" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>
            Please Log In
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            You need to be logged in to view your shopping cart and synchronize your items across Web and Mobile.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <Link to="/login" className="btn-3d btn-primary-3d">
              Log In Now
            </Link>
            <Link to="/register" className="btn-3d btn-outline-3d">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { items = [], totalAmount = 0 } = cart;
  const shipping = totalAmount > 150 || items.length === 0 ? 0 : 15;
  const grandTotal = totalAmount + shipping;

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ marginBottom: '35px' }}>
          <span className="badge-neon badge-purple" style={{ marginBottom: '10px' }}>
            MySQL Synchronized Cart
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            Shopping Cart
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Review your selected products. Your cart is synchronized with your mobile application account.
          </p>
        </div>

        {items.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: '70px 20px',
              textAlign: 'center',
              borderRadius: '24px',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <ShoppingBag size={56} color="var(--neon-cyan)" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '10px' }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
              Explore our futuristic product catalog and add items to your cart.
            </p>
            <Link to="/products" className="btn-3d btn-primary-3d">
              <ArrowLeft size={16} /> Browse Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.cart_item_id}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    background: 'rgba(18, 12, 40, 0.75)'
                  }}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '1px solid var(--border-glass)'
                    }}
                  />

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <Link
                      to={`/product/${item.product_id}`}
                      style={{
                        textDecoration: 'none',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        display: 'block',
                        marginBottom: '6px'
                      }}
                    >
                      {item.name}
                    </Link>
                    <div style={{ fontSize: '0.9rem', color: 'var(--neon-cyan)', fontWeight: 600 }}>
                      ${parseFloat(item.price).toFixed(2)} each
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    padding: '2px'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ width: '32px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <div style={{ textAlign: 'right', minWidth: '90px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subtotal</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                      ${parseFloat(item.subtotal).toFixed(2)}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cart_item_id)}
                    title="Remove item"
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      borderRadius: '10px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar Card */}
            <div
              className="glass-panel"
              style={{
                padding: '30px',
                borderRadius: '24px',
                background: 'linear-gradient(145deg, rgba(22, 14, 52, 0.85) 0%, rgba(12, 7, 32, 0.95) 100%)',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Items Subtotal:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>${totalAmount.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Shipping:</span>
                  <span style={{ color: shipping === 0 ? 'var(--neon-green)' : '#fff', fontWeight: 600 }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping === 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>
                    ✨ Free delivery applied (orders over $150)
                  </div>
                )}

                <div style={{
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Total Amount:</span>
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--neon-cyan)'
                  }}>
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="btn-3d btn-primary-3d"
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginBottom: '18px' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={16} color="var(--neon-cyan)" />
                <span>Secured with MySQL Transaction &amp; JWT</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
