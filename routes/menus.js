const express = require('express');
const router = express.Router();
const {
  getAllMenus,
  insertMenu,
  updateMenu,
  deleteMenuById,
} = require('../db/queries/menus');

//all menus
router.get('/menus', (req, res) => {
  getAllMenus()
    .then(menus => {
      res.json({ menus });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// new menu
router.post('/menus', (req, res) => {
  const {
    restaurantId,
    name,
    description,
    price,
    quantity,
    foodImageUrl,
    cuisineType,
  } = req.body;
  insertMenu(restaurantId, name, description, price, quantity, foodImageUrl, cuisineType)
    .then(menu => {
      res.status(201).json({ menu });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update menu by ID
router.put('/menus/:id', (req, res) => {
  const menuId = req.params.id;
  const {
    restaurantId,
    name,
    description,
    price,
    quantity,
    foodImageUrl,
    cuisineType,
  } = req.body;
  updateMenu(menuId, restaurantId, name, description, price, quantity, foodImageUrl, cuisineType)
    .then(menu => {
      if (!menu) {
        res.status(404).json({ error: 'Menu not found' });
      } else {
        res.json({ menu });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE menu by ID
router.delete('/menus/:id', (req, res) => {
  const menuId = req.params.id;
  deleteMenuById(menuId)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
