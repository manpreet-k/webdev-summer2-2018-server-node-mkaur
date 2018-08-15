var mongoose = require('mongoose');
var submissionSchema = mongoose.Schema({
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        },
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuizModel'
        },
        answers: Object,
        grade: String
    },
    {timestamps: true},
    {collection: 'submissions'});
module.exports = submissionSchema;