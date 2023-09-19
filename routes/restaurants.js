/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  insertRestaurant,
  updateRestaurant,
  deleteRestaurantById,
} = require('../db/queries/restaurants'); // Import your restaurants queries

// all restaurants
router.get('/restaurants', (req, res) => {
  getAllRestaurants()
    .then(restaurants => {
      res.json({ restaurants });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// new restaurant
router.post('/restaurants', (req, res) => {
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
router.put('/restaurants/:restaurantId', (req, res) => {
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
router.delete('/restaurants/:restaurantId', (req, res) => {
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

