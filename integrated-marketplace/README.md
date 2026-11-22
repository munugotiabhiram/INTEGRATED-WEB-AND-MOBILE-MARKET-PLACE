# Integrated Web and Mobile Marketplace
> **Final Year Full-Stack College Project**  
> Built with: React.js • Node.js • Express.js • MySQL • React Native • Three.js 3D Canvas

---

## 1. Project Overview

The **Integrated Web and Mobile Marketplace** is a synchronized cross-platform e-commerce ecosystem designed to help small businesses showcase products, manage inventory, receive orders, and maintain unified cart and user state between a Web Portal and a Mobile Application.

Both the React Web Frontend and React Native Mobile Client communicate with the **same Node.js/Express backend** and read/write to the **same MySQL database (`integrated_marketplace`)**.

---

## 2. Key Features & 6 Core Modules

### 🔹 Module 1: Product Catalog
- Real-time catalog listing loaded directly from MySQL.
- Live keyword search across product names, descriptions, and categories.
- Category filtering (Electronics, Smart Gadgets, Gaming Gear, Fashion, Home).
- Sort options: Price (Low to High / High to Low), Newest, Name, Stock.
- Detailed product view with stock counter and specifications.

### 🔹 Module 2: User Login & Registration
- Secure registration and login with **bcrypt** password hashing.
- **JWT (JSON Web Token)** stateless authentication.
- Role-Based Access Control (**Customer** and **Admin**).
- User profile editing (name, phone, delivery address).

### 🔹 Module 3: Shopping Cart (MySQL Synchronized)
- Real-time cart state stored in MySQL `cart` and `cart_items` tables.
- Add items, increase/decrease quantities, remove items.
- Dynamic calculation of subtotal, tax, and free shipping threshold.
- Full cross-device sync: items added on web appear on mobile instantly.

### 🔹 Module 4: Orders & Tracking
- Multi-step checkout with delivery address and phone number.
- Payment method options: Credit/Debit Card, UPI / QR, Cash on Delivery.
- Auto-generation of unique order IDs (e.g. `ORD-2026-XXXX`).
- Visual 4-stage tracking timeline: `Pending` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`.
- Immediate stock decrement upon checkout.

### 🔹 Module 5: Mobile App Synchronization
- Standalone **React Native** application matching web design.
- Splash, Login, Registration, Home, Catalog, Details, Cart, Checkout, Orders, and Profile.
- Direct connection to the same backend API endpoints.

### 🔹 Module 6: Admin Dashboard
- **Glassmorphic Sidebar** with 7 tabs:
  1. **Dashboard:** Animated KPI cards (Total Products, Customers, Orders, Revenue) & Chart.js sales analytics.
  2. **Products:** Product CRUD (Create, Read, Update, Delete with live modal).
  3. **Categories:** View and add categories.
  4. **Customers:** Directory of registered customers.
  5. **Orders:** Full order fulfillment manager with live status updater dropdown.
  6. **Reports:** Revenue analysis and inventory turnover metrics.
  7. **Logout:** Secure session termination.

---

## 3. 3D Futuristic Design System

- **Background Theme:** Deep Purple (`#070314`, `#0f0926`), Electric Blue (`#0070f3`), Neon Cyan (`#00f5d4`), Magenta (`#ff007f`), and Violet (`#7928ca`).
- **3D Canvas:** Interactive Three.js canvas featuring floating glowing spheres, rotating torus knot, wireframe icosahedron, and 450+ additive glowing particles with mouse parallax.
- **Glassmorphism:** Frosted translucent cards with blurred backdrops, subtle neon borders, and glowing hover elevations.

---

## 4. Database Schema (MySQL: `integrated_marketplace`)

The schema script is located in `database/marketplace.sql` and includes:
1. `users` (id, name, email, password, phone, address, role, created_at)
2. `categories` (id, name, description, icon, created_at)
3. `products` (id, category_id, name, description, price, stock, image_url, is_featured, created_at)
4. `cart` (id, user_id, updated_at)
5. `cart_items` (id, cart_id, product_id, quantity, created_at)
6. `orders` (id, order_number, user_id, total_amount, shipping_address, phone, payment_method, status, created_at)
7. `order_items` (id, order_id, product_id, quantity, unit_price, subtotal)

