/*
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /api/orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  insertOrder,
  updateOrder,
  deleteOrderById,
  getOrderHistoryByCustomerId,
} = require('../db/queries/orders');

//all orders
router.get('/', (req, res) => {
  getAllOrders()
    .then(orders => {
      console.log(orders);
      // res.json({ orders });
      res.render('Admin',{incomingOrders: orders});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// new order
router.post('/orders', (req, res) => {
  const { customerId, restaurantId, orderDate, totalAmount, delivery, quantity } = req.body;
  insertOrder(customerId, restaurantId, orderDate, totalAmount, delivery, quantity)
    .then(order => {
      res.status(201).json({ order });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// update an order by ID
router.put('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const { customerId, restaurantId, orderDate, totalAmount, delivery, quantity } = req.body;
  updateOrder(orderId, customerId, restaurantId, orderDate, totalAmount, delivery, quantity)
    .then(order => {
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.json({ order });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE an order by ID
router.delete('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  deleteOrderById(orderId)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


// GET order history for a customer
router.get('/customers/:customerId/orders/history', (req, res) => {
  const customerId = req.params.customerId;
  getOrderHistoryByCustomerId(customerId)
    .then(orderHistory => {
      res.json({ orderHistory });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});
module.exports = router;

