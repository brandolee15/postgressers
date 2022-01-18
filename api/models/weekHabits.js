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
    dates: {
        type: String
    },
    complete: {
        type: Boolean
    }},{
        timestamps: true
})

const HabitWeek = mongoose.model('weekHabit', weekHabit);
module.exports = HabitWeek;
