import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";
import displayMessage from "../displayMessage.js";

export default function deleteButton(id) {
  const container = document.querySelector(".delete-container");

  container.innerHTML = `<button type="button" class="delete">Delete</button>`;

  const button = document.querySelector("button.delete");

  button.onclick = async function () {
    console.log(id);

    const doDelete = confirm("Are you sure you want to delete this article?");

    if (doDelete) {
      const url = baseUrl + "articles/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        if (json.created_at) {
          displayMessage("success", "Book deleted", ".message-container");

          location.href = "/";
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
  };
}
