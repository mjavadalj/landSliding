const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const request = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    title: {
        type: String,
        enum: ['typeOne', 'typeTwo'], //esmaro ok kon
        required: true
    },
    status: {
        type: String,
        enum: ['notSeen', 'seen', 'inProgress', 'closed'],
        default: 'notSeen'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});

module.exports = mongoose.model('Request', request);