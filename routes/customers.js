const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('../db/queries/customers');

//GET
router.get('/', (req, res) => {
  getAllCustomers()
    .then(customers => {
      res.json({ customers });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const customerId = req.params.id;
  getCustomerById(customerId)
    .then(customer => {
      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.json({ customer });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const { name, phone, email, password, country, province, street, city, postalCode } = req.body;
  createCustomer(name, phone, email, password, country, province, street, city, postalCode)
    .then(customer => {
      res.status(201).json({ customer });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id', (req, res) => {
  const customerId = req.params.id;
  const { name, phone, email, password, country, province, street, city, postalCode } = req.body;
  updateCustomer(customerId, name, phone, email, password, country, province, street, city, postalCode)
    .then(customer => {
      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.json({ customer });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  deleteCustomer(customerId)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
