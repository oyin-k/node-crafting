const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');

let should = chai.should();

let deleteAfterRun = false;

chai.use(chaiHttp);

before((done) => {

    //test if database is populated
    var User = mongoose.model('User');
    User.estimatedDocumentCount({})
        .then((count) => {
            if (count === 0) {
                //no content so safe to delete
                deleteAfterRun = true;
                //add test data
                return app.ensureTestData();
            } else {
                console.log('Test database already exists');
            }
        })
        .then(() => {
            done();
        });

});


describe('/GET users', () => {
    it('it should GET all the users', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    })
})

describe('/POST user', () => {
    it('it should not POST user without the password prop', (done) => {
        let user = {
            name: "Good boy",
            email: "ertty@gmail.com"
        }
        chai.request(app)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                done();
            })
    });

    it('it should POST user with complete details', (done) => {
        let user = {
            name: "Good boy",
            email: "ertty@gmail.com",
            password: 'fnfou44nf'
        }
        chai.request(app)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a('object');
                done();
            })
    });
})

after((done) => {
    if (deleteAfterRun) {
        console.log('Deleting test database');
        mongoose.connection.db.dropDatabase(done);
    } else {
        console.log('Not deleting test database because it already existed before run');
        done();
    }
});