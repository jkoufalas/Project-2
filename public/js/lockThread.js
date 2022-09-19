const lockThreadHandler = async (event) => {
  //focus on target
  let element = event.target;
  //current status is in attribute so get it
  const lockedStatus = element.getAttribute("locked");
  //get thread id
  const thread_id = document.querySelector("#thread-id").getAttribute("thread");

  //if currently locked activate
  if (lockedStatus === "true") {
    var response = await fetch(`/api/threads/activate/${thread_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    //otherwise deactivate
  } else {
    var response = await fetch(`/api/threads/deactivate/${thread_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }

  //redirect to thread to refresh page
  if (response.ok) {
    document.location.assign("/thread/" + thread_id);
  } else {
    alert(response.statusText);
  }
};

//get event handler on locked button
document.querySelector("#locked").addEventListener("click", lockThreadHandler);
