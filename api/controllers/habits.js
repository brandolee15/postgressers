const express = require('express');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use(cors())
//---------User model----------//
const User = require('../models/User');
const HabitDay = require('../models/dayHabits');
const HabitWeek = require('../models/weekHabits');
const dayHabits = require('../models/dayHabits');

//Authenticate function
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

// -------Get User Habits (Day) -----//
router.get("/day", authenticateToken, (req, res) => {
    let userName = req.user
    HabitDay.find({ userName: userName }).then(habits => {
        if (!habits) {
            err = 'No habits found'
            res.json(err)
        }
        else {res.json(habits)}


    })})

// -------Get User Habits (Week) -----//
router.get("/week", authenticateToken, (req, res) => {
   
    let userName = req.user
    HabitWeek.find({ userName: userName }).then(habits => {
        if (!habits) {
            err = 'No habits found'
            res.json(err)
        }
        else {res.json(habits)}


    })})

// ------- Return Date String ------- //
function getD(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);
    var newDate = d.toLocaleDateString('en-GB').split( '/' ).reverse( ).join( '-' );
    var day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return (newDate);
}

// ------- Return Week String ------- //
function getW(n) {
    let w = new Date();
    w.setDate(w.getDate() + n);
    var newDate = d.toLocaleDateString('en-GB').split( '/' ).reverse( ).join( '-' );
    var week;
    switch (w.getDay()) {
        case 0: week = 'week1';
            break;
        case 7: week = 'week2';
            break;
        case 14: week = 'week3';
            break;
        case 21: week = 'week4';
            break;
    }
    return { date: newDate, week}
}

// -------- Add Day Habit -------- //
router.post('/day', authenticateToken, (req, res) => {
    const { content } = req.body;
    const userName = req.user;
    HabitDay.findOne({ content: content, userName: userName }).then(habit => {
        if (habit) {
            //---------Update existing habit----------//
            dates.find(function (item, index) {

                if (item.date === today) {
                    console.log("Habit already exists!")
                    res.statusCode(409);
                }
                else {
                    dates.push({ date: today, complete: false });
                    habit.dates = dates;
                    habit.save()
                        .then(habit => {
                            console.log(habit);
                            res.statusCode(205);
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        else {
            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            // dates.push({ date: localISOTime });
            const newHabit = new HabitDay({
                content: content,
                userName: userName,
                dates: [{date: getD(0), complete: false},
                        {date: getD(1), complete: false},
                        {date: getD(2), complete: false},
                        {date: getD(3), complete: false},
                        {date: getD(4), complete: false},
                        {date: getD(5), complete: false},
                        {date: getD(6), complete: false}]
            });

            //---------Save Habit----------//
            newHabit
                .save()
                .then(habit => {
                    console.log(habit);
                    res.statusCode(201);
                })
                .catch(err => console.log(err));
        }
    })
});

//--------- Add Week Habit ----------//
router.post('/week', authenticateToken, (req, res) => {
    //Change the day to week
    const { content } = req.body;
    const userName = req.user;
    HabitWeek.findOne({ content: content, userName: userName }).then(habit => {
        if (habit) {
            //---------Update existing habit----------//
            let dates = habit.dates, tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.find(function (item, index) {
                if (item.date === today) {
                    console.log("Habit already exists!")
                    res.statusCode(409);
                }
                else {
                    dates.push({ date: today, complete: 'none' });
                    habit.dates = dates;
                    habit.save()
                        .then(habit => {
                            console.log(habit);
                            res.statusCode(205);
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        else {
            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
            console.log(userName);
            const newHabit = new HabitWeek({
                content: content,
                userName: userName,
                dates: localISOTime, 
                complete: false
            });

            //---------Save Habit----------//
            newHabit
                .save()
                .then(habit => {
                    console.log(habit);
                    res.statusCode(201);
                })
                .catch(err => console.log(err));
        }
    })
})

//-------- Update Status of day habit completion ------------//
router.put("/day", authenticateToken, (req, res) => { 
    let content = req.body.content;
    let d = req.body.date;
    
    let userName = req.user;
    let filter = { content: content, userName: userName}


    HabitDay.findOne(filter).then( async habit => {
        for ( i = 0; i < habit.dates.length; i ++) {
            if (habit.dates[i].date === d) {
                if (i != 0) {
                    if (habit.dates[i-1].complete === false){
                        habit.streak = 1;
                    }
                }
                habit.dates[i].complete = true;
                habit = await habit.save();
            }
        }
        habit.streak += 1;
        habit = await habit.save();
    })
})

//-------- Update Status of week habit completion ------------//
router.put("/week", authenticateToken, (req, res) => { 
    let content = req.body.content;
    let d = req.body.date;
    
    let userName = req.user;
    let filter = { content: content, userName: userName}


    HabitWeek.findOne(filter).then( async habit => {
        habit.streak += 1;
        habit.complete = true;
        habit = await habit.save()  
    })
})

module.exports = router