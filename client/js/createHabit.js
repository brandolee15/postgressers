const formDay = document.querySelector('#daily-habit');
const btnDay = document.querySelector('#submit-day');
const formWeek = document.querySelector('#form-week');
const btnWeek = document.querySelector('#submit-week');

formDay.addEventListener("submit", e => {
    e.preventDefault();
    const content = e.target.dailyName.value;
    submitDay(content);
} )

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
    } catch (err) {
        console.warn(err);
    };
};

//creating week habit
function submitWeek(){
    const weekData = {
        content: e.target.content.value
    }
    const options = {
        method: 'POST', 
        body: JSON.stringify(weekData),
        headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:3000/home/week', options)
        .then(d => d.json())
        .then(() => e.target.reset())
        //append function
        .catch(console.warn)

};