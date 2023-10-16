const text_box = document.getElementById("urlInput");
const short_button = document.getElementById("shortenButton");
const old_link = document.querySelector(".drop-down-given");
const new_link = document.querySelector(".drop-down-new");
const dropdowned = document.querySelector(".drop-down");
const errorMessage = document.getElementById("error-message"); // Error message element
const copybutton = document.getElementById("copy");
const text_to_copy = new_link.textContent;
var myHeaders = new Headers();
myHeaders.append("apikey", "vh5cGQgRRpXD3tYVM0eIV2Vvhj2qY8Hz");

short_button.addEventListener("click", () => {
  const inputUrl = text_box.value;

  if (inputUrl.trim() === "") {
    // Check if the input is empty
    errorMessage.textContent = "URL is required"; // Display error message
    return;
  }

  // Regular expression to validate URLs
  const urlPattern = /^(https?:\/\/)?(www\.)?[\w\.-]+\.\w+(\/.*)?$/i;

  if (!urlPattern.test(inputUrl)) {
    // Check if the input doesn't match the URL pattern
    errorMessage.textContent = "Invalid URL"; // Display error message
    return;
  }

  // Clear error message if input is valid
  errorMessage.textContent = "";
  var raw = `${text_box.value}`;

  var requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: myHeaders,
    body: raw,
  };
  const dropdown = (result) => {
    old_link.textContent = result.long_url;
    new_link.textContent = result.short_url;
    new_link.href = result.short_url;
    dropdowned.style.opacity = 1;
    copybutton.addEventListener("click", () => {
      const textToCopy = new_link.textContent;
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      copybutton.textContent = "Copied!";
    });
    return;
  };
  fetch("https://api.apilayer.com/short_url/hash", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      dropdown(result);
      return console.log(result);
    })
    .catch((error) => console.log("error", error));
});
