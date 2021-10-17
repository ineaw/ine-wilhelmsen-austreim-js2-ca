import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";
import deleteButton from "./components/articles/deleteButton.js";

createMenu();

const querystring = document.location.search;

const params = new URLSearchParams(querystring);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const bookUrl = baseUrl + "articles/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loader = document.querySelector(".loader");

(async function () {
  try {
    const response = await fetch(bookUrl);
    const details = await response.json();

    title.value = details.title;
    author.value = details.author;
    summary.value = details.summary;
    idInput.value = details.id;

    deleteButton(details.id);
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();
  const idValue = idInput.value;

  if (titleValue.length === 0 || authorValue.length === 0 || summaryValue.length === 0) {
    return displayMessage("warning", "please supply proper values", ".message-container");
  }

  updateBook(titleValue, authorValue, summaryValue, idValue);
}

async function updateBook(title, author, summary, id) {
  const url = baseUrl + "articles/" + id;

  const data = JSON.stringify({ title: title, author: author, summary: summary });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Book updated", ".message-container");
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }

    console.log(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".message-container");
  }
}
