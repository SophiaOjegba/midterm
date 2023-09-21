// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();
const cookieSession = require('cookie-session')
const { MessagingResponse } = require('twilio').twiml;
const {sendMessage} = require ('./service/twilioService')

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


app.use('/orders', ordersRoutes);
app.use('/admins', adminsRoutes);
app.use('/customers', customersRoutes);
app.use('/menus', menusRoutes);
app.use('/order_items', order_itemsRoutes);
app.use('/order_status', order_statusRoutes);
app.use('/restaurants', restaurantsRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

// Login
app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/');
});

app.post('/time', (req, res) => {
  sendMessage(`Estimated Time: ${req.YOUR_OBJECT_KEY_HERE} minutes}`)
});

app.post('/ready', (req, res) => {
  sendMessage("Order is ready")
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
