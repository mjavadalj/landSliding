const joi = require('@hapi/joi');

const schema = joi.object({
    username: joi.string()
        .alphanum()
        .min(4)
        .max(15)
        .required(),
    password: joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{4,})")),
    confirmPassword: joi.ref('password'),
    email: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com'] }
    })
}).with('password', 'confirmPassword');


module.exports.signupValidator = async (req) =>
    await schema.validateAsync({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword

    });

