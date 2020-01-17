const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/app');
const data = require('./dataForTesting');
const User = require('../server/api/models/user');

describe("Request test", () => {
    it("add request", (done) => {
        User.find({})
            .limit(1)
            .then(users => {

                request(app)
                    .post('/api/request/addrequest')
                    .send(data.addRequest(users[0]))
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        return done();
                    })
            })
            .catch(err => console.log(err))
    })
    it("get a user requests", (done) => {
        User.find({})
            .limit(1)
            .then(users => {

                request(app)
                    .post('/api/request/getuserrequests')
                    .send(data.getUserRequests(users[0]))
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        return done();
                    })
            })
            .catch(err => console.log(err))
    })
    it("get a request", (done) => {
        request(app)
            .post('/api/request/getrequest')
            .send(data.getRequest)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                return done();
            })
    })
})