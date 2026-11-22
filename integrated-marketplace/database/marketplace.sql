-- ========================================================
-- Integrated Web and Mobile Marketplace
-- Database: integrated_marketplace
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB
-- ========================================================

CREATE DATABASE IF NOT EXISTS `integrated_marketplace` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `integrated_marketplace`;

-- Drop existing tables if needed (in reverse dependency order)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `cart_items`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- 1. Table structure for table `users`
-- --------------------------------------------------------
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `role` ENUM('customer', 'admin') DEFAULT 'customer',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 2. Table structure for table `categories`
-- --------------------------------------------------------
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT DEFAULT NULL,
  `icon` VARCHAR(50) DEFAULT 'Package',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 3. Table structure for table `products`
-- --------------------------------------------------------
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `image_url` TEXT DEFAULT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 4. Table structure for table `cart`
-- --------------------------------------------------------
CREATE TABLE `cart` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 5. Table structure for table `cart_items`
-- --------------------------------------------------------
CREATE TABLE `cart_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cart_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_cart_product` (`cart_id`, `product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 6. Table structure for table `orders`
-- --------------------------------------------------------
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `user_id` INT NOT NULL,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `shipping_address` TEXT NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `payment_method` VARCHAR(50) DEFAULT 'Card',
  `status` ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 7. Table structure for table `order_items`
-- --------------------------------------------------------
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- SAMPLE DATA INSERTION
-- ========================================================

-- Insert Sample Users
-- Passwords below are hashed with bcrypt for:
-- admin@marketplace.com -> admin123
-- john@example.com -> password123
-- sarah@example.com -> password123
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `role`) VALUES
(1, 'Admin Director', 'admin@marketplace.com', '$2a$10$wK1k6i/3fVf3Wj0GgY.l1OsqQG66vM1K.d3.n5xUeBvRkYv.08eSm', '+1 555-0199', 'Marketplace Headquarters, 100 Innovation Blvd, Tech City', 'admin'),
(2, 'John Doe', 'john@example.com', '$2a$10$tZg/P2qYV8fS9e/Lz3R4lONpG5j9hN7K3f.zKq7pL9c.bE2.09eSm', '+1 555-0142', '742 Evergreen Terrace, Springfield, OR 97477', 'customer'),
(3, 'Sarah Connor', 'sarah@example.com', '$2a$10$tZg/P2qYV8fS9e/Lz3R4lONpG5j9hN7K3f.zKq7pL9c.bE2.09eSm', '+1 555-0188', '1240 Cyberdyne Way, Los Angeles, CA 90001', 'customer');

-- Insert Sample Categories
INSERT INTO `categories` (`id`, `name`, `description`, `icon`) VALUES
(1, 'Electronics', 'High-performance audio, visual and computing devices', 'Cpu'),
(2, 'Smart Gadgets', 'Next-gen wearable tech, IoT gear and ambient assistants', 'Smartphone'),
(3, 'Gaming Gear', 'Esports grade mechanical peripherals, RGB and immersive audio', 'Gamepad2'),
(4, 'Fashion & Wear', 'Futuristic street gear, cyber apparel and smart accessories', 'Shirt'),
(5, 'Home & Ambience', 'Minimalist neon lighting, intelligent diffusers and decor', 'Home');

-- Insert Sample Products
INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `stock`, `image_url`, `is_featured`) VALUES
(1, 1, 'Quantum ANC Wireless Headphones', 'Spatial audio with 40mm graphene drivers, active noise cancellation, ambient passthrough, and 45-hour battery life.', 199.99, 45, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80', 1),
(2, 2, 'CyberGlow Holographic Smartwatch', 'AMOLED curved display with real-time biometric metrics, SpO2 sensor, and dynamic 3D neon watchfaces.', 149.50, 30, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80', 1),
(3, 3, 'Apex Mech Neo-RGB Keyboard', 'Ultra-fast hot-swappable optical switches, aircraft-grade aluminum frame, per-key RGB backlighting and wrist rest.', 129.99, 25, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80', 1),
(4, 1, 'VisionPro 4K Ultra-Wide Monitor', '34-inch curved QD-OLED display, 175Hz refresh rate, 0.03ms response time, dual Thunderbolt 4 ports.', 649.00, 12, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&q=80', 1),
(5, 2, 'AuraSphere Ambient Smart Lamp', 'Voice-controlled mood lighting with 16 million colors, music sync spectrum, and wireless Qi fast charging pad.', 79.99, 60, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80', 1),
(6, 3, 'Viper Wireless Ultralight Gaming Mouse', '58-gram honeycomb ergonomic shell, 26,000 DPI sensor, PTFE glide feet, and optical micro switches.', 69.95, 50, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&q=80', 0),
(7, 4, 'CyberShield Stealth Tech Backpack', 'Waterproof ballistic nylon with TSA lock, USB-C pass-through charging port, and hidden anti-theft compartments.', 89.00, 35, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80', 1),
(8, 5, 'Nebula Floating Magnetic Speaker', 'Levitating 360-degree bluetooth speaker with subwoofer base, pulsating starry LEDs, and hands-free microphone.', 119.00, 18, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&q=80', 0),
(9, 4, 'NeoVolt Polarized Smart Audio Glasses', 'Open-ear directional audio speakers, polarized UV400 lenses, touch controls, and IPX4 sweat resistance.', 139.99, 22, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=80', 0),
(10, 1, 'PulseCore 20000mAh Magnetic PowerBank', 'Fast charging 65W PD bi-directional power delivery with integrated OLED power status screen.', 59.99, 80, 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=700&q=80', 0),
(11, 2, 'HoloLens AR Drone 4K Gimbal', 'Tri-directional obstacle avoidance, 35-minute flight time, 4K HDR camera with 3-axis mechanical gimbal stabilization.', 389.00, 15, 'https://images.unsplash.com/photo-1507582020432-2a3bc4ff723c?w=700&q=80', 1),
(12, 5, 'ZenMist Ultrasonic Aroma Diffuser', 'Aromatherapy essential oil diffuser with flame light effect, whisper quiet operation, and auto shut-off.', 45.00, 40, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&q=80', 0);

-- Insert Sample Carts
INSERT INTO `cart` (`id`, `user_id`) VALUES
(1, 2),
(2, 3);

-- Insert Sample Cart Items
INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `quantity`) VALUES
(1, 1, 1, 1),
(2, 1, 6, 2),
(3, 2, 2, 1);

-- Insert Sample Orders
INSERT INTO `orders` (`id`, `order_number`, `user_id`, `total_amount`, `shipping_address`, `phone`, `payment_method`, `status`, `created_at`) VALUES
(1, 'ORD-2026-1001', 2, 339.49, '742 Evergreen Terrace, Springfield, OR 97477', '+1 555-0142', 'Credit Card', 'Delivered', '2026-11-10 14:22:10'),
(2, 'ORD-2026-1002', 2, 79.99, '742 Evergreen Terrace, Springfield, OR 97477', '+1 555-0142', 'UPI / QR', 'Shipped', '2026-11-18 10:05:40'),
(3, 'ORD-2026-1003', 3, 229.49, '1240 Cyberdyne Way, Los Angeles, CA 90001', '+1 555-0188', 'Credit Card', 'Processing', '2026-11-20 16:45:12'),
(4, 'ORD-2026-1004', 3, 649.00, '1240 Cyberdyne Way, Los Angeles, CA 90001', '+1 555-0188', 'Cash on Delivery', 'Pending', '2026-11-22 18:30:00');

-- Insert Sample Order Items
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `subtotal`) VALUES
(1, 1, 1, 1, 199.99, 199.99),
(2, 1, 6, 2, 69.95, 139.90),
(3, 2, 5, 1, 79.99, 79.99),
(4, 3, 2, 1, 149.50, 149.50),
(5, 3, 5, 1, 79.99, 79.99),
(6, 4, 4, 1, 649.00, 649.00);
