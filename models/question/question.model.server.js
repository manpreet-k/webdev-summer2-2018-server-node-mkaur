var mongoose = require('mongoose');
var questionSchema = require('./question.schema.server');
var questionModel = mongoose.model(
    'QuestionModel',
    questionSchema
);

function createQuestion(question) {
    return questionModel.create(question);
}

function findAllQuestions() {
    return questionModel.find();
}

function findQuestionById(questionId) {
    return questionModel.findById(questionId);
}

function deleteQuestion(questionId) {
    return questionModel.find(questionId).remove().exec();
}

module.exports = {
    createQuestion: createQuestion,
    findAllQuestions: findAllQuestions,
    findQuestionById: findQuestionById,
    deleteQuestion: deleteQuestion
};