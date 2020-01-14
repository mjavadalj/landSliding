const router = require('express').Router();
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/get', (req, res) => {

    console.log(req.user);
    console.log("==========================");
    console.log(req.isAuthenticated());
    return res.status(200);
});


module.exports = router;