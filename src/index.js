/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';
import updateStatus from './box_status.js';
import {
  addNewTask, editTask, deleteTask, clearAllCompleted,
} from './add_remove.js';
import { dragStart, dragOver, drop } from './drag.js';

const taskList = document.getElementById('js-todo-list');

let todoList = [];

function render(tasks) {
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

taskList.addEventListener('drop', (e) => {
  const sortedTasks = todoList.sort((a, b) => a.index - b.index);
  drop(e, sortedTasks, render);
});

if (localStorage.getItem('tasks')) {
  todoList = JSON.parse(localStorage.getItem('tasks'));
} else {
  localStorage.setItem('tasks', JSON.stringify(todoList));
}

document.getElementById('add-button').addEventListener('click', () => {
  addNewTask();
  todoList = JSON.parse(localStorage.getItem('tasks'));
  const sortedTasks = todoList.sort((a, b) => a.index - b.index);
  render(sortedTasks);
});

document.getElementById('task-description').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addNewTask();
    todoList = JSON.parse(localStorage.getItem('tasks'));
    const sortedTasks = todoList.sort((a, b) => a.index - b.index);
    render(sortedTasks);
  }
});

document.getElementById('clear-completed-button').addEventListener('click', () => {
  clearAllCompleted();
  if (localStorage.getItem('tasks')) {
    todoList = JSON.parse(localStorage.getItem('tasks'));
    const sortedTasks = todoList.sort((a, b) => a.index - b.index);
    render(sortedTasks);
  }
});

const sortedTasks = todoList.sort((a, b) => a.index - b.index);
document.addEventListener('DOMContentLoaded', render(sortedTasks));