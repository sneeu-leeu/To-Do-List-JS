const { dragStart, dragOver } = require('./drag.js');
const { editTask, deleteTask } = require('./add_remove.js');
const { updateStatus } = require('./box_status.js');

let todoList = [];

function render(tasks) {
  const taskList = document.getElementById('js-todo-list');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.draggable = true;
    listItem.classList.add('border', 'flex', 'height', 'pad-left', 'todo-item');
    listItem.id = task.index;

    const spanItem = document.createElement('span');
    spanItem.classList.add('flex', 'text-align');
    const labelItem = document.createElement('label');
    const textElement = document.createElement('p');
    textElement.classList.add('pad-left');
    textElement.innerText = task.description;
    const menu = document.createElement('i');
    menu.classList.add('fa', 'fa-ellipsis-v', 'right');
    menu.addEventListener('click', (e) => {
      editTask(e, listItem, textElement, spanItem, todoList, task, render);
      menu.addEventListener('click', () => {
        deleteTask(task);
        todoList = JSON.parse(localStorage.getItem('tasks'));
        const sortedTasks = todoList.sort((a, b) => a.index - b.index);
        render(sortedTasks);
      });
    });
    labelItem.append(textElement);
    listItem.append(spanItem, menu);
    taskList.append(listItem);

    listItem.addEventListener('dragover', dragOver);
    listItem.addEventListener('dragstart', dragStart);
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('check');

    if (task.completed) {
      textElement.classList.add('strike', 'text-muted');
      checkBox.checked = true;
    }
    spanItem.append(checkBox, textElement);
    checkBox.addEventListener('change', () => {
      updateStatus(textElement, checkBox, task);
    });
  });
}

module.exports = { render };
