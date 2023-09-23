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
  const customer = {
    name : 'John'
  }
  getAllOrders()
    .then(orders => {

      res.render('Admin',{incomingOrders: orders, customer});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// new order
router.post('/', (req, res) => {
  const customer = {
    name : 'John'
  }
  const { customerId, restaurantId, orderDate, totalAmount, delivery, quantity } = req.body;
  insertOrder(customerId, restaurantId, orderDate, totalAmount, delivery, quantity)
    .then(order => {
      console.log(orders);
      res.render('Admin',{incomingOrders: order, customer});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// update an order by ID
router.put('/:orderId', (req, res) => {
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
router.delete('/:orderId', (req, res) => {
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
router.get('/:orderId', (req, res) => {
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

