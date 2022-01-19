function setUsername(){
    const username = localStorage.getItem('username')
    console.log(username)
    document.getElementById('user-name').textContent += username;
};

async function setDayHabbits(){
    try {
        const accessToken = localStorage.getItem('accessToken')
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
            body: ""
        };
        const response = await fetch('http://localhost:3000/habits/day', options);
        const data = await response.json();
        const dayList = document.getElementById('day-list')
        for (let i = 0; i < data.habbits.length; i++) {
            let node = document.createElement('li');
            node.appendChild(document.createTextNode(data.habbits[i].content));
            dayList.appendChild(node);
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
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
            body: ""
        };
        const response = await fetch('http://localhost:3000/habits/week', options);
        const data = await response.json();
        const dayList = document.getElementById('week-list')
        for (let i = 0; i < data.habbits.length; i++) {
            let node = document.createElement('li');
            node.appendChild(document.createTextNode(data.habbits[i].content));
            dayList.appendChild(node);
        };
    } catch (err) {
        console.warn(err);
    };
};

setUsername()
setDayHabbits()
setWeekHabbits()