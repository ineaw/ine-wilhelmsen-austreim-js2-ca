import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();

  if (titleValue.length === 0 || authorValue.length === 0 || summaryValue.length === 0) {
    return displayMessage("warning", "please supply proper values", ".message-container");
  }

  addBook(titleValue, authorValue, summaryValue);
}

async function addBook(title, author, summary) {
  const url = baseUrl + "articles";

  const data = JSON.stringify({ title: title, author: author, summary: summary });

  const token = getToken();

  const options = {
    method: "POST",
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
      displayMessage("success", "Article created", ".message-container");
      form.reset();
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
