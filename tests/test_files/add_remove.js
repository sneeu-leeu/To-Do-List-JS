function addNewTask() {
  const taskArray = JSON.parse(localStorage.getItem('tasks'));
  const description = document.getElementById('task-description').value;
  if (description !== '') {
    taskArray.push({
      description,
      completed: false,
      index: taskArray.length + 1,
    });
  }
  document.getElementById('task-description').value = '';
  localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function deleteTask(task) {
  const taskArray = JSON.parse(localStorage.getItem('tasks'));
  const sortedTasks = taskArray.sort((a, b) => a.index - b.index);
  sortedTasks.splice(task.index - 1, 1);
  sortedTasks.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(sortedTasks));
}

function editTask(e, listItem, textElement, spanItem, todoList, task, render) {
  const menu = e.target;
  menu.classList.remove('fa-ellipsis-v');
  menu.classList.add('fa-trash-alt');
  listItem.classList.add('bg-red');
  textElement.remove();
  const inputElement = document.createElement('input');
  inputElement.value = task.description;
  inputElement.classList.add('bg-red', 'no-border', 'white-txt');
  spanItem.append(inputElement);

  inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      task.description = inputElement.value;
      const sortedTasks = todoList.sort((a, b) => a.index - b.index);
      localStorage.setItem('tasks', JSON.stringify(sortedTasks));
      render(sortedTasks);
    }
  });

  inputElement.focus();
}

function clearAllCompleted() {
  const taskArray = JSON.parse(localStorage.getItem('tasks'));
  const filteredTaskArray = taskArray.filter((task) => task.completed === false);
  const sortedTasks = filteredTaskArray.sort((a, b) => a.index - b.index);

  sortedTasks.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('tasks', JSON.stringify(sortedTasks));
}

module.exports = {
  addNewTask, editTask, deleteTask, clearAllCompleted,
};
