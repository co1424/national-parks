const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'National Parks API',
        version: '1.0.0',
    },
    host: 'national-parks-1pmq.onrender.com', //use the public url when in production.
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


// Generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);