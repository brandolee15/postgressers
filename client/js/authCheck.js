const accessToken = localStorage.getItem('accessToken');
if (!accessToken) {
    window.open(window.location.href.slice(0, -10) + '/index.html', '_self');
};