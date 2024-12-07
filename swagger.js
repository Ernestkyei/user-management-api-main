const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';  // Make sure this is the correct path
const endpointsFiles = ['./routes/*.js'];    // Update this to point to where your routes are defined

const doc = {
  info: {
    title: 'User Management API',  // Title of your API
    description: 'API documentation for user management',  // Description
  },
  host: 'https://user-management-api-main-1.onrender.com',  // Change this to your deployed API URL
  basePath: '/users',  // This should match your routes
};

// This will generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);
