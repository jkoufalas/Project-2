const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  //make sure there is something in the email and password field
  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    //if the user was found then redirect to home screen
    if (response.ok) {
      document.location.assign("/");
    } else {
      alert("Failed to log in");
    }
  }
};

const signupFormHandler = async (event) => {
  //prevent standard form submit
  event.preventDefault();

  //get name, email and password entered in form
  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  //make sure all fields have values
  if (name && email && password) {
    //create user with the values  by posting
    const response = await fetch("/api/users/sign-up", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    //get the json response
    const answer = await response.json();

    //if the user was found then redirect to home screen
    if (response.ok) {
      document.location.assign("/");
    } else {
      //otherwise post specific error
      alert(answer.errors[0].message);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
