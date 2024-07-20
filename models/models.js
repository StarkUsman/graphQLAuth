const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
  attributes: Object
});

const messageSchema = new Schema({
  text: String,
  createdBy: String,
  createdAt: String
});

const User = mongoose.model('User', userSchema); 
const Message = mongoose.model('Message', messageSchema);

module.exports = {
  User, Message
};
