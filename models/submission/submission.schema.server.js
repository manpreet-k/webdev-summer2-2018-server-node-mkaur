var mongoose = require('mongoose');
var submissionSchema = mongoose.Schema({
    username: String,
    quizId: String,
    answers: Object,
    grade: String
},
    {timestamps: true},
    {collection: 'submissions'});
module.exports = submissionSchema;