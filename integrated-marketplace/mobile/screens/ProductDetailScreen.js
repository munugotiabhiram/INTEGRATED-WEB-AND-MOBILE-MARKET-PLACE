import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MobileBackground from '../components/MobileBackground';
import Header from '../components/Header';

const ProductDetailScreen = ({ product, onBack, onAddToCart, cartCount, onNavigateCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(product.id, quantity);
    setAdding(false);
    Alert.alert('Cart Updated', `${quantity}x ${product.name} added to cart!`);
  };

  return (
    <MobileBackground>
      <Header
        title="PRODUCT DETAILS"
        showBack={true}
        onBack={onBack}
        cartCount={cartCount}
        onCartPress={onNavigateCart}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageCard}>
          <Image source={{ uri: product.image_url }} style={styles.img} resizeMode="cover" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.category}>{product.category_name}</Text>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>

          <Text style={styles.descHeader}>Description</Text>
          <Text style={styles.desc}>{product.description}</Text>

          {/* Quantity Controls */}
          {product.stock > 0 && (
            <View style={styles.qtyRow}>
              <Text style={styles.qtyLabel}>Quantity:</Text>
              <View style={styles.qtyBox}>
                <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNum}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(Math.min(product.stock, quantity + 1))} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.addBtn, product.stock <= 0 && styles.btnDisabled]}
            disabled={product.stock <= 0 || adding}
            onPress={handleAdd}
          >
            <Text style={styles.addBtnText}>
              {adding ? 'Adding...' : product.stock > 0 ? 'Add to Cart 🛒' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MobileBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  imageCard: {
    backgroundColor: 'rgba(18, 12, 40, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 212, 0.3)',
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  img: {
    width: '100%',
    height: 250,
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(0, 245, 212, 0.2)',
    borderWidth: 1,
    borderColor: '#00f5d4',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    color: '#00f5d4',
    fontSize: 11,
    fontWeight: '800',
  },
  contentCard: {
    backgroundColor: 'rgba(18, 12, 40, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    padding: 20,
  },
  category: {
    fontSize: 11,
    color: '#00f5d4',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    lineHeight: 26,
  },
  price: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 16,
  },
  descHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 22,
    marginBottom: 20,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 16,
  },
  qtyLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  qtyBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyNum: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    paddingHorizontal: 12,
  },
  addBtn: {
    backgroundColor: '#00f5d4',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  addBtnText: {
    color: '#070314',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default ProductDetailScreen;
