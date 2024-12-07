const { MongoClient } = require('mongodb');
require('dotenv').config();

let database = null;

// Function to initialize the database
const initDb = (callback) => {
    const uri = process.env.MONGO_URI; // Your MongoDB URI from the .env file
    console.log("MongoDB URI:", uri); // Log the URI to check if it's loaded correctly

    if (!uri || !uri.startsWith("mongodb")) {
        return callback(new Error("Invalid MongoDB URI"), null);
    }

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
            console.error("Error connecting to MongoDB:", err); // Log detailed error
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
