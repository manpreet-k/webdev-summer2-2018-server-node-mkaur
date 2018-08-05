const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SectionModel'}]
}, {collection: 'user'});