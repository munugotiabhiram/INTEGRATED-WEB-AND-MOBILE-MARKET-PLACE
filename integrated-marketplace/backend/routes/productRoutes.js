const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware, adminMiddleware } = require('./userRoutes');

// ----------------------------------------------------
// 1. GET ALL CATEGORIES
// ----------------------------------------------------
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY id ASC');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories.' });
  }
});

// ----------------------------------------------------
// 2. ADD CATEGORY (ADMIN ONLY)
// ----------------------------------------------------
router.post('/categories', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required.' });

    const [result] = await db.query(
      'INSERT INTO categories (name, description, icon) VALUES (?, ?, ?)',
      [name, description || '', icon || 'Package']
    );

    res.status(201).json({
      message: 'Category created successfully!',
      category: { id: result.insertId, name, description, icon }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category.' });
  }
});

// ----------------------------------------------------
// 3. GET PRODUCTS (WITH SEARCH, FILTER, SORT)
// ----------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const { search, category, sort, featured } = req.query;

    let [products] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);

    // Filter by search keyword
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      products = products.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category_name && p.category_name.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (category && category !== 'All' && category !== '') {
      products = products.filter(p =>
        p.category_id === parseInt(category, 10) ||
        (p.category_name && p.category_name.toLowerCase() === category.toLowerCase())
      );
    }

    // Filter by featured
    if (featured === 'true' || featured === '1') {
      products = products.filter(p => p.is_featured === 1 || p.is_featured === true);
    }

    // Sorting
    if (sort === 'price_asc') {
      products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'price_desc') {
      products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sort === 'name_asc') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'stock') {
      products.sort((a, b) => b.stock - a.stock);
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error retrieving products.' });
  }
});

// ----------------------------------------------------
// 4. GET SINGLE PRODUCT BY ID
// ----------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const [products] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [productId]);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(products[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product details.' });
  }
});

// ----------------------------------------------------
// 5. CREATE PRODUCT (ADMIN ONLY)
// ----------------------------------------------------
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { category_id, name, description, price, stock, image_url, is_featured } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ message: 'Name, price, and category are required fields.' });
    }

    const defaultImg = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80';

    const [result] = await db.query(
      `INSERT INTO products (category_id, name, description, price, stock, image_url, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        parseInt(category_id, 10),
        name,
        description || '',
        parseFloat(price),
        parseInt(stock, 10) || 0,
        image_url || defaultImg,
        is_featured ? 1 : 0
      ]
    );

    res.status(201).json({
      message: 'Product created successfully!',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Error adding new product.' });
  }
});

// ----------------------------------------------------
// 6. UPDATE PRODUCT (ADMIN ONLY)
// ----------------------------------------------------
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const { category_id, name, description, price, stock, image_url, is_featured } = req.body;

    await db.query(
      `UPDATE products 
       SET category_id = ?, name = ?, description = ?, price = ?, stock = ?, image_url = ?, is_featured = ?
       WHERE id = ?`,
      [
        parseInt(category_id, 10),
        name,
        description,
        parseFloat(price),
        parseInt(stock, 10),
        image_url,
        is_featured ? 1 : 0,
        productId
      ]
    );

    res.json({ message: 'Product updated successfully!' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Error updating product.' });
  }
});

// ----------------------------------------------------
// 7. DELETE PRODUCT (ADMIN ONLY)
// ----------------------------------------------------
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    await db.query('DELETE FROM products WHERE id = ?', [productId]);
    res.json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product.' });
  }
});

module.exports = router;
