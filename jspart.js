const form = document.getElementById("index.html");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting
  // Send the form data to the server using an HTTP POST request
  fetch("submit", {
    method: "POST",
    body: new FormData(form),
  }).then((response) => {
    console.log(response); // log the response to the console
  });
});
