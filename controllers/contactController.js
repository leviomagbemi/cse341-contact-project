const client = require('../dataAccess/connection.js')
const getContactById =  require('../dataAccess/contact.js');

const getContactData = async (req, res) => {
  try {
    
    const contactId = req.params.id;

    if(!contactId){
      return res.status(400).json({error: 'missing contactID in request'});
    }

    const data = await getContactById(client, contactId);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

module.exports = getContactData;