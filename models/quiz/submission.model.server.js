var mongoose = require('mongoose');
var submissionSchema = require('./submission.schema.server');
var submissionModel = mongoose.model(
    'SubmissionModel',
    submissionSchema
);

function findSubmissionsForQuiz(quizId) {
    return submissionModel.find({quizId: quizId});
}

function findSubmissionsForUser(username) {
    return submissionModel.find({username: username});
}

function findSubmissionsForUserForQuiz(quizId, username) {
    return submissionModel.find({username: username, quizId: quizId});
}

function submitQuiz(submission) {
    return submissionModel.create(submission);
}

function findSubmissionsById(submissionId) {
    return submissionModel.findById(submissionId);
}


module.exports = {
    submitQuiz: submitQuiz,
    findSubmissionsForQuiz: findSubmissionsForQuiz,
    findSubmissionsForUser: findSubmissionsForUser,
    findSubmissionsForUserForQuiz: findSubmissionsForUserForQuiz,
    findSubmissionsById:findSubmissionsById
};