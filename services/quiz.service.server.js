module.exports = app => {
    var quizzes = require('./quizzes.json');

    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);

    function findAllQuizzes(req, res) {
        let result = JSON.parse(JSON.stringify(quizzes));
        console.log(result);
        result.forEach(function(v){ delete v.questions });
        console.log(quizzes);
        res.json(result);
    }

    function findQuizById(req, res) {
        var quiz = quizzes.filter(function (q) {
            return q._id == req.params.quizId });
        res.json(quiz[0]);
    }
};