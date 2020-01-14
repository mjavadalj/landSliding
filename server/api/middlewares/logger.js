
const bunyan = require('bunyan');

const path = require('path');
const log = bunyan.createLogger({

    name: "User Logger",
    streams: [{
        type: 'rotating-file',
        path: path.join(__dirname + "/../logs.log"),
        period: '10d',
    },
    {
        level: 'info',
        stream: process.stdout
    }]
});
module.exports.signupLogger = (req) => {
    log.info({ loggerName: "Sign Up", url: req.originalUrl, requestBody: req.body });
    return;
};
module.exports.loginLogger = (req) => {
    log.info({ loggerName: "Login", url: req.originalUrl, requestBody: req.body });
    return;
};