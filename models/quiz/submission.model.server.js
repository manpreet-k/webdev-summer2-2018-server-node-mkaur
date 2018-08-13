var mongoose = require('mongoose');
var quizzes = require('../../services/quizzes.json');
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
    console.log(submission);
    submission['grade'] = gradeSubmission(submission);
    return submissionModel.create(submission);
}

function findSubmissionsById(submissionId) {
    return submissionModel.findById(submissionId);
}

function gradeSubmission(submission){
    var marks = 0;
    var quiz = quizzes.filter(function (q) {
        return q._id === submission.quizId });;
    var questions = quiz[0].questions;
    var submissionAnswers = submission['answers'];
    var questionIds = Object.keys(submissionAnswers);
    var i;
    for(i = 0; i < questions.length; i++){
        var questionsId = questions[i]._id;
        var correctAnswer = questions[i].answer;
        console.log("--correctAnswer--");
        console.log(correctAnswer);
        var studentAnswer = submissionAnswers[questionsId];
        console.log("--studentAnswer--");
        console.log(studentAnswer);
        if(correctAnswer === studentAnswer) {
            marks = marks + parseInt(questions[i].points);
        }
    }
    return '' + marks;
}

module.exports = {
    submitQuiz: submitQuiz,
    findSubmissionsForQuiz: findSubmissionsForQuiz,
    findSubmissionsForUser: findSubmissionsForUser,
    findSubmissionsForUserForQuiz: findSubmissionsForUserForQuiz,
    findSubmissionsById:findSubmissionsById
};