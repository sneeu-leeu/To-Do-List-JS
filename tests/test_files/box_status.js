function updateStatus(textElement, checkBox, task) {
  const todoList = JSON.parse(localStorage.getItem('tasks'));
  const currentTask = todoList.find((t) => t.index === task.index);
  textElement.classList.toggle('strike');
  textElement.classList.toggle('text-muted');
  if (checkBox.checked) {
    task.completed = true;
    currentTask.completed = true;
  } else {
    task.completed = false;
    currentTask.completed = false;
  }
  localStorage.setItem('tasks', JSON.stringify(todoList));
}

module.exports = updateStatus;