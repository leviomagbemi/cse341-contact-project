require('dotenv').config()

const express = require('express');
const mongoClient = require('./dataAccess/connection.js');
const contacts = require('./routes/contactRoute.js');
const swaggerUi = require('swagger-ui-express');
const cors = require('express-cors')
const swaggerDocument = require('./swagger.json');

const app = express();

const serverPort = process.env.PORT;

app.use(cors({
    allowedOrigins: [
        'https://cse341-contact-project-qd96.onrender.com'
    ]
}));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/contacts', contacts);

//connect to database and start server
(async () => {
  try {
    await mongoClient.connect();

    app.listen(serverPort, () => {
      console.log('Server running...');
    });

    // Gracefully shutdown server 
    process.on('SIGINT', async () => {
      await mongoClient.close();
      process.exit();
    })
  } catch (error) {
    console.error(`Failed to connect to database: ${error}`);
    process.exit(1);
  }
})();