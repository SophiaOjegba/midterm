//all orders related queries
const client = require('../connection');

const getAllOrders = () => {
  return client.query('SELECT * FROM orders;')
    .then((results) => {
      const rows = results.rows;
      console.log(rows);
      return rows;
    });
};

const getOrderById = (id) => {
  return client.query('SELECT * FROM orders WHERE id = $1;', [id])
    .then((results) => {
      const rows = results.rows;
      const record = rows[0];
      console.log(record);
      return record;
    });
};

module.exports = {
  getAllOrders,
  getOrderById
};