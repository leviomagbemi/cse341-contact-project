const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact API',
    description: 'CSE341 Contact API Project'
  },
  host: 'https://cse341-contact-project-qd96.onrender.com'
};

const outputFile = './swagger.json';
const routes = ['./app.js'];


swaggerAutogen(outputFile, routes, doc);