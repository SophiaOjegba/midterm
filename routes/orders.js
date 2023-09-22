const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  getOrderById
  } = require('../db/queries/orders');


//CRUD ApI Orders

//Create POST

// READ

//UPDATE


//Show all orders
router.get('/', (req, res) => {
  getAllOrders().then((orders) => {
    const templateVars = { orders };
    res.render('orders', templateVars);
  });
});

//Display specific order
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getOrderById(id).then((order) => {
    const templateVars = { order };
    res.render('order', templateVars);
  });
});




module.exports = router;