let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let User = require('./user');

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

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if(err) return res.status(500).send('There was a problem finding the user.');
        res.status(200).send(users);
    });
});

// router.get(':/id', (req, res) => {
//     User.findById(req.params.id, (err, user) => {
//         if(e)
//     })
// })


module.exports = router;