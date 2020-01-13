const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const user = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    username: {
        type: String,
        unique: true,
        minlength: [4, 'username must be longer'],
        required: [true, 'username is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
});

module.exports = mongoose.model('User', user);