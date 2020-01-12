const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/signup', userController.signup);


module.exports = router;