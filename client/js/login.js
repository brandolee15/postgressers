const myForm = document.querySelector('#login');
myForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    loginDatabase(username, password);
});

async function loginDatabase(username, password){
    try {
        const post = {userName: username, password: password};
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        };
        const response = await fetch('https://postgressers.herokuapp.com/login', options);
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('username', username);
        if(response.status === 200){
            window.open(window.location.href.slice(0, -11) + '/home.html', '_self');
        } else {
            alert("Invalid username/password")
        }
    } catch (err) {
        console.warn(err);
    };
};