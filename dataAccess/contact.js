// Database queries
const Contact = require('../models/Contact');

// Get all contacts
async function getContacts(){
  const results = await Contact.find({});
  return results;
}

// Get single contact by ID
async function getContact(contactId){
  const result = await Contact.findOne({ _id: contactId });

  return result;
}

// // Create a new contact
async function createNewContact(document){
  const result = await Contact.create(document);
  return result;
}


// Update a contact by id
async function updateContact(contactId, document){
  const result = await Contact.findByIdAndUpdate(contactId, document, {
    new: true,
    runValidators: true
  });

  return result;
}

// Delete a contact by id
async function deleteContact(contactId){
  const result = await Contact.findByIdAndDelete(contactId);

  return result;
}

module.exports = { getContacts, getContact, createNewContact, updateContact, deleteContact };
