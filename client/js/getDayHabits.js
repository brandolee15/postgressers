const habitGridDay = document.getElementById("habitGridDay");
const habitGridWeek = document.getElementById('habitGridWeek');
 let dayOfWeek = "";

    function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

async function loadContentDay() {

            const accessToken = localStorage.getItem('accessToken')
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
                
            };
            const response = await fetch('http://localhost:3000/habits/day', options);
            const data = await response.json();
            // console.log(data)
            for (let i = 0; i < data.length; i++) {
                const habit = data[i].content
                // console.log(habit)
                // console.log(data[i].dates)
                let entry = document.createElement('div');
                entry.setAttribute('class', 'row');
                entry.setAttribute('id', `${data[i].content}`);
                habitGridDay.appendChild(entry);
                let name = document.createElement('div');
                name.setAttribute('class', 'col');
                name.setAttribute('align', 'center');
                name.setAttribute('style', 'border:1px solid #ffffff !important');
                name.textContent = habit;
                entry.appendChild(name);
                for (let j = 0; j < 7; j++ ) {
                    let checkbox = document.createElement('div');
                    checkbox.setAttribute('class', 'col');
                    checkbox.setAttribute('id', `${data[i].content}-${getDayName(data[i].dates[j].date)}`);
                    checkbox.setAttribute('align', 'center');
                    checkbox.setAttribute('style', 'border:1px solid #ffffff !important');
                    entry.appendChild(checkbox)
                    let dayOfWeek = getDayName(data[i].dates[j].date)
                
                        if (data[i].dates[j].complete == true) {
                        document.getElementById(`${data[i].content}-${getDayName(data[i].dates[j].date)}`).style.backgroundColor = 'blue';
                        document.getElementById(`${data[i].content}-${getDayName(data[i].dates[j].date)}`).textContent = 'complete!'
                        }
                        else {
                            document.getElementById(`${data[i].content}-${getDayName(data[i].dates[j].date)}`).style.backgroundColor = 'red';
                            document.getElementById(`${data[i].content}-${getDayName(data[i].dates[j].date)}`).textContent = 'not done yet'
                        }
                }
                
            }

      
}

async function loadcontentWeek () {

            const accessToken = localStorage.getItem('accessToken')
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
                
            };
            const response = await fetch('http://localhost:3000/habits/week', options);
            const data = await response.json();
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                const habit = data[i].content
                // console.log(habit)
                // console.log(data[i].dates)
                let entry = document.createElement('div');
                entry.setAttribute('class', 'row');
                entry.setAttribute('id', `${data[i].content}`);
                habitGridWeek.appendChild(entry);
                let name = document.createElement('div');
                name.setAttribute('class', 'col');
                name.setAttribute('align', 'center');
                name.setAttribute('style', 'border:1px solid #ffffff !important');
                name.textContent = habit;
                entry.appendChild(name);
                let checkbox = document.createElement('div')
                checkbox.setAttribute('align', 'center');
                checkbox.setAttribute('id', `check${data[i].content}`)
                checkbox.setAttribute('style', 'border:1px solid #ffffff !important');
                entry.appendChild(checkbox);
                if (data[i].complete == true) {
                    document.getElementById(`check${data[i].content}`).style.backgroundColor = 'blue'
                    document.getElementById(`check${data[i].content}`).textContent = 'complete!'
                } else {
                    document.getElementById(`check${data[i].content}`).style.backgroundColor = 'red'
                    document.getElementById(`check${data[i].content}`).textContent = 'not done yet'
                }
            }
}


loadContentDay()
loadcontentWeek()   
    
    
    


// var dateStr = '05/23/2014';
// var day = getDayName(dateStr, "nl-NL"); // Gives back 'Vrijdag' which is Dutch for Friday.