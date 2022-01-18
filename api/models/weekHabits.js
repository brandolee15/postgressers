const mongoose = require('mongoose');
const weekHabit = new mongoose.Schema({
    content: {
        type: String,
        required: true 
    },
    userName: {
        type: String,
        required: true
    },
    dates: [{
        type: String,
        complete: string
    }],
    },
    {
        timestamps: true
    });

const Habit_week = mongoose.model('Habit', weekHabit);
module.exports = Habit_week;
