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
    }},{
        timestamps: true
})

module.exports = mongoose.model('HabitWeek', weekHabit);

