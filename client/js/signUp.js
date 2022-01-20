const myForm = document.querySelector('#register');
myForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    signUpDatabase(username, password);
});

async function signUpDatabase(username, password){
    try {
        const post = {userName: username, password: password};
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        };
        const response = await fetch('https://postgressers.herokuapp.com/register', options);
        
        if(response.status === 201) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            window.open('https://habit-at.netlify.app/home.html', '_self');
        } else if(response.status === 409) {
            alert('Username already exists!')
        }
    } catch (err) {
        console.warn(err);
    };
};