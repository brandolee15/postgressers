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
        complete: String
    }]},{
        timestamps: true
})

const HabitDay = mongoose.model('dayHabit', dayHabit);
module.exports = HabitDay;
