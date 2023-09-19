const express = require('express');
const router = express.Router();
const {
  getAllOrderItems,
  insertOrderItem,
  updateOrderItem,
  deleteOrderItemById,
} = require('../db/queries/order_items');

// all order items
router.get('/order_items', (req, res) => {
  getAllOrderItems()
    .then(orderItems => {
      res.json({ orderItems });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//new order item
router.post('/order_items', (req, res) => {
  const { menuId, orderId, itemQuantity, total } = req.body;
  insertOrderItem(menuId, orderId, itemQuantity, total)
    .then(orderItem => {
      res.status(201).json({ orderItem });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update order item by ID
router.put('/order_items/:id', (req, res) => {
  const orderItemId = req.params.id;
  const { menuId, orderId, itemQuantity, total } = req.body;
  updateOrderItem(orderItemId, menuId, orderId, itemQuantity, total)
    .then(orderItem => {
      if (!orderItem) {
        res.status(404).json({ error: 'Order item not found' });
      } else {
        res.json({ orderItem });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE order item by ID
router.delete('/order_items/:id', (req, res) => {
  const orderItemId = req.params.id;
  deleteOrderItemById(orderItemId)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
