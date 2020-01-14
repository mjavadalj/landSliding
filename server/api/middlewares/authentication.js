
const passport = require('passport');

module.exports.authenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
}