const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware } = require('./userRoutes');

// Helper to get or create cart for user
async function getOrCreateCartId(userId) {
  const [carts] = await db.query('SELECT id FROM cart WHERE user_id = ?', [userId]);
  if (carts && carts.length > 0) {
    return carts[0].id;
  }
  const [createResult] = await db.query('INSERT INTO cart (user_id) VALUES (?)', [userId]);
  return createResult.insertId;
}

// ----------------------------------------------------
// 1. GET CURRENT USER'S CART
// ----------------------------------------------------
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cartId = await getOrCreateCartId(req.user.id);

    const [items] = await db.query(`
      SELECT 
        ci.id AS cart_item_id,
        ci.quantity,
        p.id AS product_id,
        p.name,
        p.price,
        p.image_url,
        p.stock,
        (ci.quantity * p.price) AS subtotal
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
      ORDER BY ci.id DESC
    `, [cartId]);

    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.subtotal || 0), 0);
    const totalItems = items.reduce((sum, item) => sum + parseInt(item.quantity || 0, 10), 0);

    res.json({
      cartId,
      items,
      totalItems,
      totalAmount: parseFloat(totalAmount.toFixed(2))
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Error retrieving shopping cart.' });
  }
});

// ----------------------------------------------------
// 2. ADD PRODUCT TO CART
// ----------------------------------------------------
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    const cartId = await getOrCreateCartId(req.user.id);
    const parsedQty = Math.max(1, parseInt(quantity, 10));

    // Check if product exists in catalog
    const [products] = await db.query('SELECT id, stock FROM products WHERE id = ?', [product_id]);
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Check if item already in cart
    const [existing] = await db.query(
      'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, product_id]
    );

    if (existing && existing.length > 0) {
      const newQty = existing[0].quantity + parsedQty;
      await db.query(
        'UPDATE cart_items SET quantity = ? WHERE id = ?',
        [newQty, existing[0].id]
      );
    } else {
      await db.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cartId, product_id, parsedQty]
      );
    }

    res.status(200).json({ message: 'Product added to cart successfully!' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Error adding product to cart.' });
  }
});

// ----------------------------------------------------
// 3. UPDATE ITEM QUANTITY IN CART
// ----------------------------------------------------
router.put('/item/:id', authMiddleware, async (req, res) => {
  try {
    const itemId = req.params.id;
    const { quantity } = req.body;
    const newQty = parseInt(quantity, 10);

    if (newQty <= 0) {
      await db.query('DELETE FROM cart_items WHERE id = ?', [itemId]);
      return res.json({ message: 'Item removed from cart.' });
    }

    await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [newQty, itemId]);
    res.json({ message: 'Cart quantity updated.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item quantity.' });
  }
});

// ----------------------------------------------------
// 4. REMOVE ITEM FROM CART
// ----------------------------------------------------
router.delete('/item/:id', authMiddleware, async (req, res) => {
  try {
    const itemId = req.params.id;
    await db.query('DELETE FROM cart_items WHERE id = ?', [itemId]);
    res.json({ message: 'Item removed from cart.' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart.' });
  }
});

// ----------------------------------------------------
// 5. CLEAR ENTIRE CART
// ----------------------------------------------------
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    const cartId = await getOrCreateCartId(req.user.id);
    await db.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    res.json({ message: 'Cart cleared successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart.' });
  }
});

module.exports = router;
