document.getElementById('logout').addEventListener("click", logOutDatabase);

function logOutDatabase() {
    localStorage.clear();
    window.open('https://habit-at.netlify.app', '_self');
};
