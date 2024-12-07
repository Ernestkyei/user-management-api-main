    const { ObjectId } = require('mongodb');
    const mongodb = require('../data/database');

    // Fetch all users
    const getAll = async (req, res) => {
        try {
            const db = mongodb.getDb();  // Get the database instance
            const users = await db.collection('usersApi').find().toArray(); // Fetch all users from 'usersApi' collection
            res.status(200).json(users);  // Return all users as response
        } catch (err) {
            console.error('Error retrieving users:', err.message);
            res.status(500).json({ error: 'Failed to retrieve users', details: err.message });
        }
    };

    // Fetch a single user by custom 'id' field (string)
    const getSingle = async (req, res) => {
        try {
            const userId = req.params.id;  // Get the userId from the URL parameter
            console.log('Looking for user with _id:', userId);  // Log the userId for debugging

            if (!userId) {
                return res.status(400).json({ error: 'ID parameter is required' });
            }

            // Convert the userId (string) to an ObjectId
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Invalid ObjectId format' });
            }

            // Get the database instance
            const db = mongodb.getDb();

            // Find the user by the MongoDB _id field
            const user = await db.collection('usersApi').findOne({ _id: new ObjectId(userId) });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Return the user details as response
            res.status(200).json(user);
        } catch (err) {
            console.error('Error retrieving user:', err.message);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        }
    };
    // Create a new user
    const createUser = async (req, res) => {
        try {
            const user = {
                id: req.body.id,  // Use custom 'id' field for user
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,  // Ensure password is hashed in production
                role: req.body.role || 'user',  // Default role is 'user' if not provided
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const db = mongodb.getDb();  // Get the database instance
            const result = await db.collection('usersApi').insertOne(user);  // Insert the user into the collection

            res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
        } catch (err) {
            console.error('Error creating user:', err.message);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        }
    };

    // Update an existing user by custom 'id' field
    const updateUser = async (req, res) => {
        try {
            const userId = req.params.id; // ID from request parameters

            if (!userId) {
                return res.status(400).json({ error: 'ID parameter is required' });
            }

            // Validate and convert the userId to ObjectId
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Invalid ObjectId format' });
            }

            const updates = {
                ...(req.body.name && { name: req.body.name }),
                ...(req.body.email && { email: req.body.email }),
                ...(req.body.role && { role: req.body.role }),
                updatedAt: new Date(), // Always update the timestamp
            };

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ error: 'No fields to update provided' });
            }

            const db = mongodb.getDb(); // Get the database instance
            const result = await db.collection('usersApi').updateOne(
                { _id: new ObjectId(userId) }, // Find user by MongoDB `_id`
                { $set: updates } // Set the fields to update
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Fetch the updated user to return in response
            const updatedUser = await db.collection('usersApi').findOne({ _id: new ObjectId(userId) });

            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (err) {
            console.error('Error updating user:', err.message);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const userId = req.params.id; // Get the user ID from the URL parameters

            if (!userId) {
                return res.status(400).json({ error: 'ID parameter is required' });
            }

            // Validate the ObjectId format
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Invalid ObjectId format' });
            }

            const db = mongodb.getDb(); // Get the database instance
            console.log('Attempting to delete user with ID:', userId);  // Log userId for debugging

            // Query using _id, and ensure we're using ObjectId for correct comparison
            const result = await db.collection('usersApi').deleteOne({ _id: new ObjectId(userId) });

            if (result.deletedCount === 0) {
                console.log('No user found with the given ID');  // Log when no match is found
                return res.status(404).json({ error: 'User not found' });
            }

            console.log('User deleted successfully:', userId);  // Log when delete is successful
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err.message);  // Log error message for debugging
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
    };



    // Export all functions
    module.exports = {
        getAll,
        getSingle,
        createUser,
        updateUser,
        deleteUser,
    };
