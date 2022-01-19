document.getElementById('logout').addEventListener("click", logOutDatabase);

function logOutDatabase() {
    localStorage.clear();
    window.open(window.location.href.slice(0, -10) + '/index.html', '_self');
};
