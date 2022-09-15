const navigationSpan = document.querySelector('.nav');

navigationSpan.addEventListener('click', function(event) {
    let element = event.target;
    let id = element.getAttribute('id');

    if (element.matches("button") === true) {
        if (id == 'home') {
            document.location.assign('/');
        } else if (id == 'logout') {
        } else {
            document.location.assign('/' + id);
        }
    }
});