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
    dates: {
        type: String
    },
    complete: {
        type: Boolean
    }},{
        timestamps: true
})

module.exports = mongoose.model('HabitDay', dayHabit)

