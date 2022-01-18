const express = require('express');
const router = express.Router();


//---------User model----------//
const User = require('../models/User');
const dayHabit = require('../models/dayHabits');
const weekHabit = require('../models/weekHabits');
const Habit_day = require('../models/dayHabits');

// -------Get User Habits (Day) -----//

var userName = ""
router.get("/home/day", (req, res) => {
    userName = req.query.user
    User.findOne = ({
        userName: req.query.user
    })
    try { user => {
        dayHabit.find({ userName = req.query.user });
        var days = [];
        days.push(getD(0));
        days.push(getD(1));
        days.push(getD(2));
        days.push(getD(3));
        days.push(getD(4));
        days.push(getD(5));
        days.push(getD(6));
        res.status(200).json(userName)
    }

    } catch(err) {
        res.status(404).json({err})
    }
})

// -------Get User Habits (Week) -----//

router.get("/home/week", (req, res) => {
    userName = req.query.user
    User.findOne = ({
        userName = req.query.user
    })
    try { user => {
        weekHabit.find({ userName = req.query.user });
        var weeks = [];
        weeks.push(getW(0));
        weeks.push(getW(7));
        weeks.push(getW(14));
        weeks.push(getW(21));
        res.status(200).json(userName)
    }

    } catch(err) {
        res.status(404).json({err})
    }
})

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
    return { date: newDate, day };
}


// ------- Return Week String ------- //


function getW(n) {
    let w = new Date();
    // let weekNum = Math.floor(w.setDate(w.getDate()/n));
    // let week = (w.setDate(w.getDate()))
    // let dayNum = w.toLocaleDateString('en-GB').split('/').pop().pop();
    // var weekNum = Math.floor(dayNum)
    // var week;
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
router.post('/home/day', (req, res) => {
    const { content } = req.body;

    dayHabit.findOne({ content: content, userName: userName }).then(dayHabit => {
        if (dayHabit) {
            //---------Update existing habit----------//
            let dates = dayHabit.dates, tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.find(function (item, index) {
                if (item.date === today) {
                    console.log("Habit already exists!")
                    res.redirect('back');
                }
                else {
                    dates.push({ date: today, complete: 'none' });
                    dayHabit.dates = dates;
                    dayHabit.save()
                        .then(habit => {
                            console.log(dayHabit);
                            res.redirect('back');
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        else {
            let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete: 'none' });
            const newHabit = new dayHabit({
                content,
                userName,
                dates
            });

            //---------Save Habit----------//
            newHabit
                .save()
                .then(habit => {
                    console.log(habit);
                    res.redirect('back');
                })
                .catch(err => console.log(err));
        }
    })
});

//--------- Add Week Habit ----------//
router.post('/home/week', (req, res) => {
    const { content } = req.body;

    weekHabit.findOne({ content: content, userName: userName }).then(weekHabit => {
        if (weekHabit) {
            //---------Update existing habit----------//
            let dates = weekHabit.dates, tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.find(function (item, index) {
                if (item.date === today) {
                    console.log("Habit already exists!")
                    res.redirect('back');
                }
                else {
                    dates.push({ date: today, complete: 'none' });
                    weekHabit.dates = dates;
                    weekHabit.save()
                        .then(habit => {
                            console.log(weekHabit);
                            res.redirect('back');
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        else {
            let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete: 'none' });
            const newHabit = new weekHabit({
                content,
                userName,
                dates
            });

            //---------Save Habit----------//
            newHabit
                .save()
                .then(habit => {
                    console.log(habit);
                    res.redirect('back');
                })
                .catch(err => console.log(err));
        }
    })
})

