// routes/index.js
const router = require('express').Router();
const userRoutes = require('./api/users');
const thoughtRoutes = require('./api/thoughts');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;