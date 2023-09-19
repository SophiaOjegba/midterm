const db = require('../connection');

// all restaurant
const getAllRestaurants = () => {
  return db.query('SELECT * FROM restaurants;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

//insert a new restaurant
const insertRestaurant = (name, phone, country, province, street, city, postalCode) => {
  return db.query('INSERT INTO restaurants (name, phone, country, province, street, city, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [name, phone, country, province, street, city, postalCode])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// update a restaurant's details by ID
const updateRestaurant = (restaurantId, name, phone, country, province, street, city, postalCode) => {
  return db.query('UPDATE restaurants SET name = $2, phone = $3, country = $4, province = $5, street = $6, city = $7, postal_code = $8 WHERE id = $1 RETURNING *;', [restaurantId, name, phone, country, province, street, city, postalCode])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// delete a restaurant by ID
const deleteRestaurantById = (restaurantId) => {
  return db.query('DELETE FROM restaurants WHERE id = $1;', [restaurantId])
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllRestaurants,
  insertRestaurant,
  updateRestaurant,
  deleteRestaurantById,
};
