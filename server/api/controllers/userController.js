const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('../middlewares/validator');
const mongoose = require('mongoose');
const logger = require('../middlewares/logger');
const passport = require('passport');

module.exports.signup = (req, res, next) => {
    logger.signupLogger(req);

    if (process.env.NODE_ENV == 'production ' || process.env.NODE_ENV == 'test ') { //! space akharesh moheme |:

        validator.signupValidator(req)

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
                                    new User({
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


module.exports.login = (req, res) => {
    logger.loginLogger(req);
    if (process.env.NODE_ENV == "production " || process.env.NODE_ENV == "test ") {
        User.find({ email: req.body.email })
            .then(user => {
                if (user.length < 1) {
                    return res.status(400).json({
                        message: "user don't exist"
                    });
                }
                else {
                    bcrypt.compare(req.body.password, user[0].password)
                        .then(compareResult => {
                            if (compareResult == false) {
                                return res.status(400).json({
                                    message: "email or password is wrong"
                                })
                            } else {
                                req.login(user[0]._id).then(() => {
                                    return res.status(200).json({
                                        message: "login successful",
                                        user: user[0]
                                    })
                                })
                                    .catch(passportLoginFailed => {
                                        return res.status(500).json({
                                            message: "passport login failed",
                                            error: passportLoginFailed
                                        })
                                    })

                            }
                        })
                        .catch(compareError => {
                            return res.status(500).json({
                                message: "comparing passwords failed - internal error",
                                error: compareError
                            })
                        });
                }
            })
            .catch(findUserFailed => {
                return res.status(500).json({
                    message: "finding user failed - internal error",
                    error: findUserFailed
                })
            });


    }





    else if (process.env.NODE_ENV == "development ") {
        User.find({ email: req.body.email })
            .then(user => {
                if (user.length < 1) {
                    return res.status(400).json({
                        message: "dev user don't exist"
                    });
                }
                else {
                    if (req.body.password != user[0].password) {
                        return res.status(400).json({
                            message: "dev email or password is wrong"
                        })
                    } else {
                        req.login(user[0]._id, (error) => {
                            if (error) throw error;
                            return res.status(200).json({
                                messgae: "login successful",
                                info: user[0]
                            })
                        });
                    }

                }
            })
            .catch(findUserFailed => {
                return res.status(500).json({
                    message: "dev finding user failed - internal error",
                    error: findUserFailed
                })
            });
    }

}

passport.serializeUser(function (userId, done) {
    done(null, userId);
});

passport.deserializeUser(function (userId, done) {
    done(null, userId);
});