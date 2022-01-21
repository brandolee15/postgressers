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
        const response = await fetch('https://postgressers.herokuapp.com/habits/day', options);
        const data = await response.json();
        const dayList = document.getElementById('day-list')
        for (let i = 0; i < data.length; i++) {
            let node = document.createElement('li');
            node.appendChild(document.createTextNode(data[i].content + " - " + data[i].streak + " "));
            dayList.appendChild(node);
            // create check buttons 
            let done = document.createElement('button');
            done.setAttribute('id', `done${data[i].content}`);
            done.setAttribute('class', 'btn')
            done.setAttribute('class', 'btn-dark')
            done.setAttribute('class', 'done')
            node.appendChild(done);
            done.textContent = 'Mark as done'
            let content = data[i].content;

            // add event listener to buttons 
            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            let date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            data[i].dates.forEach(e => {
                if (e.date === date && e.complete === true) {
                    done.disabled = true;
                };
            });
            done.addEventListener('click', e => {
              e = { date: date,  complete: true, content: content };
              const options = {
                method: 'PUT',
                headers: {'Content-Type' : 'application/JSON', "Authorization": "Bearer " + accessToken },
                body: JSON.stringify(e)
              }
              fetch('https://postgressers.herokuapp.com/habits/day', options)
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
        const response = await fetch('https://postgressers.herokuapp.com/habits/week', options);
        const data = await response.json();
        const dayList = document.getElementById('week-list')
        for (let i = 0; i < data.length; i++) {
            let node = document.createElement('li');
                node.appendChild(document.createTextNode(data[i].content + " - " + data[i].streak + " "));
                dayList.appendChild(node);

            // create check buttons 
            let done = document.createElement('button');
            done.setAttribute('id', `done${data[i].content}`);
            done.setAttribute('class', 'btn')
            done.setAttribute('class', 'btn-dark')
            done.setAttribute('class', 'done')
            node.appendChild(done);
            done.textContent = 'Done'
            let content = data[i].content;

            // add event listener to buttons 
            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            let date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10)
            if (data[i].complete === true) {
                done.disabled = true;
            };
            done.addEventListener('click', e => {
              e = { date: date,  complete: true, content: content };
              const options = {
                method: 'PUT',
                headers: {'Content-Type' : 'application/JSON', "Authorization": "Bearer " + accessToken },
                body: JSON.stringify(e)
              
              }
              fetch('https://postgressers.herokuapp.com/habits/week', options)
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