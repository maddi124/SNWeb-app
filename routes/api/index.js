const router = require('express').Router();
//const thoughtRoutes = require('./Thought-routes');
const userRoutes = require('./User-routes');

router.use('/users', userRoutes);

module.exports = router;