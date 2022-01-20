


function setUsername(){
    const username = localStorage.getItem('username')
    document.getElementById('user-name').textContent += username;
};

async function setDayHabbits(){
    try {
        const accessToken = localStorage.getItem('accessToken')
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken }
        };
        const response = await fetch('http://localhost:3000/habits/day', options);
        const data = await response.json();
        const dayList = document.getElementById('day-list')
        for (let i = 0; i < data.length; i++) {
            let node = document.createElement('li');
            node.appendChild(document.createTextNode(data[i].content));
            dayList.appendChild(node);
            // create check buttons 
            let done = document.createElement('button');
            // let notDone = document.createElement('button');
            done.setAttribute('id', `done${data[i].content}`);
            // notDone.setAttribute('id', `notDone${data[i].content}`);
            node.appendChild(done);
            done.textContent = 'b'

            let content = data[i].content;


            // add event listener to buttons 

            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            let date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10)
            done.addEventListener('click', e => {
              e = { date: date,  complete: true, content: content };
              const options = {
                method: 'PUT',
                headers: {'Content-Type' : 'application/JSON', "Authorization": "Bearer " + accessToken },
                body: JSON.stringify(e)
              
              }
              fetch('http://localhost:3000/habits/day', options)
              .then((response) => response.json())
              .then(done.disabled = true );
            })

        };
    } catch (err) {
        console.warn(err);
    };
};

async function setWeekHabbits(){
    try {
        const accessToken = localStorage.getItem('accessToken')
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken }
        };
        const response = await fetch('http://localhost:3000/habits/week', options);
        const data = await response.json();
        const dayList = document.getElementById('week-list')
        for (let i = 0; i < data.length; i++) {
            let node = document.createElement('li');
                node.appendChild(document.createTextNode(data[i].content));
                dayList.appendChild(node);

                 // create check buttons 
            let done = document.createElement('button');
            // let notDone = document.createElement('button');
            done.setAttribute('id', `done${data[i].content}`);
            // notDone.setAttribute('id', `notDone${data[i].content}`);
            node.appendChild(done);
            done.textContent = 'b'

            let content = data[i].content;


            // add event listener to buttons 

            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            let date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10)
            done.addEventListener('click', e => {
              e = { date: date,  complete: true, content: content };
              const options = {
                method: 'PUT',
                headers: {'Content-Type' : 'application/JSON', "Authorization": "Bearer " + accessToken },
                body: JSON.stringify(e)
              
              }
              fetch('http://localhost:3000/habits/week', options)
              .then((response) => response.json())
              .then(done.disabled = true );
            })
        };
    } catch (err) {
        console.warn(err);
    };
};

setUsername()
setDayHabbits()
setWeekHabbits()

module.exports = { setUsername, setDayHabbits, setWeekHabbits };