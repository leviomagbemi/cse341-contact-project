const client = require('../dataAccess/connection.js')
const {getContacts, getContactById }=  require('../dataAccess/contact.js');

const getContactsData = async (req, res) => {
  try {
    const data = await getContacts(client);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

const getContactDataById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const data = await getContactById(client, contactId);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

module.exports = { getContactsData, getContactDataById };