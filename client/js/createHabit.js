const formDay = document.querySelector('#form-day');
const btnDay = document.querySelector('#submit-day');
const formWeek = document.querySelector('#form-week');
const btnWeek = document.querySelector('#submit-week');

formDay.addEventListener("submit", e => {
    e.preventDefault();
    const content = e.target.content.value;
    submitDay(content);
} )

//creating day habit
function submitDay(content){
    
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