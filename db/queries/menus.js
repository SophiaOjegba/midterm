const db = require('../connection');

// all menu details
const getAllMenus = () => {
  return db.query('SELECT * FROM menus;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

//new menu item
const insertMenu = (restaurantId, name, description, price, quantity, foodImageUrl, cuisineType) => {
  return db.query('INSERT INTO menus (restaurant_id, name, description, price, quantity, food_image_url, cuisine_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [restaurantId, name, description, price, quantity, foodImageUrl, cuisineType])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

//  update a menu item
const updateMenu = (menuId, restaurantId, name, description, price, quantity, foodImageUrl, cuisineType) => {
  return db.query('UPDATE menus SET restaurant_id = $2, name = $3, description = $4, price = $5, quantity = $6, food_image_url = $7, cuisine_type = $8 WHERE id = $1 RETURNING *;', [menuId, restaurantId, name, description, price, quantity, foodImageUrl, cuisineType])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// delete a menu item by ID
const deleteMenuById = (menuId) => {
  return db.query('DELETE FROM menus WHERE id = $1;', [menuId])
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllMenus,
  insertMenu,
  updateMenu,
  deleteMenuById,
};
