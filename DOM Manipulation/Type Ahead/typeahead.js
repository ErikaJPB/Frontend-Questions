const BASE_URL = "https://api.frontendexpert.io/api/fe/glossary-suggestions";

let timeOutId;

const input = document.getElementById("typeahead");
const suggestionsList = document.getElementById("suggestions-list");

input.addEventListener("input", () => {
  if (input.value.length === 0) {
    clearSuggestions();
    return;
  }

  clearTimeout(timeOutId);

  timeOutId = setTimeout(makeRequest, 500, input.value);
});

function makeRequest(text) {
  const url = new URL(BASE_URL);
  url.searchParams.set("text", text);

  fetch(url)
    .then((response) => response.json())
    .then((suggestions) => {
      const fragment = document.createDocumentFragment();
      suggestions.forEach((suggestion) => {
        fragment.appendChild(createSuggestionItem(suggestion));
      });

      suggestionsList.replaceChildren(fragment);
    })
    .catch((error) => console.error(error));
}

function createSuggestionItem(suggestion) {
  const elem = document.createElement("li");
  elem.textContent = suggestion;

  elem.addEventListener("click", () => {
    input.value = suggestion;

    clearSuggestions();
  });
  return elem;
}

function clearSuggestions() {
  clearTimeout(timeOutId);
  suggestionsList.innerHTML = "";
}
