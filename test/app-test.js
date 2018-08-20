const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

let should = chai.should();

chai.use(chaiHttp);

// describe('NodeAPI', () => {
//     it('no valid route', (done) => {
//         chai.request(app)
//             .post('/api/users')
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 done();
//             })
//     })
// })

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
                // res.body.user.should.have.property('name');
                // res.body.user.should.have.property('email');
                // res.body.user.should.have.property('password');
                done();
            })
    })
})