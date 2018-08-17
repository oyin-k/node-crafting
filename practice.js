let express = require('express');
let app = express();
let db = require('./db');
let UserController = require('./user/userController');


app.use('/users', UserController);

module.exports = app;