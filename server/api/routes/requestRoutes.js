const router = require('express').Router();
const requestController = require('../controllers/requestController');
const authetication = require('../middlewares/authentication');

if (process.env.NODE_ENV == "production ") {
    router.post('/addRequest', authetication.authenticated, requestController.addRequest);

    router.get('/getUserRequests', authetication.authenticated, requestController.getUserRequests);
    router.post('/getRequest', authetication.authenticated, requestController.getRequest);

} else if (process.env.NODE_ENV == "development " || process.env.NODE_ENV == "test ") {

    router.post('/addRequest', authetication.authenticated, requestController.addRequest);

    router.post('/getUserRequests', authetication.authenticated, requestController.getUserRequests);
    router.post('/getRequest', requestController.getRequest);

}


module.exports = router;