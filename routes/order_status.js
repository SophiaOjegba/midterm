const express = require('express');
const router = express.Router();
const {
  getOrderStatusByOrderId,
  insertOrderStatus,
  updateOrderStatusByOrderId,
} = require('../db/queries/order_status');

//order status by order ID
router.get('/order_status/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  getOrderStatusByOrderId(orderId)
    .then(orderStatus => {
      if (!orderStatus) {
        res.status(404).json({ error: 'Order status not found' });
      } else {
        res.json({ orderStatus });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// POST order status
router.post('/order_status', (req, res) => {
  const { orderId, ordered, estimatedFulfillmentTime, ready } = req.body;
  insertOrderStatus(orderId, ordered, estimatedFulfillmentTime, ready)
    .then(orderStatus => {
      res.status(201).json({ orderStatus });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update order status by order ID
router.put('/order_status/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const { ordered, estimatedFulfillmentTime, ready } = req.body;
  updateOrderStatusByOrderId(orderId, ordered, estimatedFulfillmentTime, ready)
    .then(orderStatus => {
      if (!orderStatus) {
        res.status(404).json({ error: 'Order status not found' });
      } else {
        res.json({ orderStatus });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
