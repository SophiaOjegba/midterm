const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const { getAllRestaurants } = require('../db/queries/resturant');  

// Endpoint to see all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

