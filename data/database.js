const { MongoClient } = require('mongodb');
require('dotenv').config();

let database = null;

// Function to initialize the database
const initDb = (callback) => {
    const uri = process.env.MONGO_URI; // Your MongoDB URI from the .env file
    if (database) {
        console.log("Database is already initialized");
        return callback(null, database);
    }

    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            database = client.db(); // Accessing the default database
            console.log("Database connected successfully!");
            return callback(null, database);
        })
        .catch(err => {
            return callback(err, null);
        });
};

// Function to get the database instance
const getDb = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDb,
};
