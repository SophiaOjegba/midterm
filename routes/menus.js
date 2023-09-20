const express = require('express');
const router = express.Router();
const { getAllMenus, getMenuById } = require('../db/queries/menus');

//Show all menus
router.get('/', (req, res) => {
  getAllMenus().then((menus) => {
    const templateVars = { menus };
    res.render('menus', templateVars);
  });
});

//Display specific menu
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getMenuById(id).then((menu) => {
    const templateVars = { menu };
    res.render('cart', templateVars);
  });
});

module.exports = router;