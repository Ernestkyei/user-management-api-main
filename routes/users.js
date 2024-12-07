const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// Routes for user operations
router.get('/', usersController.getAll);         // Get all users
router.get('/:id', usersController.getSingle);   // Get a single user by ID
router.post('/', usersController.createUser);    // Create a new user
router.put('/:id', usersController.updateUser);  // Update an existing user by ID
router.delete('/:id', usersController.deleteUser); // Delete a user by ID (fixed parameter)

module.exports = router;
