const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';  
const endpointsFiles = ['./routes/*.js'];     

const doc = {
  info: {
    title: 'user management api',  
    description: 'API documentation for user management api',  
  },
  host: 'localhost:8080',  
  basePath: '/users',  
};

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
