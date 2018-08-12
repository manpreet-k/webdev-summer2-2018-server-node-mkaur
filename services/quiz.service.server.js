module.exports = app => {
    var quizzes = require('./quizzes.json');
    var submissionModel = require('../models/quiz/submission.model.server');

    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.post('/api/quiz/:quizId', submitQuiz);
    app.get('/api/quiz/:quizId/submissions', findSubmissionsForQuiz);
    app.get('/api/quiz/:quizId/submissions/:username', findSubmissionsForForStudentForQuiz);
    app.get('/api/quiz/submissions/:submissionId', findSubmissionById);

    function findAllQuizzes(req, res) {
        res.json(quizzes);
    }

    function findQuizById(req, res) {
        var quiz = quizzes.filter(function (q) {
            return q._id == req.params.quizId });
        res.json(quiz[0]);
    }

    function submitQuiz(req, res) {
        var submission = req.body;
        submissionModel
            .submitQuiz(submission)
            .then(function (response) {
                res.json(response);
            })
    }

    function findSubmissionsForQuiz(req, res) {
        var quizId = req.params.quizId;
        submissionModel
            .findSubmissionsForQuiz(quizId)
            .then(function (submissions) {
                res.json(submissions);
            });
    }

    function findSubmissionsForForStudentForQuiz(req, res) {
        var quizId = req.params.quizId;
        var username = req.params.username;
        submissionModel
            .findSubmissionsForUserForQuiz(quizId, username)
            .then(function (submissions) {
                res.json(submissions);
            });
    }

    function findSubmissionById(req, res) {
        var submissionId = req.params.submissionId;
        submissionModel
            .findSubmissionsById(submissionId)
            .then(function (submission) {
                res.json(submission);
            });
    }
};