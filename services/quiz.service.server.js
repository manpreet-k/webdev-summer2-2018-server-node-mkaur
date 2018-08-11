module.exports = app => {
    var quizzes = require('./quizzes.json');
    app.get('/api/quiz', findAllQuizzes);

    function findAllQuizzes(req, res) {
        res.json(quizzes);
    }
};