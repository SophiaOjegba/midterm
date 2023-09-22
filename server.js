// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();
const cookieSession = require('cookie-session')
const {sendMessage} = require ('./service/twilioService')
const {completedOrder} = require ('./db/queries/order_items')

app.set('view engine', 'ejs');

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

app.use(cookieSession({
  name: 'session',
  keys: ['sponge'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// Add all routes here
const ordersRoutes = require('./routes/orders');
const adminsRoutes = require('./routes/admins');
const customersRoutes = require('./routes/customers');
const menusRoutes = require('./routes/menus');
const order_itemsRoutes = require('./routes/order_items');
const order_statusRoutes = require('./routes/order_status');
const restaurantsRoutes = require('./routes/restaurants');
const aboutRoutes = require('./routes/about')


app.use('/orders', ordersRoutes);
app.use('/admins', adminsRoutes);
app.use('/customers', customersRoutes);
app.use('/menus', menusRoutes);
app.use('/order_items', order_itemsRoutes);
app.use('/order_status', order_statusRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/about', aboutRoutes);

app.get('/', (req, res) => {
  // If user is logged in {pass userData}
  // If user is not logged in {pass emptyUserData}
  //Need to look for user
  const customer = {
    name : 'John'
  }
  const templatvars = {
    customer
  }
  res.render('index',  templatvars );
});

// Login
app.get('/login', (req, res) => {

  // send the user somewhere
  const customer = {
    name : 'John'
  }
  const templatvars = {
    customer
  }

  res.render(`index`, templatvars );
});

app.post('/logout', (req, res) => {

  const customer = {
    name : null
  }
  const templatvars = {
    customer
  }

  res.render(`index`, templatvars );
});

app.post('/time', (req, res) => {
  sendMessage(`Estimated Time: ${req.body.time} minutes}`)
});

app.post('/ready', (req, res) => {
  const order_item_id = req.body.order_item_id
  completedOrder(order_item_id)
  .then (response => {
    sendMessage("Order is ready")
  })
});

app.post('/order_now', (req, res) => {
  sendMessage("Order Has been placed by a customer")
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
