const { render } = require('./test_files/index.js');
const { addNewTask, clearAllCompleted } = require('./test_files/add_remove.js');
const DOM = require('./DOMmock.js');

describe('Clear all tasks after they have been completed', () => {
  test('Should clear all tasks from todoList that have been marked completed', () => {
    DOM();

    localStorage.clear();

    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();
    addNewTask();

    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks[1].completed = true;
    tasks[3].completed = true;
    tasks[4].completed = true;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);
    let taskList = document.querySelectorAll('#js-todo-list li');
    expect(taskList.length).toBe(5);

    clearAllCompleted();
    tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);

    taskList = document.querySelectorAll('#js-todo-list li');
    expect(taskList.length).toBe(2);
  });
});
