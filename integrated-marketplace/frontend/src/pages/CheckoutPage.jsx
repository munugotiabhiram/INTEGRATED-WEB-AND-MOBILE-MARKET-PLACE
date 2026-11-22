import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Lock
} from 'lucide-react';
import { useApp } from '../context';

const CheckoutPage = () => {
  const { user, cart, API_BASE, fetchCart, showToast } = useApp();
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const { items = [], totalAmount = 0 } = cart;
  const shipping = totalAmount > 150 ? 0 : 15;
  const grandTotal = totalAmount + shipping;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim()) {
      showToast('Please provide your complete shipping address and phone number.', 'error');
      return;
    }

    if (items.length === 0) {
      showToast('Your cart is empty. Add products before placing an order.', 'error');
      return;
    }

    setPlacingOrder(true);
    try {
      const res = await axios.post(`${API_BASE}/orders`, {
        shipping_address: address,
        phone,
        payment_method: paymentMethod
      });

      setOrderConfirmed(res.data);
      await fetchCart();
      showToast('Order placed successfully! Generated Order ID in MySQL.', 'success');
    } catch (err) {
      console.error('Order placement failed:', err);
      showToast(err.response?.data?.message || 'Failed to place order.', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  // If order was just confirmed, show attractive confirmation card
  if (orderConfirmed) {
    return (
      <div style={{ padding: '60px 0 100px 0' }}>
        <div className="container-custom">
          <div
            className="glass-panel"
            style={{
              maxWidth: '620px',
              margin: '0 auto',
              padding: '50px 40px',
              textAlign: 'center',
              borderRadius: '28px',
              border: '1px solid rgba(0, 245, 212, 0.4)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 245, 212, 0.25)'
            }}
          >
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f5d4 0%, #0070f3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 0 25px rgba(0, 245, 212, 0.5)'
            }}>
              <CheckCircle2 size={38} color="#070314" />
            </div>

            <span className="badge-neon badge-cyan" style={{ marginBottom: '12px' }}>
              Database Synchronized
            </span>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>
              Order Confirmed!
            </h1>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: 1.6 }}>
              Your order has been recorded into the MySQL database. You can track this order in real time both here on the web portal and on the mobile application!
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-glass)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '35px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <span style={{ fontWeight: 800, color: 'var(--neon-cyan)' }}>
                  {orderConfirmed.orderNumber}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span className="badge-neon badge-purple">
                  {orderConfirmed.status || 'Pending'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <span style={{ fontWeight: 800, color: '#fff' }}>
                  ${parseFloat(orderConfirmed.totalAmount).toFixed(2)}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/orders" className="btn-3d btn-primary-3d">
                Track in My Orders
              </Link>
              <Link to="/products" className="btn-3d btn-outline-3d">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ marginBottom: '35px' }}>
          <Link
            to="/cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              marginBottom: '14px',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Return to Cart
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            Secure Checkout
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Complete your order details below.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Left Column: Shipping & Payment Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Shipping Address Panel */}
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Truck size={20} color="var(--neon-cyan)" />
                  1. Shipping Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user?.name || ''}
                      className="input-3d"
                      style={{ opacity: 0.7 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Delivery Address *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter full street address, apartment/suite, city, state and postal code..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input-3d"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-3d"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Panel */}
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={20} color="var(--neon-magenta)" />
                  2. Payment Method
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Credit / Debit Card Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: '14px',
                      background: paymentMethod === 'Credit Card' ? 'rgba(0, 245, 212, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: paymentMethod === 'Credit Card' ? '1px solid var(--neon-cyan)' : '1px solid var(--border-glass)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Credit Card'}
                      onChange={() => setPaymentMethod('Credit Card')}
                      style={{ accentColor: 'var(--neon-cyan)' }}
                    />
                    <CreditCard size={22} color="var(--neon-cyan)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>Credit / Debit Card</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instant simulated payment gateway</div>
                    </div>
                  </label>

                  {/* UPI / QR Code Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: '14px',
                      background: paymentMethod === 'UPI / QR' ? 'rgba(157, 78, 221, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: paymentMethod === 'UPI / QR' ? '1px solid var(--neon-purple)' : '1px solid var(--border-glass)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI / QR'}
                      onChange={() => setPaymentMethod('UPI / QR')}
                      style={{ accentColor: 'var(--neon-purple)' }}
                    />
                    <QrCode size={22} color="var(--neon-purple)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>UPI / Digital QR</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan and pay via mobile wallet</div>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: '14px',
                      background: paymentMethod === 'Cash on Delivery' ? 'rgba(255, 0, 127, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: paymentMethod === 'Cash on Delivery' ? '1px solid var(--neon-magenta)' : '1px solid var(--border-glass)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      style={{ accentColor: 'var(--neon-magenta)' }}
                    />
                    <Truck size={22} color="var(--neon-magenta)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>Cash on Delivery</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pay with cash upon arrival</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Preview */}
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
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>
                Review Items ({items.length})
              </h3>

              <div style={{
                maxHeight: '260px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '20px',
                paddingRight: '6px'
              }}>
                {items.map((item) => (
                  <div
                    key={item.cart_item_id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                      ${parseFloat(item.subtotal).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span>Subtotal:</span>
                  <span style={{ color: '#fff' }}>${totalAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span>Shipping:</span>
                  <span style={{ color: shipping === 0 ? 'var(--neon-green)' : '#fff' }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div style={{
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Total:</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)' }}>
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={placingOrder}
                className="btn-3d btn-primary-3d"
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginBottom: '16px' }}
              >
                {placingOrder ? 'Confirming Order in MySQL...' : 'Place Order Now'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--neon-cyan)" />
                <span>Instant Confirmation &amp; Tracking ID</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
