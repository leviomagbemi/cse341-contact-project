require('dotenv').config()

const express = require('express');
const mongoClient = require('./dataAccess/connection.js');
const contacts = require('./routes/contactRoute.js');

const app = express();

const serverPort = process.env.PORT;

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
