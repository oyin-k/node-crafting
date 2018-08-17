const express = require('express');
const app = express();
const db = require('./db');
const UserController = require('./user/userController');


app.use('/api', UserController);

module.exports = app;