const text_box = document.getElementById("urlInput");
const short_button = document.getElementById("shortenButton");
const old_link = document.querySelector(".drop-down-given");
const new_link = document.querySelector(".drop-down-new");
const dropdowned = document.querySelector(".drop-down");
var myHeaders = new Headers();
myHeaders.append("apikey", "vh5cGQgRRpXD3tYVM0eIV2Vvhj2qY8Hz");

short_button.addEventListener("click", () => {
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
