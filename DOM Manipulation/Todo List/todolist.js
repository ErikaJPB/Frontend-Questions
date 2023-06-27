const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

addButton.disabled = true;

addButton.addEventListener("click", () => {
  const li = createItem(input.value);
  todoList.appendChild(li);
  input.value = "";
  addButton.disabled = true;
});

input.addEventListener("input", () => {
  addButton.disabled = input.value.length === 0;
});

function createItem(name) {
  const listItem = document.createElement("li");

  listItem.innerHTML = `<h2>${name}</h2>
  <button class="delete-button">X</button>`;

  const deleteButton = listItem.querySelector(".delete-button");

  deleteButton.addEventListener("click", () => {
    listItem.remove();
  });

  return listItem;
}
