const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');



// describe('DataBase Connection', () => {
//     it('connection to database', (done) => {
//         if (mongoose.connection.readyState == 1) {
//             done();
//         }
//     });
// });