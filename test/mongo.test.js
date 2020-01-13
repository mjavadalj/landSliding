
const mongoose = require('mongoose');
const db = mongoose.connection;
const User = require('../server/api/models/user')
describe('DataBase Connection', () => {
    it('connection to database', (done) => {
        User.find({}).limit(10).then(() => { return done(); })
    })
});