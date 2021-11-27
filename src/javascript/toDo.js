import localStorageKeys from '../util/localStorageKeys';

const form = document.querySelector('.js-toDoForm');
const input = form.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const { TODOS } = localStorageKeys;

let toDos = [];

const saveToDos = () => {
  localStorage.setItem(TODOS, JSON.stringify(toDos));
};

const handleDelete = ({ target }) => {
  const li = target.parentNode;
  toDoList.removeChild(li);
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id, 10));
  saveToDos();
};

const paintToDo = text => {
  const li = document.createElement('li');
  const deleteBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', handleDelete);
  span.innerText = text;
  li.appendChild(deleteBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text,
    id: newId,
  };
  toDos.push(toDoObj);
};

const handleSubmit = event => {
  event.preventDefault();
  const currentValue = input.value;
  if (!currentValue) return;
  input.value = '';
  paintToDo(currentValue);
  saveToDos();
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS);
  if (!loadedToDos) return;
  JSON.parse(loadedToDos).forEach(toDo => paintToDo(toDo.text));
};

const initToDo = () => {
  loadToDos();
  form.addEventListener('submit', handleSubmit);
};

export default initToDo;
