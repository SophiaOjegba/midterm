 // Your database connection code
 const db = require('../connection');


 // Browse all available menus for ordering
const getAllAvailableMenus = () => {
  return db.query('SELECT menus.id, menus.name, menus.description, menus.price FROM menus WHERE menus.quantity > 0;')
    .then(data => {
      return data.rows;
    });
};

// See all restaurants
const getAllRestaurants = () => {
  return db.query('SELECT restaurants.id, restaurants.name, restaurants.country, restaurants.province, restaurants.street, restaurants.city, restaurants.postal_code FROM restaurants;')
    .then(data => {
      return data.rows;
    });
};

// See more details about a menu item
const getMenuDetails = (menuId) => {
  return db.query('SELECT menus.name, menus.description, menus.price FROM menus WHERE menus.id = $1;', [menuId])
    .then(data => {
      return data.rows[0];
    });
};


module.exports = {
  getAllAvailableMenus,
  getAllRestaurants,
  getMenuDetails,
};
