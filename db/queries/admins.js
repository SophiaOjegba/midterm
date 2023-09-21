const db = require('../connection');

// All admins
const getAllAdmins = async () => {
  try {
    const data = await db.query('SELECT * FROM admins;');
    return data.rows;
  } catch (error) {
    throw error;
  }
};

//New admin
const insertAdmin = async (restaurantId, name) => {
  try {
    const data = await db.query('INSERT INTO admins (restaurant_id, name) VALUES ($1, $2) RETURNING *;', [restaurantId, name]);
    return data.rows[0];
  } catch (error) {
    throw error;
  }
};

//update an admin's name by ID
const updateAdminName = async (adminId, newName) => {
  try {
    const data = await db.query('UPDATE admins SET name = $2 WHERE id = $1 RETURNING *;', [adminId, newName]);
    return data.rows[0];
  } catch (error) {
    throw error;
  }
};

// delete an admin by ID
const deleteAdminById = async (adminId) => {
  try {
    return await db.query('DELETE FROM admins WHERE id = $1;', [adminId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAdmins,
  insertAdmin,
  updateAdminName,
  deleteAdminById,
};
