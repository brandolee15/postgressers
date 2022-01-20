const accessToken = localStorage.getItem('accessToken');
if (!accessToken) {
    window.open('https://habit-at.netlify.app', '_self');
};