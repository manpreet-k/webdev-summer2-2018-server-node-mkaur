module.exports = app => {

    const userModel = require('../models/user/user.model.server');

    findAllUsers = (req, res) =>
    userModel.findAllUsers()
        .then(users => {
        res.send(users);
});

    login = (req, res) => {
        const user = req.body;
        userModel.findUserByCredentials(user.username, user.password)
            .then(user => {
            req.session['currentUser'] = user;
            res.json(req.session['currentUser']);
    });
    };

    currentUser = (req, res) => {
        const currentUser = req.session['currentUser'];
        if(currentUser) {
            userModel.findUserByIdExpanded(currentUser._id)
                .then(user => res.send(user))
        } else {
            res.sendStatus(403)
        }
    }

    createUser = (req, res) => {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.json(req.session['currentUser']);
            })
    }

    logout = (req, res) => {
        req.session.destroy();
        res.send(200);
    }

    findUserByUsername = (req, res) => {
        let username = req.params['username']
        userModel.findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                })
    }

    app.get ('/currentUser', currentUser);
    app.get ('/api/user', findAllUsers);
    app.post('/login', login);
    app.post('/register', createUser);
    app.post('/logout', logout);
    app.get('/api/username/:username', findUserByUsername);
};