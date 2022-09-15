const threadsSpan = document.querySelector('.threads-span');

threadsSpan.addEventListener('click', function(event) {
    let element = event.target;
    let id = element.getAttribute('id');

    if (element.matches("button") === true) {
        document.location.assign('/thread/' + id);
    }
});