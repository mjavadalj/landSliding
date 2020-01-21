const router = require('express').Router();
const userController = require('../controllers/userController');
const logger = require('../middlewares/logger');
const authentication = require('../middlewares/authentication');

router.post('/signup', logger.userLogger, userController.signup);
router.post('/login', logger.userLogger, userController.login);
router.get('/getuser', logger.userLogger, authentication.authenticated, userController.getUser);
router.get('/getUserRequests', authentication.authenticated, logger.requestLogger, userController.getUserRequests);

if (process.env.NODE_ENV == 'development ') {


    router.post('/getUserRequests', logger.requestLogger, userController.devGetUserRequests);

}


// * just for test


router.get('/get', (req, res) => {

    console.log(req.user);
    console.log("==========================");
    console.log(req.isAuthenticated());
    return res.status(200);
});

module.exports = router;