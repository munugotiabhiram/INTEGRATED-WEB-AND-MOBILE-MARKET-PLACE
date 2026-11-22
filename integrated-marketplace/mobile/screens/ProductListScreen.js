import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import MobileBackground from '../components/MobileBackground';
import Header from '../components/Header';

const ProductListScreen = ({ initialCategory = 'All', onNavigateProductDetail, cartCount, onNavigateCart, apiBase }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiBase}/products/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${apiBase}/products?`;
      if (selectedCategory && selectedCategory !== 'All') {
        url += `category=${encodeURIComponent(selectedCategory)}&`;
      }
      if (search) {
        url += `search=${encodeURIComponent(search)}&`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileBackground>
      <Header
        title="PRODUCT CATALOG"
        cartCount={cartCount}
        onCartPress={onNavigateCart}
      />

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products by name..."
          placeholderTextColor="#64748b"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={fetchProducts}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={fetchProducts}>
          <Text style={styles.searchBtnText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        <TouchableOpacity
          style={[styles.catPill, selectedCategory === 'All' && styles.catPillActive]}
          onPress={() => setSelectedCategory('All')}
        >
          <Text style={[styles.catPillText, selectedCategory === 'All' && styles.catPillTextActive]}>All</Text>
        </TouchableOpacity>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.catPill, selectedCategory === c.name && styles.catPillActive]}
            onPress={() => setSelectedCategory(c.name)}
          >
            <Text style={[styles.catPillText, selectedCategory === c.name && styles.catPillTextActive]}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator color="#00f5d4" size="large" style={{ marginVertical: 40 }} />
        ) : products.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No Products Found</Text>
            <Text style={styles.emptyDesc}>Try adjusting your search query or category filters.</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {products.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.card}
                onPress={() => onNavigateProductDetail(p)}
              >
                <Image source={{ uri: p.image_url }} style={styles.img} />
                <View style={styles.body}>
                  <Text style={styles.catName}>{p.category_name}</Text>
                  <Text style={styles.name} numberOfLines={2}>{p.name}</Text>
                  <Text style={styles.price}>${parseFloat(p.price).toFixed(2)}</Text>
                  <View style={styles.stockBadge}>
                    <Text style={styles.stockText}>{p.stock} In Stock</Text>
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
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
  },
  searchBtn: {
    backgroundColor: '#00f5d4',
    borderRadius: 14,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: {
    fontSize: 16,
  },
  catScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 56,
  },
  catPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  catPillActive: {
    backgroundColor: '#00f5d4',
    borderColor: '#00f5d4',
  },
  catPillText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  catPillTextActive: {
    color: '#070314',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(18, 12, 40, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    width: '48%',
    overflow: 'hidden',
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: 125,
  },
  body: {
    padding: 12,
  },
  catName: {
    fontSize: 9,
    color: '#00f5d4',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    height: 34,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  stockBadge: {
    backgroundColor: 'rgba(0, 245, 212, 0.12)',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  stockText: {
    fontSize: 10,
    color: '#00f5d4',
    fontWeight: '700',
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

export default ProductListScreen;
