const habitGrid = document.getElementById("habitGrid");
const dayOfWeek = []

async function loadContentDay() {
await fetch("https://localhost:3000/habits/day")
    .then((response) => response.json())
    .then((obj) => { 
        for (let i = obj.length - 1; i > -1; i--) {

            const habit = obj[i].content
            let entry = document.createElement('div');
            entry.setAttribute('class', 'row');
            habitGrid.appendChild(entry);
            let name = document.createElement('div');
            name.setAttribute('class', 'col');
            name.textContent(habit);

        }
    }).catch((err) => {console.log(err)})}

    loadContentDay()