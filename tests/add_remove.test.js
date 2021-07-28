const { addNewTask, deleteTask } = require('./test_files/add_remove.js');
const { render } = require('./test_files/index.js');

describe('Test Add and Remove', () => {
  test('should add tasks to list', () => {
    document.body.innerHTML = `
      <div>
        <ul id="js-todo-list">
            
        </ul>
        <input id="task-description" value="something">
          
        </input>
      </div>
    `;
    addNewTask();

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);

    const taskList = document.querySelectorAll('#js-todo-list li');
    expect(taskList).toHaveLength(1);
  });

  test('should remove task to List', () => {
    document.body.innerHTML = `
      <div>
        <ul id="js-todo-list">
            
        </ul>
        <input id="task-description" value="something">
          
        </input>
      </div>
    `;
    addNewTask();
    addNewTask();
    addNewTask();

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);

    let taskList = document.querySelectorAll('#js-todo-list li');
    const initialLength = taskList.length;

    deleteTask({ index: 1 });
    tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);

    taskList = document.querySelectorAll('#js-todo-list li');
    expect(taskList).toHaveLength(initialLength - 1);
  });
});
