const { dragOver, dragStart, drop } = require('./test_files/drag.js');
const { render } = require('./test_files/index.js');
const { addNewTask } = require('./test_files/add_remove.js');

describe('Test Drag and Drop functionality', () => {
  test('should change task\'s index on drag drop', () => {
    document.body.innerHTML = `
      <div>
        <ul id="js-todo-list">
            
        </ul>
        <input id="task-description" value="something">
          
        </input>
      </div>
    `;

    localStorage.clear();

    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();

    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks[0].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    render(tasks);

    const taskList = document.querySelectorAll('#js-todo-list li');
    const firstLiElement = taskList[0];
    const thirdLiElement = taskList[2];

    const firstElementMockEvent = {
      target: firstLiElement,
    };
    const thirdElementMockEvent = {
      target: thirdLiElement,
      preventDefault: () => {},
    };
    const dropMockEvent = {
      stopPropagation: () => {},
    };

    dragStart(firstElementMockEvent);
    dragOver(thirdElementMockEvent);
    const sortedTasks = tasks.sort((a, b) => a.index - b.index);
    drop(dropMockEvent, sortedTasks, render);

    tasks = JSON.parse(localStorage.getItem('tasks'));

    expect(!tasks[2].completed).toBe(true);
  });

  test('should change task\'s index on drag drop', () => {
    document.body.innerHTML = `
      <div>
        <ul id="js-todo-list">
            
        </ul>
        <input id="task-description" value="something">
          
        </input>
      </div>
    `;

    localStorage.clear();

    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();

    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks[3].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    render(tasks);

    const taskList = document.querySelectorAll('#js-todo-list li');
    const fourthLiElement = taskList[3];
    const firstLiElement = taskList[0];

    const firstElementMockEvent = {
      target: firstLiElement,
      preventDefault: () => {},
    };
    const fourthElementMockEvent = {
      target: fourthLiElement,
    };
    const dropMockEvent = {
      stopPropagation: () => {},
    };

    dragStart(fourthElementMockEvent);
    dragOver(firstElementMockEvent);
    const sortedTasks = tasks.sort((a, b) => a.index - b.index);
    drop(dropMockEvent, sortedTasks, render);

    tasks = JSON.parse(localStorage.getItem('tasks'));

    expect(!tasks[0].completed).toBe(true);
  });
});