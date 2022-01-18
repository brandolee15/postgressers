const mongoose = require('mongoose');
const dayHabit = new mongoose.Schema({
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
    }]},{
        timestamps: true
})

const Habit_day = mongoose.model('Habit', dayHabit);
module.exports = Habit_day;
