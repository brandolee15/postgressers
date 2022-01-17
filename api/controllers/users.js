const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//log in route
router.get('/login', (req, res) => async (req, res) => {
    try {
        const users = await User.all;
        res.json({users})
    }catch(err){
        res.status(500).json({err})
    }
})

//log in post
router.post('/login', (req, res) => {
    const {UserName, password} = req.body 
    try {
        const user = await User.findOne({
            UserName: UserName
        })
        if(!user){ throw new Error('No user with this user name') }
        const authed = bcrypt.compare(req.body.password, user.passwordDigest)
        if (!!authed){
            res.status(200).json({ user: user.UserName })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
})

//register route
// router.get('/register', (req, res) => res.render('register'));

//register post 
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(); // generate salt
        const hashed = await bcrypt.hash(req.body.password, salt); // hash password and add salt
        await User.create({...req.body, password: hashed}); // insert new user into db
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json({err});
    }
})

//log out route
router.get('/logout', function(req, res) {
    req.logout();
    if (!req.session) {
      req.session.destroy(function(err) {
        res.redirect('/login');
      });
    }
    else {
      res.redirect('/login');
    }
});

module.exports = router;
