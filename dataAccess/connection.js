const { MongoClient } = require('mongodb');
const uri = process.env.CONNECTIONSTRING;

const client = new MongoClient(uri);

module.exports = client;