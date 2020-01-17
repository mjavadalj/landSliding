const router = require('express').Router();
const userController = require('../controllers/userController');
const logger = require('../middlewares/logger');

router.post('/signup', logger.userLogger, userController.signup);
router.post('/login', logger.userLogger, userController.login);




// * just for test


router.get('/get', (req, res) => {

    console.log(req.user);
    console.log("==========================");
    console.log(req.isAuthenticated());
    return res.status(200);
});

module.exports = router;