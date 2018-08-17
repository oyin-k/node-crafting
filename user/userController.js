let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let User = require('./user');

//add a user
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password   
    }, (err, user) => {
        if(err) return res.status(500).send('There was a problem adding the information to the database.');
        res.status(200).send(user);
    });
});

//get all users
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if(err) return res.status(500).send('There was a problem finding the user.');
        res.status(200).send(users);
    });
});

//get a single user
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return res.status(500).send('There was a problem finding this user');
        if(!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

//update user
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if(err) return res.status(500).send('There was a problem updating this user');
        res.status(200).send(user);
    });
});

//delete
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err) return res.status(500).send('There was a problem deleting the user');
        res.status(200).send(`User: ${user.name} has been deleted`);
    });
});

module.exports = router;