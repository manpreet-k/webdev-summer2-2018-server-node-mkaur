var mongoose = require('mongoose');
var submissionSchema = require('./submission.schema.server');
var submissionModel = mongoose.model(
    'SubmissionModel',
    submissionSchema
);

function findSubmissionsForQuiz(quizId) {
    return submissionModel.find({quiz: quizId}).populate('student');
}

function findSubmissionsForUser(studentId) {
    return submissionModel.find({student: studentId});
}

function findSubmissionsForUserForQuiz(quizId, studentId) {
    return submissionModel.find({student: studentId, quiz: quizId}).populate('student');
}

function submitQuiz(submission) {
    submission['grade'] = gradeSubmission(submission);
    return submissionModel.create(submission);
}

function findSubmissionsById(submissionId) {
    return submissionModel.findById(submissionId);
}

function gradeSubmission(submission){
    var marks = 0;
    var questions = submission['quiz']['questions'];
    var submissionAnswers = submission['answers'];
    var i;
    for(i = 0; i < questions.length; i++){
        var questionsId = questions[i]._id;
        var correctAnswer = questions[i].answer;
        var studentAnswer = submissionAnswers[questionsId];
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