---

## 5. Quick Demo Credentials

For quick evaluation and review:
| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@marketplace.com` | `admin123` |
| **Customer** | `john@example.com` | `password123` |

*(One-click demo autofill buttons are built directly into the login screen!)*

---

## 6. How to Run the Project (Step-by-Step)

### Prerequisites
- Node.js (v18+)
- MySQL Server (via XAMPP, WAMP, MySQL Workbench, or standalone MySQL service)

---

### Step 1: Set up MySQL Database
1. Start your local MySQL service (e.g. from XAMPP or terminal).
2. Open MySQL CLI or phpMyAdmin and import the SQL file:
```sql
SOURCE database/marketplace.sql;
```
*(Note: If MySQL service is not yet started, the backend features an automatic demo engine to prevent application crashes during presentations).*

---

### Step 2: Start the Backend Server
```bash
cd integrated-marketplace/backend
npm install
npm start
```
The backend will launch on **http://localhost:5000**.  
Verify health: **http://localhost:5000/api/health**

---

### Step 3: Start the React Frontend Web App
Open a new terminal window:
```bash
cd integrated-marketplace/frontend
npm install
npm run dev
```
Open **http://localhost:5173** in your web browser.

---

### Step 4: Start the React Native Mobile Application
Open a third terminal window:
```bash
cd integrated-marketplace/mobile
npm install
npm start
```
- Press `w` to open in web browser.
- Or scan QR code with the **Expo Go** app on Android/iOS.

---

## 7. Folder Structure

```
integrated-marketplace/
│
├── frontend/                     # React 18 + Vite + Three.js + Chart.js
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Background3D.jsx  # Three.js 3D floating glowing geometric objects
│   │   │   ├── Navbar.jsx        # Glassmorphism header with cart counter
│   │   │   ├── Footer.jsx        # Project info & status
│   │   │   ├── ProductCard.jsx   # 3D interactive product card
│   │   │   ├── ProtectedRoute.jsx# JWT route guard
│   │   │   └── Toast.jsx         # Custom notifications
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Hero section, categories, featured items
│   │   │   ├── ProductsPage.jsx  # Catalog with search, filter, sort
│   │   │   ├── ProductDetailPage.jsx # Individual product page
│   │   │   ├── CartPage.jsx      # Shopping cart
│   │   │   ├── CheckoutPage.jsx  # Address & payment checkout
│   │   │   ├── OrdersPage.jsx    # Visual 4-step order tracker
│   │   │   ├── ProfilePage.jsx   # User details updater
│   │   │   ├── LoginPage.jsx     # Authentication with 1-click demo pills
│   │   │   ├── RegisterPage.jsx  # Registration form
│   │   │   └── AdminDashboardPage.jsx # 7-tab Admin dashboard with charts
│   │   ├── context.jsx           # Global Auth and Cart state
│   │   ├── App.jsx               # Routes configuration
│   │   ├── main.jsx              # Entry point
│   │   └── style.css             # Futuristic 3D design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                      # Node.js + Express + MySQL2
│   ├── config/
│   │   └── db.js                 # MySQL pool connection + resilient demo engine
│   ├── routes/
│   │   ├── userRoutes.js         # Register, Login, Profile, Customers
│   │   ├── productRoutes.js      # CRUD, Search, Filter, Sort, Categories
│   │   ├── cartRoutes.js         # Sync Cart items with MySQL
│   │   └── orderRoutes.js        # Checkout, Order tracking, Admin analytics
│   ├── server.js                 # Express server entry point
│   └── package.json
│
├── mobile/                       # React Native Mobile Client
│   ├── screens/                  # 10 Mobile screens (Splash, Home, Cart, Orders, etc.)
│   ├── components/               # MobileBackground, Header
│   ├── App.js                    # Cross-platform bottom navigation
│   └── package.json
│
├── database/
│   └── marketplace.sql           # MySQL database creation & seed data
│
├── .env                          # Environment variables
└── README.md                     # Documentation
```
