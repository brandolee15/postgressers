const habitGrid = document.getElementById("habitGrid");
const dayOfWeek = []

async function loadContentDay() {
    // try{
            const accessToken = localStorage.getItem('accessToken')
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accessToken },
                
            };
            const response = await fetch('http://localhost:3000/habits/day', options);
            const data = await response.json();
            console.log(data)

            for (let i = 0; i < data.length; i++) {
                const habit = data[i].content
                console.log(habit)
                console.log(data[i].dates)
                let entry = document.createElement('div');
                entry.setAttribute('class', 'row')
                habitGrid.appendChild(entry);
                let name = document.createElement('div');
                name.setAttribute('class', 'col');
                name.setAttribute('align', 'center')
                name.setAttribute('style', 'border:1px solid #ff00ff !important');
                name.textContent = habit;
                entry.appendChild(name);
                for (let j = 0; j < 7; j++ ) {
                    let checkbox = document.createElement('div');
                    checkbox.setAttribute('class', 'col');
                    checkbox.setAttribute('align', 'center')
                    checkbox.setAttribute('style', 'border:1px solid #ff00ff !important')
                    entry.appendChild(checkbox)
                //    done missed not done yet function

                }
            };
        // } catch (err) {
        //     console.warn(err);
        // };}
}


    loadContentDay()
    
    