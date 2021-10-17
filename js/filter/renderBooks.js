import { getExistingFavs } from "../components/favFunctions.js";

export function renderBooks(booksToRender) {
  const bookContainer = document.querySelector(".book-container");
  bookContainer.innerHTML = "";

  const favourites = getExistingFavs();

  booksToRender.forEach((book) => {
    let favIcon = "far";

    const doesFavExist = favourites.find(function (fav) {
      return parseInt(fav.id) === book.id;
    });

    if (doesFavExist) {
      favIcon = "fa";
    }

    bookContainer.innerHTML += `
        <div class="book">
        <h3>${book.title}</h3>
        <h4>By ${book.author}</h4>
        <p>${book.summary}</p>
        <a href="book.html?id=${book.id}">
        <button>Read more</button>
        </a>
        <i class="${favIcon} fa-heart" data-id="${book.id}" data-title="${book.title}" data-author="${book.author}" data-summary="${book.summary}"></i>
        </div>
        `;
  });

  const favButtons = document.querySelectorAll(".book i");

  favButtons.forEach((iButton) => {
    iButton.addEventListener("click", handleClick);
  });

  function handleClick() {
    this.classList.toggle("fa");
    this.classList.toggle("far");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const author = this.dataset.author;
    const summary = this.dataset.summary;

    const currentFavs = getExistingFavs();

    const bookExists = currentFavs.find(function (fav) {
      return fav.id === id;
    });

    if (bookExists === undefined) {
      const book = { id: id, title: title, author: author, summary: summary };

      currentFavs.push(book);

      saveFavs(currentFavs);
    } else {
      const newFavs = currentFavs.filter((fav) => fav.id !== id);
      saveFavs(newFavs);
    }
  }
  function saveFavs(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
  }
}
