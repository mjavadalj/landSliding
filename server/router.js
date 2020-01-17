const router = require('express').Router();
const userRoutes = require('./api/routes/userRoutes');
const requestRoutes = require('./api/routes/requestRoutes');

router.use('/user', userRoutes);
router.use('/request', requestRoutes)

module.exports = router;