const lockThread = document.querySelector("#locked");
const lockThreadHandler = async (event) => {
  let element = event.target;

  const lockedStatus = element.getAttribute("locked");
  console.log(lockedStatus);

  const thread_id = document.querySelector("#thread-id").getAttribute("thread");

  if (lockedStatus === "true") {
    var response = await fetch(`/api/threads/activate/${thread_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } else {
    var response = await fetch(`/api/threads/deactivate/${thread_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }
  console.log(response);

  const answer = await response.json();

  if (response.ok) {
    document.location.replace("/thread/" + thread_id);
  } else {
    alert(answer.errors[0].message);
  }
};

document.querySelector("#locked").addEventListener("click", lockThreadHandler);
