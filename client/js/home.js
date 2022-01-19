function setUsername(){
    const username = localStorage.getItem('username')
    document.getElementById('#user-header').textContent += username;
};

setUsername()