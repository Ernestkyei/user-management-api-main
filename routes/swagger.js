const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');  // Ensure this path is correct

router.use('/api-docs', swaggerUi.serve);  // Swagger UI at /api-docs
router.get('/api-docs', swaggerUi.setup(swaggerDocument));  // Serve the generated Swagger documentation

module.exports = router;
