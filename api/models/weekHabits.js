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
    date: {
        type: String
    },
    complete: {
        type: Boolean
    },
    streak: {
        type: Number,
        default: 0
    }
    },{
        timestamps: true
})

module.exports = mongoose.model('HabitWeek', weekHabit);

