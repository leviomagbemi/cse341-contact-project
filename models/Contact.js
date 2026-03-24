const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true
  },
  favoriteColor: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  }
});

const Contact = model('Contact', contactSchema);
module.exports = Contact;
