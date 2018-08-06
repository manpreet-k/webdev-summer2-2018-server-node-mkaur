const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    title: String,
    courseId: Number,
    maxCap:Number,
    rem:Number
}, {collection: 'section'});