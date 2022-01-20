const accessToken = localStorage.getItem('accessToken');
if (!accessToken) {
    window.open('https://habit-at/index.html', '_self');
};