const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(cors());

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
router.post('/login', async (req, res) => {
    const {userName, password} = req.body 
    try {
        const user = await User.findOne({
            userName: userName
        })
        if(!user){ throw new Error('No user with this user name') }
        const authed = bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            const accessToken = jwt.sign(user.userName, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({ accessToken: accessToken })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ err });
    }
})

//register post 
router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({
        userName: req.body.userName
        })
        if(!!user) {
            res.status(409).json({msg: 'Username already exists'})
        } else {
            const salt = await bcrypt.genSalt(); // generate salt
            const hashed = await bcrypt.hash(req.body.password, salt); // hash password and add salt
            await User.create({...req.body, password: hashed}); // insert new user into db
            const accessToken = jwt.sign(req.body.userName, process.env.ACCESS_TOKEN_SECRET)
          
            res.status(201).json({ accessToken: accessToken });
        }
    } catch (err) {
        res.status(500).json({err});
    }
})

module.exports = router;