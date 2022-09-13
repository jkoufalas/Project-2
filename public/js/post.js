const postFormHandler = async (event) => {
  event.preventDefault();

  const post = document.querySelector("#post").value.trim();

  if (post) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ post }),
      headers: { "Content-Type": "application/json" },
    });

    const answer = await response.json();

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(answer.errors[0].message);
    }
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
