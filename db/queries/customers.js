 // Your database connection code
const db = require('../connection');

// Function to get all customer details
const getAllCustomers = () => {
  return db.query('SELECT * FROM customers;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { getAllCustomers };

