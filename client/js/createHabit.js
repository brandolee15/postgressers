const formDay = document.querySelector('#form-day');
const btnDay = document.querySelector('#submit-day');
const formWeek = document.querySelector('#form-week');
const btnWeek = document.querySelector('#submit-week');

//creating day habit
function submitDay(e){
    e.preventDefault();

    const dayData = {
        content: e.target.content.value
    }
    const options = {
        method: 'POST', 
        body: JSON.stringify(dayData),
        headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:3000/home/day', options)
        .then(d => d.json())
        .then(() => e.target.reset())
        //append function
        .catch(console.warn)

};

//creating week habit
function submitWeek(e){
    e.preventDefault();

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