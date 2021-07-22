/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';

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

function render() {
  const taskList = document.getElementById('js-todo-list');
  taskList.innerHTML = '';
  const sortedTask = todoList.sort((a, b) => a.index - b.index);
  sortedTask.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('border', 'flex', 'height', 'pad-left', 'todo-item');
    const spanItem = document.createElement('span');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('check');
    const menu = document.createElement('i');
    menu.classList.add('fa', 'fa-ellipsis-v');
    spanItem.append(checkBox, task.description);
    listItem.append(spanItem, menu);
    taskList.append(listItem);
  });
}

document.addEventListener('DOMContentLoaded', render);