import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import MobileBackground from '../components/MobileBackground';
import Header from '../components/Header';

const OrdersScreen = ({ token, apiBase, onNavigateCatalog }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/orders/my-orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileBackground>
      <Header title="MY ORDERS &amp; TRACKING" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.topTitle}>Synced Order History</Text>
          <TouchableOpacity onPress={fetchOrders} style={styles.refreshBtn}>
            <Text style={styles.refreshText}>🔄 Refresh</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#00f5d4" size="large" style={{ marginVertical: 40 }} />
        ) : orders.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyText}>Orders placed on web or mobile will appear here.</Text>
            <TouchableOpacity style={styles.shopBtn} onPress={onNavigateCatalog}>
              <Text style={styles.shopBtnText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          orders.map((o) => (
            <View key={o.id} style={styles.orderCard}>
              <View style={styles.orderHead}>
                <View>
                  <Text style={styles.orderId}>{o.order_number}</Text>
                  <Text style={styles.orderDate}>{new Date(o.created_at).toLocaleDateString()}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  o.status === 'Delivered' && { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' },
                  o.status === 'Shipped' && { backgroundColor: 'rgba(0, 245, 212, 0.2)', borderColor: '#00f5d4' },
                  o.status === 'Processing' && { backgroundColor: 'rgba(121, 40, 202, 0.2)', borderColor: '#c77dff' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    o.status === 'Delivered' && { color: '#10b981' },
                    o.status === 'Shipped' && { color: '#00f5d4' },
                    o.status === 'Processing' && { color: '#c77dff' }
                  ]}>
                    {o.status}
                  </Text>
                </View>
              </View>

              {/* Progress mini timeline */}
              <View style={styles.timeline}>
                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((st, idx) => {
                  const currentIdx = ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(o.status);
                  const isDone = idx <= currentIdx;
                  return (
                    <View key={st} style={styles.timelineStep}>
                      <View style={[styles.timelineDot, isDone && styles.timelineDotActive]} />
                      <Text style={[styles.timelineText, isDone && styles.timelineTextActive]}>{st}</Text>
                    </View>
                  );
                })}
              </View>

              {/* Total & Items */}
              <View style={styles.orderBottom}>
                <Text style={styles.itemCount}>{o.items?.length || 0} product(s)</Text>
                <Text style={styles.orderTotal}>${parseFloat(o.total_amount).toFixed(2)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </MobileBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  topTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  refreshBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
  },
  refreshText: {
    color: '#00f5d4',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(18, 12, 40, 0.8)',
    borderRadius: 20,
    marginTop: 30,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: '#00f5d4',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  shopBtnText: {
    color: '#070314',
    fontWeight: '800',
    fontSize: 13,
  },
  orderCard: {
    backgroundColor: 'rgba(18, 12, 40, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  orderHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '800',
    color: '#00f5d4',
  },
  orderDate: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  statusText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 12,
  },
  timelineStep: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 4,
  },
  timelineDotActive: {
    backgroundColor: '#00f5d4',
  },
  timelineText: {
    fontSize: 9,
    color: '#64748b',
  },
  timelineTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  orderBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 12,
    color: '#94a3b8',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
});

export default OrdersScreen;
