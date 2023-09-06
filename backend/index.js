const auth = require("./router/auth");
const point = require("./router/point");
const user = require("./router/user");
const category = require("./router/category");
const product = require("./router/product");
const order = require("./router/order");
const cart = require("./router/cart");
const payment = require("./router/payment");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fileUpload = require('express-fileupload');
var cors = require('cors');

app.use(cors()) // Use this after the variable declaration
app.use(fileUpload());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
  }));
  app.use( bodyParser.json({limit: '50mb'}) );
app.use('/auth', auth);
app.use('/point', point);
app.use('/user', user);
app.use('/category', category);
app.use('/product', product);
app.use('/order', order);
app.use('/cart', cart);
app.use('/payment', payment);

var server = app.listen(4001, () => console.log(`Server is starting at port ${4001}`));
