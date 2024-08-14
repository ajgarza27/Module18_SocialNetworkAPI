const express = require('express');
const router = express.Router();
const { getAllUsers, createNewUser, getSingleUser, updateSingleUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');

// Define routes for users
router.get('/', getAllUsers);
router.post('/', createNewUser);

// Define routes for a specific user
router.get('/:id', getSingleUser);
router.put('/:id', updateSingleUser);
router.delete('/:id', deleteUser);

// Define routes for user friends
router.post('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;