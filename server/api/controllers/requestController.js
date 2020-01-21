const mongoos = require('mongoose');
const Request = require('../models/request');
const User = require('../models/user')


//* for production
module.exports.addRequest = (req, res) => {
    new Request({
        _id: mongoos.Types.ObjectId(),
        user: req.user._id,
        title: req.body.title,
        location: req.body.location
    }).save().then(addedRequest => {
        User.findOneAndUpdate({ _id: req.user._id },
            {
                $push: { requests: addedRequest._id }
            },
            { new: true }
        ).exec().then(updated => {
            return res.status(200).json({
                message: "request added",
                addedRequest
            })
        }).catch(err => {
            return res.status(500).json({
                message: "adding request failed",
                err
            })
        });

    })
};



module.exports.getRequest = (req, res) => {
    Request.findOne({ _id: req.body.requestId })
        .then(request => {
            return res.status(200).json({
                message: "finding request successful",
                request
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: "finding request faild - internal error",
                err
            })
        })
};



//* for developmnet

module.exports.devAddRequest = (req, res) => {

    new Request({
        _id: mongoos.Types.ObjectId(),
        user: req.body.id,
        title: req.body.title,
        location: req.body.location
    }).save().then(addedRequest => {
        return res.status(200).json({
            message: "request added",
            addedRequest
        })
    }).catch(err => {
        return res.status(500).json({
            message: "adding request failed",
            err
        })
    });
};


module.exports.devGetRequest = (req, res) => {
    Request.findOne({ _id: req.body.requestId })
        .then(request => {
            return res.status(200).json({
                message: "finding request successful",
                request
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: "finding request faild - internal error",
                err
            })
        })
};