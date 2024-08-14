const express = require('express');
const router = express.Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const usersRoutes = require('./usersRoutes');

// Set up routes
router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;