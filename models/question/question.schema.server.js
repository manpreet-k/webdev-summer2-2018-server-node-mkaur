var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
        type: String,
        title: String,
        points: String,
        blanks: Object,
        answer: Object,
        description: String,
        options: Object
    },
    {timestamps: true},
    {collection: 'questions'});
module.exports = questionSchema;