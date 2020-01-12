const router = require('express').Router();
const userRequest = require('./api/routes/userRoutes');

router.use('/user', userRequest);



module.exports = router;