const router = require('express').Router();
const thoughtRoutes = require('./Thought-routes');
const userRoutes = require('./User-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;