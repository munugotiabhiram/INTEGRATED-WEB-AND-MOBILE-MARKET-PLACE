import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import MobileBackground from '../components/MobileBackground';
import Header from '../components/Header';

const HomeScreen = ({ onNavigateProductDetail, onNavigateCatalog, cartCount, onNavigateCart, apiBase }) => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${apiBase}/products?featured=true`),
        fetch(`${apiBase}/products/categories`)
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();

      setFeatured(prodData.slice(0, 6));
      setCategories(catData);
    } catch (err) {
      console.warn('Error fetching mobile home data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileBackground>
      <Header
        title="NEXUS MARKETPLACE"
        cartCount={cartCount}
        onCartPress={onNavigateCart}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Futuristic 3D Mobile Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>⚡ 3D Mobile Portal</Text>
          </View>
          <Text style={styles.heroTitle}>Futuristic Gear &amp; Peripherals</Text>
          <Text style={styles.heroSubtitle}>
            Synchronized with web application in real time via MySQL backend.
          </Text>
          <TouchableOpacity style={styles.heroBtn} onPress={onNavigateCatalog}>
            <Text style={styles.heroBtnText}>Shop Catalog ➔</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Horizontal Pills */}
        <Text style={styles.sectionTitle}>Explore Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.catPill}
              onPress={() => onNavigateCatalog(c.name)}
            >
              <Text style={styles.catPillText}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => onNavigateCatalog()}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#00f5d4" size="large" style={{ marginVertical: 30 }} />
        ) : (
          <View style={styles.grid}>
            {featured.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.productCard}
                onPress={() => onNavigateProductDetail(p)}
              >
                <Image source={{ uri: p.image_url }} style={styles.productImg} />
                <View style={styles.productBody}>
                  <Text style={styles.productCat}>{p.category_name || 'Marketplace'}</Text>
                  <Text style={styles.productName} numberOfLines={2}>{p.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>${parseFloat(p.price).toFixed(2)}</Text>
                    <Text style={styles.viewLink}>View ➔</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  heroCard: {
    backgroundColor: 'rgba(22, 14, 52, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 212, 0.4)',
    borderRadius: 22,
    padding: 22,
    marginBottom: 26,
    shadowColor: '#00f5d4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  heroBadge: {
    backgroundColor: 'rgba(0, 245, 212, 0.15)',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heroBadgeText: {
    color: '#00f5d4',
    fontSize: 11,
    fontWeight: '800',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
    marginBottom: 18,
  },
  heroBtn: {
    backgroundColor: '#00f5d4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#070314',
    fontWeight: '800',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
  },
  seeAllText: {
    color: '#00f5d4',
    fontSize: 13,
    fontWeight: '700',
  },
  catScroll: {
    marginBottom: 24,
  },
  catPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 10,
  },
  catPillText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    backgroundColor: 'rgba(18, 12, 40, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    width: '48%',
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImg: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(5, 2, 15, 0.8)',
  },
  productBody: {
    padding: 12,
  },
  productCat: {
    fontSize: 10,
    color: '#00f5d4',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    height: 34,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },
  viewLink: {
    fontSize: 11,
    color: '#00f5d4',
    fontWeight: '700',
  },
});

export default HomeScreen;
