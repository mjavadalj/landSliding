
const passport = require('passport');

module.exports.authenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else {
        return res.status(400).json({
            message: "you are not allowed - please login"
        })
    }
}