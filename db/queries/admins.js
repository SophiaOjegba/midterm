const db = require('../connection');

// All admins
const getAllAdmins = () => {
  return db.query('SELECT * FROM admins;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      throw error;
    });
};

//New admin
const insertAdmin = (restaurantId, name) => {
  return db.query('INSERT INTO admins (restaurant_id, name) VALUES ($1, $2) RETURNING *;', [restaurantId, name])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

//update an admin's name by ID
const updateAdminName = (adminId, newName) => {
  return db.query('UPDATE admins SET name = $2 WHERE id = $1 RETURNING *;', [adminId, newName])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

// delete an admin by ID
const deleteAdminById = (adminId) => {
  return db.query('DELETE FROM admins WHERE id = $1;', [adminId])
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllAdmins,
  insertAdmin,
  updateAdminName,
  deleteAdminById,
};
