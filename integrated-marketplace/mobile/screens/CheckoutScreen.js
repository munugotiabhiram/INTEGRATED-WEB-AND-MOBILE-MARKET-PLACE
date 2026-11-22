import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MobileBackground from '../components/MobileBackground';
import Header from '../components/Header';

const CheckoutScreen = ({ user, cart, onOrderPlaced, onBack, apiBase, token }) => {
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [submitting, setSubmitting] = useState(false);

  const { items = [], totalAmount = 0 } = cart || {};
  const shipping = totalAmount > 150 ? 0 : 15;
  const grandTotal = totalAmount + shipping;

  const handlePlaceOrder = async () => {
    if (!address.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter delivery address and phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${apiBase}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          shipping_address: address,
          phone,
          payment_method: paymentMethod
        })
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Order Confirmed!', `Order #${data.orderNumber} placed and saved in MySQL database.`);
        onOrderPlaced();
      } else {
        Alert.alert('Checkout Error', data.message || 'Could not place order.');
      }
    } catch (e) {
      Alert.alert('Connection Error', 'Could not reach backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MobileBackground>
      <Header title="MOBILE CHECKOUT" showBack={true} onBack={onBack} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Shipping Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1. Shipping Details</Text>

          <Text style={styles.label}>Recipient Name</Text>
          <TextInput style={[styles.input, { opacity: 0.6 }]} value={user?.name || ''} editable={false} />

          <Text style={styles.label}>Delivery Address *</Text>
          <TextInput
            style={[styles.input, { height: 70 }]}
            multiline
            placeholder="Street address, City, ZIP..."
            placeholderTextColor="#64748b"
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Contact Phone *</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 555-0100"
            placeholderTextColor="#64748b"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Payment Method Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>2. Payment Method</Text>

          {['Credit Card', 'UPI / QR', 'Cash on Delivery'].map((method) => (
            <TouchableOpacity
              key={method}
              style={[styles.payOption, paymentMethod === method && styles.payOptionActive]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text style={[styles.payText, paymentMethod === method && styles.payTextActive]}>
                {method === 'Credit Card' ? '💳 ' : method === 'UPI / QR' ? '📱 ' : '💵 '}
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Order Total</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Items ({items.length}):</Text>
            <Text style={styles.val}>${parseFloat(totalAmount).toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping:</Text>
            <Text style={[styles.val, shipping === 0 && { color: '#10b981' }]}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.row, { borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)', paddingTop: 8, marginTop: 4 }]}>
            <Text style={[styles.label, { fontWeight: '800', color: '#fff' }]}>Total:</Text>
            <Text style={[styles.val, { fontWeight: '900', color: '#00f5d4', fontSize: 18 }]}>
              ${parseFloat(grandTotal).toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.placeBtn, submitting && { opacity: 0.6 }]}
          disabled={submitting}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeBtnText}>
            {submitting ? 'Connecting to MySQL...' : 'Confirm Order & Pay ➔'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </MobileBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(18, 12, 40, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: 6,
  },
  val: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  payOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  payOptionActive: {
    backgroundColor: 'rgba(0, 245, 212, 0.15)',
    borderColor: '#00f5d4',
  },
  payText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  payTextActive: {
    color: '#00f5d4',
    fontWeight: '800',
  },
  placeBtn: {
    backgroundColor: '#00f5d4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  placeBtnText: {
    color: '#070314',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default CheckoutScreen;
