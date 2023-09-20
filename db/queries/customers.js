const db = require('../connection');

// All customer
const getAllCustomers = () => {
  return db.query('SELECT * FROM customers;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

// New customer
const insertCustomer = (name, phone, email, password, country, province, street, city, postalCode) => {
  return db.query('INSERT INTO customers (name, phone, email, password, country, province, street, city, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', [name, phone, email, password, country, province, street, city, postalCode])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

//update a customer's details by ID
const updateCustomer = (customerId, name, phone, email, password, country, province, street, city, postalCode) => {
  return db.query('UPDATE customers SET name = $2, phone = $3, email = $4, password = $5, country = $6, province = $7, street = $8, city = $9, postal_code = $10 WHERE id = $1 RETURNING *;', [customerId, name, phone, email, password, country, province, street, city, postalCode])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// delete a customer by ID
const deleteCustomerById = (customerId) => {
  return db.query('DELETE FROM customers WHERE id = $1;', [customerId])
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllCustomers,
  insertCustomer,
  updateCustomer,
  deleteCustomerById,
};
