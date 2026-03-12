const { ObjectId } = require('mongodb');

const dbName = 'contact_db';
const collectionName = 'contact';

async function getContacts(client){
  const results = await client.db(dbName).collection(collectionName).find({}).toArray();

  return results;
}

async function getContactById(client, contactId){
  const result = await client.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(contactId) });

  return result;
}

module.exports = { getContacts, getContactById };