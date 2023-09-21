//all menus related queries
const client = require('../connection');

const getAllMenus = () => {
  return client.query('SELECT * FROM menus;')
    .then((results) => {
      const rows = results.rows;
      console.log(rows);
      return rows;
    });
};

const getMenuById = (id) => {
  return client.query('SELECT * FROM menus WHERE id = $1;', [id])
    .then((results) => {
      const rows = results.rows;
      const record = rows[0];
      console.log(record);
      return record;
    });
};



module.exports = {
  getAllMenus,
  getMenuById
};