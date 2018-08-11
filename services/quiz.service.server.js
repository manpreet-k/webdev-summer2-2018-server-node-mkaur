module.exports = app => {
    var quizzes = require('./quizzes.json');
    var submissionModel = require('../models/quiz/submission.model.server');

    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.post('/api/quiz/:quizId', submitQuiz);

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
        var quizId = req.params.quizId;
        submissionModel
            .submitQuiz(submission, quizId, 'alice')
            .then(function (submission) {
                res.json(submission);
            })
    }
};