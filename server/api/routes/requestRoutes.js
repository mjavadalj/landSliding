const router = require('express').Router();
const requestController = require('../controllers/requestController');
const authentication = require('../middlewares/authentication');
const logger = require('../middlewares/logger');

if (process.env.NODE_ENV == 'production ') {
    router.post('/addRequest', authentication.authenticated, logger.requestLogger, requestController.addRequest);

    router.get('/getUserRequests', authentication.authenticated, logger.requestLogger, requestController.getUserRequests);
    router.post('/getRequest', authentication.authenticated, logger.requestLogger, requestController.getRequest);

} else if (process.env.NODE_ENV == 'development ' || process.env.NODE_ENV == 'test ') {

    router.post('/addRequest', logger.requestLogger, requestController.devAddRequest);

    router.post('/getUserRequests', logger.requestLogger, requestController.devGetUserRequests);
    router.post('/getRequest', logger.requestLogger, requestController.devGetRequest);

}

module.exports = router;