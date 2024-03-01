const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Get all users
router.get('/', usersController.getUsers);

// Create a new user
router.post('/', usersController.createUser);

// Delete a user by ID (restricted to admin)
router.delete('/:id',verifyToken, (req,res) =>{
    usersController.deleteUser(req,res);
});

// Update a user by ID (restricted to admin)
router.put('/:id', usersController.updateUser);

module.exports = router;