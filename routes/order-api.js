const express = require('express');
const router = express.Router();
const {
  addToOrder,
  cancelOrder,
  getOrderTotalPrice,
} = require('../db/queries/order'); // 

// Add an item to an order
router.post('/add', async (req, res) => {
  const { customerId, menuId, quantity } = req.body;
  try {
    const message = await addToOrder(customerId, menuId, quantity);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel an order
router.post('/cancel', async (req, res) => {
  const { orderId } = req.body;
  try {
    const message = await cancelOrder(orderId);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the total price for an order
router.get('/total/:customerId', async (req, res) => {
  const { customerId } = req.params;
  try {
    const data = await getOrderTotalPrice(customerId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
