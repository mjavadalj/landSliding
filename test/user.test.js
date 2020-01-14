const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/app');
const data = require('./dataForTesting');

describe('User Tests', () => {

    it('Sign Up test - should be successful', (done) => {
        request(app)
            .post('/api/user/signup')
            .send(data.testUser)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(() => {
                    res.body.message = "user signup successful";
                })
                return done();
            })
    });
    it('Sign Up test - should be failed', (done) => {
        request(app)
            .post('/api/user/signup')
            .send({})
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                return done();
            })
    });
    it('Login test - should be successful', (done) => {
        request(app).post('/api/user/login')
            .send({ email: "javad1@test.com", password: "password1" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.info).to.exist;
                return done();
            })
    });

    it('Login test - should be failed', (done) => {
        request(app).post('/api/user/login')
            .send({ email: `javad${Math.floor(Math.random() * 100)}@test.com`, password: "password1" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                return done();
            })
    });
})