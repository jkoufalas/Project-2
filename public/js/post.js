const postFormHandler = async (event) => {
  event.preventDefault();

  const post = document.querySelector("#new-post").value.trim();
  const thread_id = document.querySelector("#thread-id").getAttribute("thread");

  if (post) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ post, thread_id }),
      headers: { "Content-Type": "application/json" },
    });

    const answer = await response.json();

    if (response.ok) {
      document.location.assign("/thread/" + thread_id);
    } else {
      alert(answer.errors[0].message);
    }
  }
};

const subThreadHandler = async (event) => {
  let element = event.target;

  const subStatus = element.getAttribute("subscribed");

  const thread_id = document.querySelector("#thread-id").getAttribute("thread");

  if (subStatus === "true") {
    var response = await fetch(`/api/subscription/${thread_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } else {
    var response = await fetch(`/api/subscription/${thread_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }
  console.log(response);

  const answer = await response.json();

  if (response.ok) {
    document.location.assign("/thread/" + thread_id);
  } else {
    alert(answer.message);
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);

document
  .querySelector("#subscription")
  .addEventListener("click", subThreadHandler);
