// // import external moduels
// ==========================================================================
var app = require('express')();
var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
var multer = require('multer');
var fs = require('fs');
var ejs = require('ejs');
var path = require('path'); // node path module
var port = process.env.PORT || 1338;
var cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
// initialize variables
// ==============================================================================
app.set('view engine', 'ejs');
mongoose.Promise = global.Promise; // fix for "DeprecationWarning: Mongoose: mpromise replacement"
// set envrioment variables if production is false
if (process.env.NODE_ENV !== 'production') {
  process.env.url = 'http://localhost:3000/'; //  Development
  process.env.db = 'mongodb://doctor:duggal 77@ds113454.mlab.com:13454/doctors-portal'; // Development
  process.env.jwtsecret = '$2a$06$GXmQiERBvYRGD91bIJLWRO2m4WGUpj7IRuSuve3pZ3B5rRtLIzm2G';
}
// database connection
// =============================================================================
// = ==========
mongoose.connect(process.env.db,{
    useMongoClient: true ,
    poolSize: 20,
    keepAlive: 300000,
  }); // database conneciton to azure pro database
mongoose
.connection
.once('connected', () => console.log('Connected to database'));
// configure middlewear
// =============================================================================
// = logger
app.use(morgan('dev'));
// json manipulation on server side
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport initializtion routes
// =============================================================================
// = ==
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/unauthenticated.js')); //routes which does't require token authentication
require('./config/passport')(passport);
app.use('/api', passport.authenticate('jwt', { session: false }), require('./routes/authenticated.js'));
app.get('*', (req, res) => res.status(404).send({ error: 'page not found' }));
app.listen(port, function () {
  console.log('listening on *:', port);
});
