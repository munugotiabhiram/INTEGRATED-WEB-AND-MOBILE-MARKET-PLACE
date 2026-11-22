import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context';

const OrdersPage = () => {
  const { API_BASE, token } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/orders/my-orders`);
      setOrders(res.data);
    } catch (err) {
      console.warn('Error fetching orders:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge-neon badge-green"><CheckCircle2 size={12} /> Delivered</span>;
      case 'Shipped':
        return <span className="badge-neon badge-cyan"><Truck size={12} /> Shipped</span>;
      case 'Processing':
        return <span className="badge-neon badge-purple"><Clock size={12} /> Processing</span>;
      case 'Cancelled':
        return <span className="badge-neon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>Cancelled</span>;
      default:
        return <span className="badge-neon badge-amber"><Clock size={12} /> Pending</span>;
    }
  };

  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  const getStepIndex = (status) => {
    const idx = steps.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  if (!token) {
    return (
      <div className="container-custom" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '50px 30px' }}>
          <Package size={50} color="var(--neon-cyan)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>
            Track Your Orders
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Please log in to review your previous purchases and live order status.
          </p>
          <Link to="/login" className="btn-3d btn-primary-3d">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '35px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div>
            <span className="badge-neon badge-cyan" style={{ marginBottom: '10px' }}>
              Synchronized Order Tracking
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Order History &amp; Tracking
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Real-time order statuses synced across Web and Mobile via MySQL.
            </p>
          </div>

          <button onClick={fetchOrders} className="btn-3d btn-outline-3d" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <RefreshCw size={14} /> Refresh Status
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--neon-cyan)' }}>
            <RefreshCw size={36} className="animate-spin" />
            <p style={{ marginTop: '14px', fontWeight: 600 }}>Loading orders from database...</p>
          </div>
        ) : orders.length === 0 ? (
          <div
            className="glass-panel"
            style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '24px', maxWidth: '600px', margin: '0 auto' }}
          >
            <ShoppingBag size={54} color="var(--neon-cyan)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '10px' }}>
              No Orders Placed Yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Once you checkout from the Web or Mobile app, your orders will appear here.
            </p>
            <Link to="/products" className="btn-3d btn-primary-3d">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {orders.map((order) => {
              const currentStep = getStepIndex(order.status);
              const isCancelled = order.status === 'Cancelled';

              return (
                <div
                  key={order.id}
                  className="glass-panel"
                  style={{
                    padding: '28px',
                    borderRadius: '22px',
                    border: '1px solid var(--border-glass)',
                    background: 'rgba(18, 12, 40, 0.75)'
                  }}
                >
                  {/* Order Top Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--border-glass)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order ID</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)' }}>
                        {order.order_number}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placed On</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                        {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                        ${parseFloat(order.total_amount).toFixed(2)}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Current Status</div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Visual Step Tracker Progress Bar */}
                  {!isCancelled && (
                    <div style={{ padding: '30px 10px 20px 10px' }}>
                      <div style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        {/* Background track line */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '10%',
                          right: '10%',
                          height: '4px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-50%)',
                          zIndex: 1
                        }} />

                        {/* Active Neon Progress Line */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '10%',
                          width: `${(currentStep / (steps.length - 1)) * 80}%`,
                          height: '4px',
                          background: 'linear-gradient(90deg, #00f5d4, #7928ca)',
                          boxShadow: '0 0 10px rgba(0, 245, 212, 0.6)',
                          transform: 'translateY(-50%)',
                          zIndex: 2,
                          transition: 'width 0.4s ease'
                        }} />

                        {/* Step Dots */}
                        {steps.map((step, idx) => {
                          const isDone = idx <= currentStep;
                          const isCurrent = idx === currentStep;

                          return (
                            <div
                              key={step}
                              style={{
                                position: 'relative',
                                zIndex: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                              }}
                            >
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: isDone ? 'linear-gradient(135deg, #00f5d4, #0070f3)' : 'rgba(20, 12, 45, 0.9)',
                                border: isCurrent ? '2px solid #fff' : isDone ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: isCurrent ? '0 0 15px rgba(0, 245, 212, 0.8)' : 'none',
                                color: isDone ? '#070314' : '#fff',
                                fontWeight: 800,
                                fontSize: '0.85rem'
                              }}>
                                {idx + 1}
                              </div>
                              <span style={{
                                marginTop: '8px',
                                fontSize: '0.78rem',
                                fontWeight: isCurrent ? 700 : 500,
                                color: isCurrent ? 'var(--neon-cyan)' : isDone ? '#fff' : 'var(--text-muted)'
                              }}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Order Items & Shipping Address Details */}
                  <div style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px'
                  }}>
                    {/* Items List */}
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        Purchased Items:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {order.items && order.items.map((it) => (
                          <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                              src={it.image_url}
                              alt={it.product_name}
                              style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{it.product_name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Qty: {it.quantity} × ${parseFloat(it.unit_price).toFixed(2)}
                              </div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--neon-cyan)' }}>
                              ${parseFloat(it.subtotal).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address Details */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      padding: '16px',
                      fontSize: '0.85rem'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Delivery Address &amp; Info:
                      </div>
                      <div style={{ color: '#fff', marginBottom: '6px', lineHeight: 1.5 }}>
                        {order.shipping_address}
                      </div>
                      <div style={{ color: 'var(--text-muted)' }}>
                        Contact Phone: <strong style={{ color: '#fff' }}>{order.phone}</strong>
                      </div>
                      <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                        Payment: <strong style={{ color: 'var(--neon-magenta)' }}>{order.payment_method}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
