const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: { type: String, default: 'null' },
    email: { type: String, unique: true},
    password: { type: String },
    token: { type: String }
});

const UserAuth = mongoose.model('UserAuth', userSchema); 
module.exports = UserAuth;
