const router = require('express').Router();
const requestController = require('../controllers/requestController');
const authetication = require('../middlewares/authentication');
const logger = require('../middlewares/logger');

if (process.env.NODE_ENV == "production ") {
    router.post('/addRequest', authetication.authenticated, logger.requestLogger, requestController.addRequest);

    router.get('/getUserRequests', authetication.authenticated, logger.requestLogger, requestController.getUserRequests);
    router.post('/getRequest', authetication.authenticated, logger.requestLogger, requestController.getRequest);

} else if (process.env.NODE_ENV == "development " || process.env.NODE_ENV == "test ") {

    router.post('/addRequest', logger.requestLogger, requestController.addRequest);

    router.post('/getUserRequests', logger.requestLogger, requestController.getUserRequests);
    router.post('/getRequest', logger.requestLogger, requestController.getRequest);

}

module.exports = router;