const threadsSpan = document.querySelector(".threads-span");

threadsSpan.addEventListener("click", function (event) {
  let element = event.target;
  let id = element.getAttribute("id");

  if (element.matches("button") === true) {
    document.location.assign("/thread/" + id);
  }
});

const threadFormHandler = async (event) => {
  event.preventDefault();

  const thread_name = document.querySelector("#new-thread").value.trim();
  const category_id = document
    .querySelector("#category-id")
    .getAttribute("category");

  if (thread_name) {
    const response = await fetch("/api/threads", {
      method: "POST",
      body: JSON.stringify({ thread_name, category_id }),
      headers: { "Content-Type": "application/json" },
    });

    const answer = await response.json();

    if (response.ok) {
      document.location.assign("/threads/" + category_id);
    } else {
      alert(answer.errors[0].message);
    }
  }
};

document
  .querySelector(".thread-form")
  .addEventListener("submit", threadFormHandler);
