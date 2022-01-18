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
        const response = await fetch('http://localhost:3000/login', options);
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        window.open(window.location.href.slice(0, -11) + '/home.html', '_self');
    } catch (err) {
        console.warn(err);
    };
};