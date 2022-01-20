document.getElementById('logout').addEventListener("click", logOutDatabase);

function logOutDatabase() {
    localStorage.clear();
    window.open('https://habit-at/index.html', '_self');
};
