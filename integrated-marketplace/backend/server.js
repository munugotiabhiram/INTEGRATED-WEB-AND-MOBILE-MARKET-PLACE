const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const db = require('./config/db');
const { router: userRoutes } = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow React web frontend and React Native mobile app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for easy student debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Root API Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Integrated Web and Mobile Marketplace API',
    timestamp: new Date(),
    mysqlStatus: db.isUsingFallback() ? 'Demo Mode (In-Memory Engine)' : 'Connected to MySQL',
    modules: [
      'Product Catalog',
      'User Authentication & Roles',
      'Shopping Cart (MySQL Synchronized)',
      'Orders & Tracking',
      'Mobile App Synchronization',
      'Admin Dashboard'
    ]
  });
});

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    message: 'An internal server error occurred.',
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log('\n=============================================================');
  console.log(`🚀 INTEGRATED MARKETPLACE BACKEND RUNNING ON PORT ${PORT}`);
  console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📱 Mobile API Ready: Compatible with React Native Client`);
  console.log('=============================================================\n');
});
