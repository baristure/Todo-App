// Select all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners() {
  //All Event Listeners

  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}
//
//
//
function clearAllTodos(e) {
  if (confirm("Do you want to delete all of them?")) {
    //Clear all todos from UI
    // todoList.innerHTML = ""; <<<< It's slowly way
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}
//
//
//
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function(listItem) {
    const text = listItem.textContent.toLowerCase();

    if (text.indexOf(filterValue) === -1) {
      // Can't find
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}
//
//
//
function deleteTodo(e) {
  // Find clicked targets class, id etc.
  // console.log(e.target);
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

    showAlert("success", "Todo deleted successfully...");
  }
}
//
//
//
function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function(todo, index) {
    if (todo == deletetodo) {
      todos.splice(index, 1); //Delete value from array
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
//
//
//
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function(todo) {
    addTodoToUI(todo);
  });
}
//
//
//
function addTodo(e) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Please enter a todo!");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo added successfully...");
  }
  e.preventDefault();
}
//
//
//
function getTodosFromStorage() {
  //Call todos from the storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // Todos convert to array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
//
//
//
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//
//
//
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  // setTimout For the alert delete delay
  setTimeout(function() {
    alert.remove();
  }, 1000);
}
//
//
//
function addTodoToUI(newTodo) {
  // **Add string value to UI by list item**
  //Create a list item
  const listItem = document.createElement("li");
  //Create a link
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  //Text Node
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  //Add List Item to Todo List
  todoList.appendChild(listItem);
}
