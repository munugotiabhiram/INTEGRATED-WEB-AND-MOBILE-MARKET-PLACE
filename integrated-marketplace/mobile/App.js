import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';

// Base API: Uses localhost for iOS/web, 10.0.2.2 for Android emulator
const API_BASE = Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState({ items: [], totalAmount: 0, totalItems: 0 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch Cart whenever user logs in or token is updated
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCart({ items: [], totalAmount: 0, totalItems: 0 });
    }
  }, [token]);

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setCart(data);
    } catch (e) {
      console.warn('Cart sync error:', e);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!token) {
      setCurrentScreen('Login');
      return;
    }
    try {
      await fetch(`${API_BASE}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ product_id: productId, quantity })
      });
      await fetchCart();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQty) => {
    try {
      await fetch(`${API_BASE}/cart/item/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQty })
      });
      await fetchCart();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await fetch(`${API_BASE}/cart/item/${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await fetchCart();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setCurrentScreen('Home');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setCurrentScreen('Login');
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const res = await fetch(`${API_BASE}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Render Current Screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen onGetStarted={() => setCurrentScreen(user ? 'Home' : 'Login')} />;

      case 'Login':
        return (
          <LoginScreen
            apiBase={API_BASE}
            onLoginSuccess={handleLoginSuccess}
            onNavigateRegister={() => setCurrentScreen('Register')}
          />
        );

      case 'Register':
        return (
          <RegisterScreen
            apiBase={API_BASE}
            onRegisterSuccess={handleLoginSuccess}
            onNavigateLogin={() => setCurrentScreen('Login')}
          />
        );

      case 'Home':
        return (
          <HomeScreen
            apiBase={API_BASE}
            cartCount={cart.totalItems || 0}
            onNavigateCart={() => setCurrentScreen('Cart')}
            onNavigateCatalog={(catName) => {
              if (catName) setSelectedCategory(catName);
              setCurrentScreen('Catalog');
            }}
            onNavigateProductDetail={(prod) => {
              setSelectedProduct(prod);
              setCurrentScreen('ProductDetail');
            }}
          />
        );

      case 'Catalog':
        return (
          <ProductListScreen
            apiBase={API_BASE}
            initialCategory={selectedCategory}
            cartCount={cart.totalItems || 0}
            onNavigateCart={() => setCurrentScreen('Cart')}
            onNavigateProductDetail={(prod) => {
              setSelectedProduct(prod);
              setCurrentScreen('ProductDetail');
            }}
          />
        );

      case 'ProductDetail':
        return (
          <ProductDetailScreen
            product={selectedProduct}
            cartCount={cart.totalItems || 0}
            onBack={() => setCurrentScreen('Catalog')}
            onAddToCart={handleAddToCart}
            onNavigateCart={() => setCurrentScreen('Cart')}
          />
        );

      case 'Cart':
        return (
          <CartScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigateCheckout={() => setCurrentScreen('Checkout')}
            onNavigateCatalog={() => setCurrentScreen('Catalog')}
          />
        );

      case 'Checkout':
        return (
          <CheckoutScreen
            user={user}
            cart={cart}
            token={token}
            apiBase={API_BASE}
            onBack={() => setCurrentScreen('Cart')}
            onOrderPlaced={() => {
              fetchCart();
              setCurrentScreen('Orders');
            }}
          />
        );

      case 'Orders':
        return (
          <OrdersScreen
            token={token}
            apiBase={API_BASE}
            onNavigateCatalog={() => setCurrentScreen('Catalog')}
          />
        );

      case 'Profile':
        return (
          <ProfileScreen
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
          />
        );

      default:
        return <HomeScreen onNavigateCatalog={() => setCurrentScreen('Catalog')} />;
    }
  };

  const showBottomNav = !['Splash', 'Login', 'Register'].includes(currentScreen);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {renderScreen()}

        {/* Global Bottom Navigation Bar */}
        {showBottomNav && (
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setCurrentScreen('Home')}
            >
              <Text style={[styles.navIcon, currentScreen === 'Home' && styles.navIconActive]}>🏠</Text>
              <Text style={[styles.navText, currentScreen === 'Home' && styles.navTextActive]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                setSelectedCategory('All');
                setCurrentScreen('Catalog');
              }}
            >
              <Text style={[styles.navIcon, currentScreen === 'Catalog' && styles.navIconActive]}>🛍️</Text>
              <Text style={[styles.navText, currentScreen === 'Catalog' && styles.navTextActive]}>Catalog</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setCurrentScreen('Cart')}
            >
              <View style={{ position: 'relative' }}>
                <Text style={[styles.navIcon, currentScreen === 'Cart' && styles.navIconActive]}>🛒</Text>
                {(cart.totalItems || 0) > 0 && (
                  <View style={styles.navBadge}>
                    <Text style={styles.navBadgeText}>{cart.totalItems}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.navText, currentScreen === 'Cart' && styles.navTextActive]}>Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setCurrentScreen('Orders')}
            >
              <Text style={[styles.navIcon, currentScreen === 'Orders' && styles.navIconActive]}>📦</Text>
              <Text style={[styles.navText, currentScreen === 'Orders' && styles.navTextActive]}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setCurrentScreen('Profile')}
            >
              <Text style={[styles.navIcon, currentScreen === 'Profile' && styles.navIconActive]}>👤</Text>
              <Text style={[styles.navText, currentScreen === 'Profile' && styles.navTextActive]}>Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#070314',
  },
  container: {
    flex: 1,
    backgroundColor: '#070314',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(12, 7, 30, 0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navText: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
  },
  navTextActive: {
    color: '#00f5d4',
    fontWeight: '800',
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ff007f',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  navBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
