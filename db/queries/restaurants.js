//all restaurant related queries
const client = require('../connection');


const getAllRestaurants = () => {
  return client.query('SELECT * FROM restaurants;')
    .then((results) => {
      const rows = results.rows;
      console.log(rows);
      return rows;
    });
};

module.exports = {
  getAllRestaurants
}