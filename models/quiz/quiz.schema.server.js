var mongoose = require('mongoose');
var quizSchema = mongoose.Schema({
        name: String,
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        }]
    },
    {timestamps: true},
    {collection: 'quizzes'});
module.exports = quizSchema;