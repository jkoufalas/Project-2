const navigationSpan = document.querySelector(".nav");
const navigationSpanBurger = document.querySelector(".nav-burger");
//get nav span object via normal nav or burger

//use function so both logout buttons utilise common method
const logoutLoc = async (event) => {
  let element = event.target;
  let id = element.getAttribute("id");

  if (element.matches("button") === true) {
    if (id == "home") {
      document.location.assign("/");
      //includes so that id is either logout or burger-logout
    } else if (id.includes("logout")) {
    } else {
      document.location.assign("/" + id);
    }
  }
};

//event listner for both nav types use same method
navigationSpan.addEventListener("click", logoutLoc);
navigationSpanBurger.addEventListener("click", logoutLoc);

//burger button javascript event listner
document.addEventListener("DOMContentLoaded", function () {
  //opens burger button manu
  // get navbar item and burger button item
  const burger = document.querySelectorAll(".navbar-burger");
  const menu = document.querySelectorAll(".navbar-menu");

  //iterates through burger items and toggle hidden value to make visible
  if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
      burger[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  // close buttons
  // get navbar item and burger button item close
  const close = document.querySelectorAll(".navbar-close");
  const backdrop = document.querySelectorAll(".navbar-backdrop");

  //iterates through burger items and toggle hidden value to make hidden
  if (close.length) {
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  //iterates through backdrop items and toggle hidden value to make hidden
  if (backdrop.length) {
    for (var i = 0; i < backdrop.length; i++) {
      backdrop[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }
});

const home = document.querySelector("#homeButton");

const homeLoc = async (event) => {
  let element = event.target;
  let id = element.getAttribute("id");

  document.location.assign("/");
};

home.addEventListener("click", homeLoc);
