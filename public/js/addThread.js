const threadFormHandler = async (event) => {
  //prevent form submit default
  event.preventDefault();

  //get new threat value
  const thread_name = document.querySelector("#new-thread").value.trim();
  //get the category id associated with it
  const category_id = document
    .querySelector("#category-id")
    .getAttribute("category");

  //make sure the thread name has a value in it
  if (thread_name) {
    const response = await fetch("/api/threads", {
      method: "POST",
      body: JSON.stringify({ thread_name, category_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.assign("/threads/" + category_id);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".thread-form")
  .addEventListener("submit", threadFormHandler);
