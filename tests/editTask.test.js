const { render } = require('./test_files/index.js');
const { editTask, addNewTask } = require('./test_files/add_remove.js');

describe('Test Edit Task Functionality', () => {
  test('should edit a task', () => {
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
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    render(tasks);
    const addedListItemElement = document.querySelector('#js-todo-list li');
    const spanItem = addedListItemElement.children[0];
    const mockEvent = {
      target: document.createElement('i'),
    };
    editTask(mockEvent,
      addedListItemElement,
      spanItem.children[1],
      spanItem,
      tasks,
      tasks[0],
      render);
    const inputElement = spanItem.children[1];
    inputElement.value = 'New Task Description';
    const e = document.createEvent('HTMLEvents');
    e.initEvent('keydown', false, true);
    e.key = 'Enter';
    inputElement.dispatchEvent(e);
    expect(spanItem.children[1].value).toBe('New Task Description');
  });
});
