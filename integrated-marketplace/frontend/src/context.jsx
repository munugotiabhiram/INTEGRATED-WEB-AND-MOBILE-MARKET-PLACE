import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('marketplace_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('marketplace_token') || null;
  });

  const [cart, setCart] = useState({ items: [], totalAmount: 0, totalItems: 0 });
  const [toast, setToast] = useState(null);

  // Configure axios default authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('marketplace_token', token);
      fetchCart();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('marketplace_token');
      setCart({ items: [], totalAmount: 0, totalItems: 0 });
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('marketplace_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('marketplace_user');
    }
  }, [user]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // 1. Fetch Cart from Backend
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/cart`);
      setCart(res.data);
    } catch (err) {
      console.warn('Failed to load cart:', err.message);
    }
  };

  // 2. Add Item to Cart
  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      showToast('Please log in to add items to your cart!', 'info');
      return false;
    }
    try {
      await axios.post(`${API_BASE}/cart/add`, { product_id: productId, quantity });
      await fetchCart();
      showToast('Item added to cart! 🛍️', 'success');
      return true;
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add item to cart', 'error');
      return false;
    }
  };

  // 3. Update Item Quantity
  const updateQuantity = async (cartItemId, newQty) => {
    try {
      await axios.put(`${API_BASE}/cart/item/${cartItemId}`, { quantity: newQty });
      await fetchCart();
    } catch (err) {
      showToast('Error updating item quantity', 'error');
    }
  };

  // 4. Remove Item from Cart
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${API_BASE}/cart/item/${cartItemId}`);
      await fetchCart();
      showToast('Item removed from cart', 'info');
    } catch (err) {
      showToast('Error removing item', 'error');
    }
  };

  // 5. Clear Cart
  const clearCart = async () => {
    try {
      await axios.delete(`${API_BASE}/cart/clear`);
      setCart({ items: [], totalAmount: 0, totalItems: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  // 6. Login
  const login = async (email, password) => {
    try {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();
      const res = await axios.post(`${API_BASE}/users/login`, { email: cleanEmail, password: cleanPassword });
      setToken(res.data.token);
      setUser(res.data.user);
      showToast(`Welcome back, ${res.data.user.name}! ✨`, 'success');
      return { success: true, user: res.data.user };
    } catch (err) {
      let msg = 'Login failed. Please check credentials.';
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.code === 'ERR_NETWORK' || (err.message && err.message.toLowerCase().includes('network error'))) {
        msg = `Cannot connect to backend server at ${API_BASE}. Make sure the Node.js backend is running on port 5000.`;
      }
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  // 7. Register
  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_BASE}/users/register`, userData);
      setToken(res.data.token);
      setUser(res.data.user);
      showToast('Registration successful! Welcome aboard! 🚀', 'success');
      return { success: true, user: res.data.user };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  // 8. Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    showToast('Logged out successfully.', 'info');
  };

  // 9. Update Profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put(`${API_BASE}/users/profile`, profileData);
      setUser(res.data.user);
      showToast('Profile updated successfully!', 'success');
      return true;
    } catch (err) {
      showToast('Failed to update profile.', 'error');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        API_BASE,
        user,
        token,
        cart,
        cartCount: cart.totalItems || 0,
        login,
        register,
        logout,
        updateProfile,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
