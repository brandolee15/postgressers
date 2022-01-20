const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

    
    // try { async user => {
    //   const habits = await HabitDay.find({ userName: req.query.user });
    //     var days = [];
    //     days.push(getD(0));
    //     days.push(getD(1));
    //     days.push(getD(2));
    //     days.push(getD(3));
    //     days.push(getD(4));
    //     days.push(getD(5));
    //     days.push(getD(6));
    //     res.status(200).json(userName)
    //     res.json(habits)
    // }

    // } catch(err) {
    //     res.status(404).json({err})
    // }


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
    // try { user => {
    //     weekHabit.find({ userName: req.query.user });
    //     var weeks = [];
    //     weeks.push(getW(0));
    //     weeks.push(getW(7));
    //     weeks.push(getW(14));
    //     weeks.push(getW(21));
    //     res.status(200).json(userName)
    // }

    // } catch(err) {
    //     res.status(404).json({err})
    // }
// })

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
router.post('/day', authenticateToken, (req, res) => {
    const { content } = req.body;
    const userName = req.user;
    HabitDay.findOne({ content: content, userName: userName }).then(habit => {
        if (habit) {
            //---------Update existing habit----------//
            // let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            // var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.find(function (item, index) {

                if (item.date === today) {
                    console.log("Habit already exists!")
                    res.redirect('back');
                }
                else {
                    dates.push({ date: today, complete: false });
                    habit.dates = dates;
                    habit.save()
                        .then(habit => {
                            console.log(habit);
                            res.redirect('back');
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
                    res.redirect('back');
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
                    res.redirect('back');
                }
                else {
                    dates.push({ date: today, complete: 'none' });
                    habit.dates = dates;
                    habit.save()
                        .then(habit => {
                            console.log(habit);
                            res.redirect('back');
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
                    res.redirect('back');
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
            habit.dates[i].complete = true;
            habit = await habit.save()
            }
        }
        
    })
})

    //-------- Update Status of week habit completion ------------//
router.put("/week", authenticateToken, (req, res) => { 
    let content = req.body.content;
    let d = req.body.date;
    
    let userName = req.user;
    let filter = { content: content, userName: userName}


    HabitWeek.findOne(filter).then( async habit => {

        // for ( i = 0; i < habit.dates.length; i ++) {
        //     if (habit.dates[i].date === d) {
            habit.complete = true;
            habit = await habit.save()
        //     }
        // }
        
    })
     
     
    //  .then(  habit => {
    //      console.log(habit.userName)
    //     for ( i = 0; i < habit.dates.length; i ++) {
    //         console.log(habit.dates)
    //         if (habit.dates[i].date = d) {
    //             habit.dates.complete = true
    //         }          
    //         else {
    //             res.status(404)
    //         }
    //     }
    // }) 


    
    
    
    
    // var id = req.query.id;
    // HabitDay.findById(id, (err, habit) => {
    //     if (err) {
    //         console.log("Error updating status!")
    //     }
    //     else {
    //         let dates = HabitDay.dates;
    //         let found = false;
    //         dates.find(function (item, index) {
    //             if (item.date === d) {
    //                 if (item.complete === 'yes') {
    //                     item.complete = 'no';
    //                 }
    //                 else if (item.complete === 'no') {
    //                     item.complete = 'yes'
    //                 }
    //                 found = true;
    //             }
    //         })
    //         if (!found) {
    //             dates.push({ date: d, complete: 'yes' })
    //         }
    //         HabitDay.dates = dates;
    //         HabitDay.save()
    //             .then(habit => {
    //                 console.log(habit);
    //                 res.redirect('back');
    //             })
    //             .catch(err => console.log(err));
    //     }
    // })

})

module.exports = router