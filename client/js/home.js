function setUsername(){
    const username = localStorage.getItem('username')
    console.log(username)
    document.getElementById('user-name').textContent += username;
};

setUsername()