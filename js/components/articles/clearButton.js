export default function clearButton() {
  const clearBtn = document.querySelector("#clear");
  const clearFavs = document.querySelector(".fav-container");

  clearBtn.addEventListener("click", clearFavourites);

  function clearFavourites() {
    if (confirm("Are you sure you want to clear all favourites?")) {
      localStorage.removeItem("favourites");
      clearFavs.innerHTML = "You have no more favourites 😔 ";
      clearBtn.style.display = "none";
    }
  }
}
