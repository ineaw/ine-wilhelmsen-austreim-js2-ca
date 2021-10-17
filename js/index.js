import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { renderBooks } from "./filter/renderBooks.js";
import { searchBooks } from "./filter/searchBooks.js";
import createMenu from "./components/createMenu.js";

const booksUrl = baseUrl + "articles";

createMenu();

(async function () {
  const bookContainer = document.querySelector(".book-container");

  try {
    const response = await fetch(booksUrl);
    const json = await response.json();

    renderBooks(json);
    searchBooks(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".book-container");
  }
})();
