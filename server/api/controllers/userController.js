const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('../middlewares/validator');
const mongoose = require('mongoose');
const logger = require('../middlewares/logger');

module.exports.signup = async (req, res, next) => {
    logger.signupLogger(req);
    if (process.env.NODE_ENV == 'production ') { //! space akharesh moheme |:
        await validator.signupValidator(req)
            .then(requestBody => {
                User.find({ email: requestBody.email })
                    .then(findResult => {
                        if (findResult.length > 0) {
                            return res.status(400).json({
                                message: "email already exist"
                            })
                        }
                        else if (findResult.length == 0) {
                            bcrypt.hash(requestBody.password, 10)
                                .then(hashedPassword => {

                                    console.log(hashedPassword, requestBody);
                                    const user = new User({
                                        _id: mongoose.Types.ObjectId(),
                                        username: requestBody.username,
                                        password: hashedPassword,
                                        email: requestBody.email
                                    }).save()
                                        .then(insertResult => {
                                            return res.status(200).json({
                                                message: "user signup successful",
                                                user: insertResult
                                            })
                                        })
                                        .catch(saveRecordError => {
                                            return res.status(500).json({
                                                message: "saving record in database failed.(internal error)",
                                                error: saveRecordError
                                            })
                                        })
                                })
                                .catch(hashError => {
                                    console.log(hashError, requestBody);
                                    return res.status(500).json({
                                        message: "hashing password internal error",
                                        error: hashError
                                    })
                                })
                        }
                    })
                    .catch(mongooseError => {
                        return res.status(500).json({
                            message: "mongoose find method internal error",
                            error: mongooseError
                        })
                    });
            })
            .catch(validateNotPassed => {
                return res.status(400).json({ message: validateNotPassed.details })
            });

    }
    if (process.env.NODE_ENV == 'development ') { //! space akharesh moheme |:

        User.find({ email: req.body.email })
            .then(findResult => {
                if (findResult.length > 0) {
                    return res.status(400).json({
                        message: "dev: email already exist"
                    })
                }
                else if (findResult.length == 0) {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email
                    }).save().then(devSignupResult => {
                        return res.status(200).json({
                            message: "developer signup successful"
                        })
                    }).catch(devSignupError => {
                        return res.status(200).json({
                            message: "developer signup faild!",
                            error: devSignupError
                        })
                    })
                }
            })
            .catch(mongooseError => {
                return res.status(500).json({
                    message: "dev:mongoose find method internal error",
                    error: mongooseError
                })
            });
    }

};