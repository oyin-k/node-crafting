const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db = require('./db');
const UserController = require('./user/userController');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//initialize routes
app.use('/api', UserController);

//handling 404 error and passing it to the error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.status(404).send({error: 'Sorry what you are looking for does not exist'});
    next(err);
})

//error handler
app.use((err, req, res, next) => {
    res.status(500).send({error: err.message})
})

module.exports = app;