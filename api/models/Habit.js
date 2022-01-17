const mongoose = require('mongoose');
const HabitSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true 
    },
    habit: [{
        habitName: {
            type: String,
            required: true 
        },
        dates: {
            type: Boolean,
            required: true
        }
    }]
})

const Habit = mongoose.model('Habit', HabitSchema);
module.exports = Habit;
