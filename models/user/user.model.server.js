const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

findAllUsers = () =>
userModel.find();

findUserByCredentials = (username, password) =>
userModel.findOne({username: username, password: password});

findUserById = userId =>
userModel.findById(userId)

findUserByIdExpanded = userId =>
userModel
    .findById(userId)
    .populate('sections')
    .exec()

createUser = (user) =>
userModel.create(user);


findUserByUsername = (username) =>
    userModel.findOne({username: username});

updateUser = (user, userId) =>
    userModel.update({
        _id: userId
    }, {
        $set: user
    });


module.exports = {
    findUserByIdExpanded,
    findUserById,
    findAllUsers,
    findUserByCredentials,
    createUser,
    findUserByUsername,
    updateUser
};