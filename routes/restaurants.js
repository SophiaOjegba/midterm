const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById } = require('../db/queries/restaurants');

//Show all resturants
router.get('/', (req, res) => {
  getAllRestaurants().then((restaurants) => {
    const templateVars = { restaurants };
    res.render('restaurants', templateVars);
  });
});

//Display specific restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getRestaurantById(id).then((restaurant) => {
    const templateVars = { restaurant };
    res.render('restaurant/', templateVars);
  });
});

module.exports = router;
