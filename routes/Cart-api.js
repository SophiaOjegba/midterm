const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Add items to an order (equivalent to adding to cart)
router.post('/add', async (req, res) => {
  const { customerId, menuId, quantity } = req.body;
  try {
    const message = await db.addToOrder(customerId, menuId, quantity);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove an order (equivalent to emptying the cart)
router.post('/remove', async (req, res) => {
  const { orderId } = req.body;
  try {
    const message = await db.cancelOrder(orderId);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch the total price of the cart (equivalent to fetching the total price of an order)
router.get('/total/:customerId', async (req, res) => {
  const { customerId } = req.params;
  try {
    const data = await db.getOrderTotalPrice(customerId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
