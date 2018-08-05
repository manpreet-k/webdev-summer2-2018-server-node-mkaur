const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    title: String,
    courseId: String,
    maxCap:String,
    rem:String
}, {collection: 'section'});