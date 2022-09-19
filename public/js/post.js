const postFormHandler = async (event) => {
  //prevent submit default
  event.preventDefault();

  //get post text and thread id
  const post = document.querySelector("#new-post").value;
  const thread_id = document.querySelector("#thread-id").getAttribute("thread");

  //make sure that there is something to post
  if (post) {
    //use post method to add post
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ post, thread_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.assign("/thread/" + thread_id);
    } else {
      alert(response.statusText);
    }
  }
};

const subThreadHandler = async (event) => {
  //get target
  let element = event.target;

  //get subscribed status
  const subStatus = element.getAttribute("subscribed");

  //get thread id
  const thread_id = document.querySelector("#thread-id").getAttribute("thread");

  //if the button was to subscribe then post to subscribe
  if (subStatus === "true") {
    var response = await fetch(`/api/subscription/${thread_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    //otherwise we are deleting subscription
  } else {
    var response = await fetch(`/api/subscription/${thread_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }

  if (response.ok) {
    document.location.assign("/thread/" + thread_id);
  } else {
    alert(response.statusText);
  }
};

//event listener when posting to thread
document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);

//event listener when subscribing to thread
document
  .querySelector("#subscription")
  .addEventListener("click", subThreadHandler);
