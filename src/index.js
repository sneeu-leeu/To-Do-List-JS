import './css/styles.css';

const todoList = [
  {

  },
  {

  },
];

function render() {
  const taskList = document.getElementById('js-todo-list');
  taskList.innerHTML = '';
  const sortedTask = todoList.sort((a, b) => a.index - b.index);
  sortedTask.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('border flex height pad-left');
    const spanItem = document.createElement('span');
    const checkBox = document.createElement('input');
    checkBox.type = 'checbox';
    checkBox.classList.add('check');
    const menu = document.createElement('i');
    menu.classList.add('fa', 'fa-ellipsis-v');
    spanItem.append(checkBox, task.description);
    listItem.append(spanItem, menu);
    todoList.append(listItem);
  });
}

document.addEventListener('DOMContentLoaded', render);