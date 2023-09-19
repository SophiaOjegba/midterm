const db = require('../connection');

// order status for an order by ID
const getOrderStatusByOrderId = (orderId) => {
  return db.query('SELECT * FROM order_status WHERE order_id = $1;', [orderId])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// new order status
const insertOrderStatus = (orderId, ordered, estimatedFulfillmentTime, ready) => {
  return db.query('INSERT INTO order_status (order_id, ordered, estimated_fulfillment_time, ready) VALUES ($1, $2, $3, $4) RETURNING *;', [orderId, ordered, estimatedFulfillmentTime, ready])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

//update an order status by order ID
const updateOrderStatusByOrderId = (orderId, estimatedFulfillmentTime, ready) => {
  return db.query('UPDATE order_status SET estimated_fulfillment_time = $2, ready = $3 WHERE order_id = $1 RETURNING *;', [orderId, estimatedFulfillmentTime, ready])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getOrderStatusByOrderId,
  insertOrderStatus,
  updateOrderStatusByOrderId,
};
