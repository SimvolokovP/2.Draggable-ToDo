const addTaskBtn = document.getElementById('add_btn');
const modal = document.getElementById('todo_form');
const overlay = document.getElementById('overlay');
const createTaskBtn = document.getElementById('todo_submit');
const valueTask = document.getElementById('todo_input');
const noStatusContainer = document.getElementById('no-status-Container');
const todos = document.querySelectorAll(".todo");
const statusBoxex = document.querySelectorAll('.status');

let allTasks = [];

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
});


overlay.addEventListener('click', event => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
});

createTaskBtn.addEventListener('click', () => {
    const taskHTML = taskToHTML(valueTask.value);
    noStatusContainer.insertAdjacentHTML('beforeend', taskHTML);
    
    const newTaskElement = noStatusContainer.lastElementChild;
    newTaskElement.addEventListener("dragstart", dragStart);
    newTaskElement.addEventListener("dragend", dragEnd);

    valueTask.value = '';
});



function taskToHTML(value) {
    return `<div class="todo" draggable="true">
    ${value}
    <span onclick='removeTask(this)' class="close">&times;</span>
    </div>`;
}

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});


function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
      this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}

statusBoxex.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault();
}
  
  function dragEnter() {
    this.style.border = "1px dashed #ccc";
    console.log("dragEnter");
}
  
  function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
}
  
function dragDrop() {
    this.style.border = "none";

    this.appendChild(draggableTodo);
}

function removeTask(btn) {
    const currentElement = btn.parentElement;
    currentElement.remove();
}