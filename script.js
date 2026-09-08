const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const taskCount = document.querySelector('#task-count');
const today = document.querySelector('#today');

today.textContent = new Intl.DateTimeFormat('en', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
}).format(new Date());

const tasks = [];

function renderTasks() {
  list.replaceChildren();
  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = `task-item${task.done ? ' completed' : ''}`;
    item.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''} aria-label="Complete ${task.text}">
      <span>${task.text}</span>
      <button class="delete-button" type="button" aria-label="Delete ${task.text}">×</button>`;
    item.querySelector('input').addEventListener('change', () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });
    item.querySelector('.delete-button').addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });
    list.append(item);
  });
  const openCount = tasks.filter((task) => !task.done).length;
  taskCount.textContent = `${openCount} open`;
  emptyState.hidden = tasks.length > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = '';
  renderTasks();
  input.focus();
});

renderTasks();