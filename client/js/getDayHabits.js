const habitGrid = document.getElementById("habitGrid");
const dayOfWeek = []

function loadContentDay() 
fetch("https://localhost:3000/habits/day")
    .then((response) => response.json())
    .then((obj) => { 
        for (let i = obj.length - 1; i > -1; i--) {

            const habit = obj[i].content
            


            for (let j = 0; j <= obj.date.length; i++) {
                dayOfWeek[i] = obj.date[i]
            }



        }
    })