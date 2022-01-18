const express = require('express');
const cors = require('cors');
const { builtinModules } = require('module');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/keys').MongoURI;
const mongoose = require('mongoose');
const server = express();

const userRoutes = require('./controllers/users');
const habitRoutes = require('./controllers/habits');

server.use(cors());
server.use(express.json());

server.use('/', userRoutes);
server.use('/habits', habitRoutes);

server.get('/', (req, res) => res.send('Hello Postgressers!'))

server.get('/habits', authenticateToken, (req, res) => {
    res.json(habits.filter(habit.UserName===req.user.UserName))
})

server.post('/login', (req, res) => {
    //authenticated user
    const username = req.body.UserName
    const user = {UserName: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
});

//middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //Authorization Bearer Token
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403)
        } else{
            req.user = user
            next()
        }
    })
};

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err)
);



module.exports = server;
