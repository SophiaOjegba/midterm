 // Your database connection code
 const db = require('../connection');

 // Select one or more dishes and add them to the order_items
const addToOrder = (customerId, menuId, quantity) => {
  return db.query('INSERT INTO order_items (menu_id, order_id, item_quantity, total) VALUES ($1, $2, $3, (SELECT menus.price * $3 FROM menus WHERE menus.id = $1));', [menuId, customerId, quantity])
    .then(() => {
      return 'Dish added to order successfully.';
    });
};


// Cancel an order
const cancelOrder = (orderId) => {
  return db.query('DELETE FROM order_items WHERE order_id = $1; UPDATE orders SET order_status = $2 WHERE id = $1;', [orderId, 'Cancelled'])
    .then(() => {
      return 'Order cancelled successfully.';
    });
};

// See the checkout page to view the total price
const getOrderTotalPrice = (customerId) => {
  return db.query('SELECT SUM(order_items.total) AS total_price FROM order_items WHERE order_id IN (SELECT orders.id FROM orders WHERE orders.customer_id = $1);', [customerId])
    .then(data => {
      return data.rows[0];
    });
};

// Admins

// See the orders
const getAllOrdersForRestaurant = (restaurantId) => {
  return db.query('SELECT orders.id, orders.order_date, orders.total_amount, orders.delivery, orders.quantity, order_status.ordered, order_status.estimated_fulfillment_time, order_status.ready, customers.name AS customer_name FROM orders LEFT JOIN order_status ON orders.id = order_status.order_id JOIN customers ON orders.customer_id = customers.id WHERE orders.restaurant_id = $1;', [restaurantId])
    .then(data => {
      return data.rows;
    });
};

// Write the status of food pickup time and update the order status
const updateOrderStatus = (orderId, status, estimatedTime) => {
  return db.query('UPDATE order_status SET ordered = NOW(), estimated_fulfillment_time = $2, ready = $3 WHERE order_id = $1; UPDATE orders SET order_status = $4 WHERE id = $1;', [orderId, estimatedTime, status, status])
    .then(() => {
      return 'Order status updated successfully.';
    });
};


module.exports = {
  addToOrder,
  cancelOrder,
  getOrderTotalPrice,
  getAllOrdersForRestaurant,
  updateOrderStatus,
};
