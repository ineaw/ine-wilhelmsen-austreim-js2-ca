import { getExistingFavs } from "./components/favFunctions.js";
import clearButton from "./components/articles/clearButton.js";
import createMenu from "./components/createMenu.js";

createMenu();

const favourites = getExistingFavs();
clearButton();

const favContainer = document.querySelector(".fav-container");
const clearBtn = document.querySelector("#clear");

favContainer.innerHTML = "";

if (favourites.length === 0) {
  favContainer.innerHTML = "No favourites yet";
  clearBtn.style.display = "none";
}

favourites.forEach((favourite) => {
  let favIcon = "fa";

  const doesFavExist = favourites.find(function (fav) {
    return parseInt(fav.id) === favourite.id;
  });

  if (doesFavExist) {
    favIcon = "far";
  }

  favContainer.innerHTML += `<div class="fav">
    <h3>${favourite.title}</h3>
    <h4>${favourite.author}</h4>
    <h4>${favourite.summary}</h4>
    <a href="book.html?id=${favourite.id}">
    <button>Read more</button>
    </a>
    </div>`;
});
