const { ObjectId } = require('mongodb');

const dbName = 'contact_db';
const collectionName = 'contact';

async function getContactById(client, contactId){
  const result = await client.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(contactId) });
  console.log(result);

  return result;
}

module.exports = getContactById;