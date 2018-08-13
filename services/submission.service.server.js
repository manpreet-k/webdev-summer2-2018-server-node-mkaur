module.exports = app => {
    var submissionModel = require('../models/quiz/submission.model.server');

    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/quiz/:quizId/submission', findSubmissionsForQuiz);
    app.get('/api/quiz/:quizId/submissions/:username', findSubmissionsForForStudentForQuiz);
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmissionById);

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