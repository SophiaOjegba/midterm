const express = require('express');
const router = express.Router();


//all about
router.get('/', (req, res) => {
  const customer = {
    name: 'John'
  };

  res.render('about', { customer });
});
