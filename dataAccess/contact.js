// Database queries
const { ObjectId } = require('mongodb');

const dbName = 'contact_db';
const collectionName = 'contact';

// Get all contacts
async function getContacts(client){
  const results = await client.db(dbName).collection(collectionName).find({}).toArray();

  return results;
}

// Get single contact by ID
async function getContact(client, contactId){
  const result = await client.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(contactId) });

  return result;
}

// Create a new contact
async function createNewContact(client, document){
  const result = await client.db(dbName).collection(collectionName).insertOne(document);

  return result;
}


// Update a contact by id
async function updateContact(client, contactId, document){
  const result = await client.db(dbName).collection(collectionName).updateOne({ _id: new ObjectId(contactId) }, { $set: document });

  return result;
}

// Delete a contact by id
async function deleteContact(client, contactId){
  const result = await client.db(dbName).collection(collectionName).deleteOne({ _id: new ObjectId(contactId) });

  return result;
}

module.exports = { getContacts, getContact, createNewContact, updateContact, deleteContact };