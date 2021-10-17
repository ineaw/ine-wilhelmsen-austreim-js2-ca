import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";

createMenu();

const querystring = document.location.search;

const params = new URLSearchParams(querystring);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const bookUrl = baseUrl + "articles/" + id;

(async function () {
  try {
    const response = await fetch(bookUrl);
    const details = await response.json();

    document.title = details.title;

    const bookContainer = document.querySelector(".detail-container");

    bookContainer.innerHTML = `
    <div class="detail">
    <h1>${details.title}</h1>
    <h2>By: ${details.author}</h2>
    <p>${details.summary}</p>
    <a href="edit.html?id=${details.id}">
    <button>Edit book</button>
    </a>
    </div>
    `;
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".message-container");
  }
})();
