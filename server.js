const express = require('express');
const mongodb = require('./data/database'); // Ensure correct MongoDB utility
const app = express();
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env

const port = process.env.PORT || 8080;

// Middleware for parsing JSON
app.use(express.json());

app.use(cors({
    origin: '*',  // Allow requests from any origin (you can set specific origins instead of '*')
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));


app.use(cors({
    origin: '*',  // Allow requests from any origin (you can set specific origins instead of '*')
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// CORS headers configuration
app.use((req, res, next) => {
    const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';  // Set allowed origin from env or allow all
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});




// Routing middleware
app.use('/', require('./routes'));

// Initialize the database and start the server
mongodb.initDb((err, db) => {
    if (err) {
        console.error('Error initializing database:', err.message);
        process.exit(1);  // Exit with failure if database connection fails
    } else {
        console.log('Database connected successfully.');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});
