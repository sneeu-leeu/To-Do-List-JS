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

function deleteTask(task) {
  const taskArray = JSON.parse(localStorage.getItem('tasks'));
  const sortedTasks = taskArray.sort((a, b) => a.index - b.index);
  sortedTasks.splice(task.index - 1, 1);
  sortedTasks.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(sortedTasks));
}