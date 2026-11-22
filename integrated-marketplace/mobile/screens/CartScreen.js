import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MobileBackground from '../components/MobileBackground';
import Header from '../components/Header';

const CartScreen = ({ cart, onUpdateQuantity, onRemoveItem, onNavigateCheckout, onNavigateCatalog }) => {
  const { items = [], totalAmount = 0 } = cart || {};
  const shipping = totalAmount > 150 || items.length === 0 ? 0 : 15;
  const grandTotal = totalAmount + shipping;

  return (
    <MobileBackground>
      <Header title="SHOPPING CART" />

      <ScrollView contentContainerStyle={styles.container}>
        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🛍️</Text>
            <Text style={styles.emptyTitle}>Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>Explore products and add items to your mobile cart.</Text>
            <TouchableOpacity style={styles.shopBtn} onPress={onNavigateCatalog}>
              <Text style={styles.shopBtnText}>Explore Products ➔</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {items.map((item) => (
              <View key={item.cart_item_id} style={styles.itemCard}>
                <Image source={{ uri: item.image_url }} style={styles.thumb} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>

                  {/* Quantity controls */}
                  <View style={styles.controlsRow}>
                    <View style={styles.qtyBox}>
                      <TouchableOpacity onPress={() => onUpdateQuantity(item.cart_item_id, item.quantity - 1)} style={styles.qtyBtn}>
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNum}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => onUpdateQuantity(item.cart_item_id, item.quantity + 1)} style={styles.qtyBtn}>
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => onRemoveItem(item.cart_item_id)} style={styles.delBtn}>
                      <Text style={styles.delText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* Bill Summary Card */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Cart Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryVal}>${parseFloat(totalAmount).toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping:</Text>
                <Text style={[styles.summaryVal, shipping === 0 && { color: '#10b981' }]}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalVal}>${parseFloat(grandTotal).toFixed(2)}</Text>
              </View>

              <TouchableOpacity style={styles.checkoutBtn} onPress={onNavigateCheckout}>
                <Text style={styles.checkoutBtnText}>Proceed to Checkout ➔</Text>
              </TouchableOpacity>
            </View>
          </>
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
  emptyCard: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(18, 12, 40, 0.7)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopBtn: {
    backgroundColor: '#00f5d4',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  shopBtnText: {
    color: '#070314',
    fontWeight: '800',
    fontSize: 14,
  },
  itemCard: {
    backgroundColor: 'rgba(18, 12, 40, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  thumb: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#00f5d4',
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  qtyNum: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
  },
  delBtn: {
    padding: 6,
  },
  delText: {
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: 'rgba(22, 14, 52, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 212, 0.3)',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  summaryVal: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
    marginTop: 6,
    marginBottom: 18,
  },
  totalLabel: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  totalVal: {
    color: '#00f5d4',
    fontWeight: '900',
    fontSize: 18,
  },
  checkoutBtn: {
    backgroundColor: '#00f5d4',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#070314',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default CartScreen;
