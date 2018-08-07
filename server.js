var express = require('express')
var app = express()
var session = require('express-session')
var bodyParser = require('body-parser')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://wbdv-angular-client-mkaur.herokuapp.com/");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    rolling: true,
    cookie: { maxAge : 1800000 }
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://webdevuser:webdevuser1@ds113732.mlab.com:13732/heroku_jg0gk386');

const userService = require('./services/user.service.server'); //(app);
userService(app);

require('./services/section.service.server')(app);

app.listen(process.env.PORT || 3000)