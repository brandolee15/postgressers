const formDay = document.querySelector('#daily-habit');
const btnDay = document.querySelector('#submit-day');
const formWeek = document.querySelector('#weekly-habit');
const btnWeek = document.querySelector('#submit-week');

formDay.addEventListener("submit", e => {
    e.preventDefault();
    const content = e.target.dailyName.value;
    submitDay(content);
    const textarea = document.getElementById('dailyName');
    textarea.value = '';
} )

formWeek.addEventListener("submit", e => {
    e.preventDefault();
    const content = e.target.weeklyName.value;
    submitWeek(content);
    const textarea = document.getElementById('weeklyName');
    textarea.value = '';
})

//creating day habit
async function submitDay(content){
    try {
        const accessToken = localStorage.getItem('accessToken')
        const post = { content: content };
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
            body: JSON.stringify(post)
        };
        const response = await fetch('http://localhost:3000/habits/day', options);
        alert('Daily Habit has been submitted!')
    } catch (err) {
        console.warn(err);
    };
};

//creating week habit
async function submitWeek(content){
    try {
        const accessToken = localStorage.getItem('accessToken')
        const post = { content: content };
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
            body: JSON.stringify(post)
        };
        const response = await fetch('http://localhost:3000/habits/week', options);
        alert('Weekly Habit has been submitted!')
    } catch (err) {
        console.warn(err);
    };

};

module.exports = { submitDay, submitWeek };