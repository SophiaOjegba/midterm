const express = require('express');
const router = express.Router();
const {
  getAllOrderItems,
  insertOrderItem,
  updateOrderItem,
  deleteOrderItemById,
} = require('../db/queries/order_items');

// all order items
router.get('/', (req, res) => {
  const customer = {
    name : 'John'
  }
  getAllOrderItems()
    .then((orderItems) => {

     res.render('order_items',{order_items : orderItems, customer});

    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//new order item
router.post('/', (req, res) => {
  const customer = {
    name : 'John'
  }
  const { menuId, orderId, itemQuantity, price } = req.body;
  const total = price*itemQuantity;
  console.log(req.body);
  insertOrderItem(menuId, orderId, itemQuantity, total)
    .then((orderItem) => {
      console.log('orderitem',orderItem);
      res.render('order_items',{order_item : orderItem, customer});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update order item by ID
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
