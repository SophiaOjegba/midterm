const db = require('../connection');

//all orders
const getAllOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

//new order
const insertOrder = (customerId, restaurantId, orderDate, totalAmount, delivery, quantity) => {
  return db.query('INSERT INTO orders (customer_id, restaurant_id, order_date, total_amount, delivery, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [customerId, restaurantId, orderDate, totalAmount, delivery, quantity])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// update an order's details by ID
const updateOrder = (orderId, customerId, restaurantId, orderDate, totalAmount, delivery, quantity) => {
  return db.query('UPDATE orders SET customer_id = $2, restaurant_id = $3, order_date = $4, total_amount = $5, delivery = $6, quantity = $7 WHERE id = $1 RETURNING *;', [orderId, customerId, restaurantId, orderDate, totalAmount, delivery, quantity])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

//order history by customer ID
const getOrderHistoryByCustomerId = (customerId) => {
  return db.query('SELECT * FROM orders WHERE customer_id = $1;', [customerId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error; // Handle or log the error as needed
    });
};

// delete an order by ID
const deleteOrderById = (orderId) => {
  return db.query('DELETE FROM orders WHERE id = $1;', [orderId])
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getOrderHistoryByCustomerId,
  getAllOrders,
  insertOrder,
  updateOrder,
  deleteOrderById,
};
