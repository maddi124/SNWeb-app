const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require ('../../controllers/User-controller');
// http://localhost:3001/api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);
// http://localhost:3001/api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
//http://localhost:3001/api/users/:userid/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

    
module.exports = router;