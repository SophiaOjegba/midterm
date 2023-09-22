const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById, insertRestaurant,
  updateRestaurant,
  deleteRestaurantById, } = require('../db/queries/restaurants');

//Show all resturants
router.get('/', (req, res) => {
  const customer = {
    name : 'John'
  }
  getAllRestaurants().then((restaurants) => {
    const templateVars = { restaurants, customer };
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


// new restaurant
router.post('/', (req, res) => {
  const { name, phone, country, province, street, city, postalCode } = req.body;
  insertRestaurant(name, phone, country, province, street, city, postalCode)
    .then(restaurant => {
      res.status(201).json({ restaurant });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//update a restaurant by ID
router.put('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  const { name, phone, country, province, street, city, postalCode } = req.body;
  updateRestaurant(restaurantId, name, phone, country, province, street, city, postalCode)
    .then(restaurant => {
      if (!restaurant) {
        res.status(404).json({ error: 'Restaurant not found' });
      } else {
        res.json({ restaurant });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE a restaurant by ID
router.delete('/:restaurantId', (req, res) => {

  const restaurantId = req.params.restaurantId;
  deleteRestaurantById(restaurantId)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

