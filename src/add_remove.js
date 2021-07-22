function addNewTask() {
  const taskArray = JSON.parse(localStorage.getItem('tasks'));
  const description = document.getElementById('task-description').value;
  taskArray.push({
    description,
    completed: false,
    index: taskArray.length + 1,
  });
  document.getElementById('task-description').value = '';
  localStorage.setItem('tasks', JSON.stringify(taskArray));
}