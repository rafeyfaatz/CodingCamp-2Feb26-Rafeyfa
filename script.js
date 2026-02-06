const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");
const deleteAllBtn = document.getElementById("deleteAll");

let todos = [];

document.getElementById("todoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (todoInput.value.trim() === "" || todoDate.value === "") {
    alert("Please enter task and date");
    return;
  }

  todos.push({
    id: Date.now(),
    text: todoInput.value,
    date: todoDate.value,
    completed: false,
  });

  todoInput.value = "";
  todoDate.value = "";
  renderTodos();
});

filter.addEventListener("change", renderTodos);

deleteAllBtn.addEventListener("click", function () {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (filter.value === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (filter.value === "pending") {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<li class="empty">No task found</li>`;
    return;
  }

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed todo-row" : "todo-row";

    li.innerHTML = `
      <span class="task">${todo.text}</span>
      <span class="date">${todo.date}</span>
      <span class="status">${todo.completed ? "Completed" : "Pending"}</span>
      <div class="actions">
        <button class="done-btn">✔</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    li.querySelector(".done-btn").onclick = () => toggleStatus(todo.id);
    li.querySelector(".delete-btn").onclick = () => deleteTodo(todo.id);

    todoList.appendChild(li);
  });
}

function toggleStatus(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}
