const { updateStatus } = require('./test_files/box_status.js');
const { render } = require('./test_files/index.js');
const { addNewTask } = require('./test_files/add_remove.js');
const DOM = require('./DOMmock.js');

describe('Test Status Change Functionality', () => {
  test('Set a task status to completed, when clicked', () => {
    DOM();
    localStorage.clear();
    addNewTask();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);
    const addedListItemElement = document.querySelector('#js-todo-list li');
    const spanItem = addedListItemElement.children[0];
    const textElement = spanItem.children[1];
    const checkBox = spanItem.children[0];

    checkBox.checked = true;
    updateStatus(textElement, checkBox, tasks[0]);
    tasks = JSON.parse(localStorage.getItem('tasks'));

    expect(tasks[0].completed).toBe(true);
  });

  test('Should be set to uncompleted if clicked again', () => {
    DOM();
    localStorage.clear();
    addNewTask();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);

    const addedListItemElement = document.querySelector('#js-todo-list li');
    const spanItem = addedListItemElement.children[0];
    const textElement = spanItem.children[1];
    const checkBox = spanItem.children[0];

    checkBox.checked = true;
    updateStatus(textElement, checkBox, tasks[0]);
    tasks = JSON.parse(localStorage.getItem('tasks'));
    checkBox.checked = false;

    updateStatus(textElement, checkBox, tasks[0]);
    expect(tasks[0].completed).toBe(false);
  });
});
