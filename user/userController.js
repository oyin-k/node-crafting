const express = require('express');
const router = express.Router();
const User = require('./user');

//add a user
router.post('/user', (req, res, next) => {
    User.create(req.body)
        .then((user)=> {
            res.send(user);
        }).catch(next);
});

//get all users
router.get('/users', (req, res, next) => {
    User.find({})
        .then((users) => {
            res.send(users);
        }).catch(next);
});

//get a single user
router.get('/user/:id', (req, res, next) => {
    User.findById({_id: req.params.id})
        .then((user) => {
            res.send(user);
        }).catch(next);
});

//update user
router.put('/user/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => {
            res.send(user);
        }).catch(next);
});

//delete
router.delete('/user/:id', (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.id})
        .then((user) => {
            res.send(user);
        }).catch(next);
});

module.exports = router;