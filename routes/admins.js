const express = require('express');
const router = express.Router();
const {
  getAllAdmins,
  insertAdmin,
  updateAdminName,
  deleteAdminById,
} = require('../db/queries/admins');
const {
  getAllOrders,
  insertOrder,
  updateOrder,
  deleteOrderById,
  getOrderHistoryByCustomerId,
} = require('../db/queries/orders');

//all admins
router.get('/', (req, res) => {
  getAllAdmins()
    .then(admins => {
      res.redirect('/orders')
      //res.json({ admins });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// new admin
router.post('/', (req, res) => {
  const { name, restaurantId } = req.body;
  insertAdmin(name, restaurantId)
    .then(admin => {
      res.status(201).json({ admin });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// update admin by ID
router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const { name, restaurantId } = req.body;
  updateAdminName(adminId, name, restaurantId)
    .then(admin => {
      if (!admin) {
        res.status(404).json({ error: 'Admin not found' });
      } else {
        res.json({ admin });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE admin by ID
router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  deleteAdminById(adminId)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
