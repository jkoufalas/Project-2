const navigationSpan = document.querySelector(".nav");
const navigationSpanBurger = document.querySelector(".nav-burger");

const logoutLoc = async (event) => {
  let element = event.target;
  let id = element.getAttribute("id");

  console.log("--------");
  console.log(element);

  if (element.matches("button") === true) {
    if (id == "home") {
      document.location.assign("/");
      //} else if (id == "logout") {
    } else if (id.includes("logout")) {
    } else {
      document.location.assign("/" + id);
    }
  }
};

navigationSpan.addEventListener("click", logoutLoc);

navigationSpanBurger.addEventListener("click", logoutLoc);

document.addEventListener("DOMContentLoaded", function () {
  // open
  const burger = document.querySelectorAll(".navbar-burger");
  const menu = document.querySelectorAll(".navbar-menu");

  if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
      burger[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  // close
  const close = document.querySelectorAll(".navbar-close");
  const backdrop = document.querySelectorAll(".navbar-backdrop");

  if (close.length) {
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

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
