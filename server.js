// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

////////////////////////////////////
//Routes
///////////////////////////////////

////////////////////////////////////
//Routes
///////////////////////////////////

// Add all routes here
const ordersRoutes = require('./routes/orders');
const adminsRoutes = require('./routes/admins');
const customersRoutes = require('./routes/customers');
const menusRoutes = require('./routes/menus');
const order_itemsRoutes = require('./routes/order_items');
const order_statusRoutes = require('./routes/order_status');
const restaurantsRoutes = require('./routes/restaurants');


//API
const userApiRoutes = require('./routes/users-api');
const menusRoutes = require('./routes/menus');
const cartRoutes = require('./routes/menus');
const restaurantRoutes = require('./routes/restaurants');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/orders', ordersRoutes);
app.use('/admins', adminsRoutes);
app.use('/customers', customersRoutes);
app.use('/menus', menusRoutes);
app.use('/order_items', order_itemsRoutes);
app.use('/order_status', order_statusRoutes);
app.use('/restaurants', restaurantsRoutes);


app.use('/menus', menusRoutes);
app.use('/cart', cartRoutes);
app.use('/restaurants', restaurantRoutes);
// Note: mount other resources here, using the same pattern above

//API
app.use('/api/users', userApiRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
