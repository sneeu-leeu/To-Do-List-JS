module.exports = function DOM() {
  document.body.innerHTML = `
      <div>
        <ul id="js-todo-list">
        </ul>
        <input id="task-description" value="something">
        </input>
      </div>
    `;
  return document;
};
