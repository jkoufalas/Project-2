const categorySpan = document.querySelector('.category-span');

categorySpan.addEventListener('click', function(event) {
    let element = event.target;
    let id = element.getAttribute('id');

    if (element.matches("button") === true) {
        if (id == 'new-category') {
            document.location.replace('/' + id);
        } else {
        document.location.replace('/threads/' + id);
        }
    }
});