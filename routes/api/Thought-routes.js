const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/Thought-controller');
//http://localhost:3001/api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);
//http://localhost:3001/api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
//http://localhost:3001/api/thoughts/:thoughtId/reactions
router
    .route('/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)


module.exports = router;


















module.exports = router;