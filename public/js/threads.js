//get element that holds all threads
const threadsSpan = document.querySelector(".threads-span");

//make event listener on buttons
threadsSpan.addEventListener("click", function (event) {
  //focus on target information
  let element = event.target;
  //get the id of target
  let id = element.getAttribute("id");

  //if the target is a button
  if (element.matches("button") === true) {
    //redirect to id which is the thread
    document.location.assign("/thread/" + id);
  }
});
