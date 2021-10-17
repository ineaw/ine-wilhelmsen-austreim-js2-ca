import { getUserName } from "../utils/storage.js";
import logoutButton from "./articles/logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".menu-container");

  const username = getUserName();

  let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

  if (username) {
    authLink = `<a href="add.html" class="${pathname === "/add.html" ? "active" : ""}">Add book</a>
                  <button id="logout">Logout ${username}</button>
     `;
  }

  container.innerHTML = `<div class="menu">
                              <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
                              <a href="/favourites.html" class="${pathname === "/favourites.html" ? "active" : ""}">Favourites</a>
                              ${authLink}
                      </div>`;

  logoutButton();
}
