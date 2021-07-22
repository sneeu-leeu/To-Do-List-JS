/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';
import { dragStart, dragOver, drop } from './drag.js';

const taskList = document.getElementById('js-todo-list');

const todoList = [
  {
    description: '1 - Task 1',
    completed: false,
    index: 0,
  },
  {
    description: '2 - Task 2',
    completed: false,
    index: 1,
  },
  {
    description: '3 - Task 3',
    completed: false,
    index: 2,
  },
];

function render(tasks) {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.draggable = true;
    listItem.classList.add('border', 'flex', 'height', 'pad-left', 'todo-item');
  });
  listItem.id = task.index;

  const spanItem = document.createElement('span');
  const textElement = document.createElement('p');

  textElement.innerText = task.description;
  textElement.classList.add('d-inline');
  const menu = document.createElement('i');
  menu.classList.add('fa', 'fa-ellipsis-v', 'text-secondary');

  listItem.append(spanItem, menu);
  taskList.append(listItem);

  listItem.addEventListener('dragover', dragOver);
  listItem.addEventListener('dragstart', dragStart);
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('me-2');

  if (task.completed) {
    textElement.classList.add('strike', 'text-muted');
    checkBox.checked = true;
  }
  spanItem.append(checkBox, textElement);
  checkBox.addEventListener('change', () => {
    updateStatus(textElement, checkBox, task);
  });
}




//   const sortedTask = todoList.sort((a, b) => a.index - b.index);
//   sortedTask.forEach((task) => {
//     const listItem = document.createElement('li');
//     listItem.classList.add('border', 'flex', 'height', 'pad-left', 'todo-item');
//     const spanItem = document.createElement('span');
//     const checkBox = document.createElement('input');
//     checkBox.type = 'checkbox';
//     checkBox.classList.add('check');
//     const menu = document.createElement('i');
//     menu.classList.add('fa', 'fa-ellipsis-v');
//     spanItem.append(checkBox, task.description);
//     listItem.append(spanItem, menu);
//     taskList.append(listItem);
//   });
// }

document.addEventListener('DOMContentLoaded', render);