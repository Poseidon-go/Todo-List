function creatLiElement(todo) {
  const todoTemplate = document.getElementById("todoTemplate");
  if (!todoTemplate) return;
  const liElement = todoTemplate.content.firstElementChild.cloneNode(true);
  if (!liElement) return;

  const paraElement = liElement.querySelector(".todo p");
  if (!paraElement) return;
  paraElement.textContent = todo.name;

  // attack button
  const removeElement = liElement.querySelector(".remove");
  if (!removeElement) return;

  removeElement.addEventListener("click", () => {
    liElement.remove();
    // remove item on local

    const todoList = getTodoList();
    const newToDoList = todoList.filter((x) => x.id !== todo.id);
    console.log("newTodoList", newToDoList);
    // update todoList
    localStorage.setItem("todo_list", JSON.stringify(newToDoList));
  });

  const editElement = liElement.querySelector(".edit");
  if (!editElement) return;

  editElement.addEventListener("click", () => {
    console.log(1);
  });
  return liElement;
}

function renderTodoList(todoList) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const todoListElement = document.getElementById("todoList");
  if (!todoListElement) return;

  const todoSearchElement = document.getElementById("todoForm");

  // add new Item
  const todoSearch = document.getElementById("todo-search");
  if (!todoSearch) return;
  todoSearch.addEventListener("input", () => {
    const todo = {
      id: Date.now(),
      title: todoSearch.value,
    };
    todoSearchElement.dataset.id = Date.now();
    creatLiElement(todo);
  });

  // loop each element and
  todoList.forEach((todo) => {
    const liElement = creatLiElement(todo);
    todoListElement.appendChild(liElement);
  });
}
function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem("todo_list"));
  } catch (error) {
    return [];
  }
}

function handleFormSubMit(even) {
  even.preventDefault();
  console.log("form submit");

  const inputElement = document.getElementById("todo-search");
  if (!inputElement) return;

  const todoText = inputElement.value;
  if (todoText.trim().length === 0) return;
  const newToDo = {
    id: Date.now(),
    name: todoText.trim(),
  };
  const todoList = getTodoList() || [];
  todoList.push(newToDo);
  localStorage.setItem("todo_list", JSON.stringify(todoList));

  const newLiElement = creatLiElement(newToDo);
  const todoListElement = document.getElementById("todoList");
  if (!todoListElement) return;

  todoListElement.appendChild(newLiElement);
}
// main
(() => {
  // setToDoList();
  const todoList = getTodoList();
  renderTodoList(todoList);

  const todoSearchElement = document.getElementById("todoForm");
  if (todoSearchElement) {
    todoSearchElement.addEventListener("submit", handleFormSubMit);
  }
})();
