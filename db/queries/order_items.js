const db = require('../connection');

// all order items for an order
const getAllOrderItems = (orderId) => {
  return db.query('SELECT * FROM order_items WHERE order_id = $1;', [orderId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

//update an order item's details by ID
const completedOrder = (order_item_id) => {
  return db.query('UPDATE order_items SET status = $1 WHERE id = $2 RETURNING *;', [1, order_item_id])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// new order item
const insertOrderItem = (menuId, orderId, itemQuantity, total) => {
  return db.query('INSERT INTO order_items (menu_id, order_id, item_quantity, total) VALUES ($1, $2, $3, $4) RETURNING *;', [menuId, orderId, itemQuantity, total])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

//update an order item's details by ID
const updateOrderItem = (orderItemId, menuId, orderId, itemQuantity, total) => {
  return db.query('UPDATE order_items SET menu_id = $2, order_id = $3, item_quantity = $4, total = $5 WHERE id = $1 RETURNING *;', [orderItemId, menuId, orderId, itemQuantity, total])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// delete an order item by ID
const deleteOrderItemById = (orderItemId) => {
  return db.query('DELETE FROM order_items WHERE id = $1;', [orderItemId])
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllOrderItems,
  insertOrderItem,
  updateOrderItem,
  deleteOrderItemById,
  completedOrder,
};
