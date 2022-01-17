const express = require('express');
const router = express.Router();
const User = require('../models/User');

//log in route
router.get('/login', (req, res) => res.render('login'));

//log in post
router.post('/login', (req, res) => {
    const {UserName, password} = req.body 
    User.findOne({
        UserName: UserName
    }).then(user => {
        if(!user) {
            let errors = [];
            errors.push({message: 'User Name not found'});
            res.render('login', {
                errors, 
                UserName,
                password
            })
        } else{
            res.redirect(`/dashboard?user=${user.UserName}`);
        }
    })
})
