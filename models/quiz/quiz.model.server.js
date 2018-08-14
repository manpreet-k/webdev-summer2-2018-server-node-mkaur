var mongoose = require('mongoose');
var quizSchema = require('./quiz.schema.server');
var quizModel = mongoose.model(
    'QuizModel',
    quizSchema
);

function createQuiz(quiz) {
    return quizModel.create(quiz);
}

function findAllQuizzes() {
    return quizModel.find();
}

function findQuizById(quizId) {
    return quizModel
        .findById(quizId)
        .populate('questions')
        .exec();
}


function updateQuiz (quizId, newQuiz) {
    return quizModel.update({_id: quizId}, {
        $set: newQuiz
    })
}

function deleteQuiz(quizId) {
    return quizModel.remove({_id: quizId});
}

function addQuestion (quizId, questionId) {
    return quizModel.update({_id: quizId}, {
        $push: {questions: questionId}
    });
}


module.exports = {
    updateQuiz:updateQuiz,
    deleteQuiz:deleteQuiz,
    addQuestion:addQuestion,
    findQuizById:findQuizById,
    findAllQuizzes:findAllQuizzes,
    createQuiz:createQuiz
};