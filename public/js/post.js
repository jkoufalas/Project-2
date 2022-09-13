const postFormHandler = async (event) => {
  event.preventDefault();

  const post = document.querySelector("#new-post").value.trim();
  const thread_id = document.querySelector("#thread-id").getAttribute("thread");

  console.log("```````````````````````````");
  console.log(thread_id);
  console.log("```````````````````````````");

  if (post) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ post, thread_id }),
      headers: { "Content-Type": "application/json" },
    });

    const answer = await response.json();

    if (response.ok) {
      document.location.replace("/thread/" + thread_id);
    } else {
      alert(answer.errors[0].message);
    }
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
