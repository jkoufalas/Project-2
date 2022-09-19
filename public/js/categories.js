const categorySpan = document.querySelector(".category-span");
//get the object container that holds the buttons

categorySpan.addEventListener("click", function (event) {
  //get target to filter which item pressed
  let element = event.target;
  let id = element.getAttribute("id");
  //get id of button to know exactly which button pressed

  //we only care if a button was pressed
  if (element.matches("button") === true) {
    //if new category button the redirct to new category page
    if (id == "new-category") {
      document.location.assign("/" + id);
    } else {
      //otherwise it is a category button and redirect to that category
      document.location.assign("/threads/" + id);
    }
  }
});
