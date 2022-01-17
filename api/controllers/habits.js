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

// -------- Add Habit -------- //


