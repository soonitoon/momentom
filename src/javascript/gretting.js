import classNames from '../util/classNames';
import localStorageKeys from '../util/localStorageKeys';

const form = document.querySelector('.js-form');
const name = document.querySelector('.js-greetings');
const input = form.querySelector('input');

const { SHOWED_COMPONENT } = classNames;
const { USER_NAME } = localStorageKeys;

const paintName = text => {
  form.classList.remove(SHOWED_COMPONENT);
  name.classList.add(SHOWED_COMPONENT);
  name.textContent = `Hello, ${text}`;
};

const handleSubmit = event => {
  event.preventDefault();
  const currentValue = input.value;
  localStorage.setItem(USER_NAME, currentValue);
  paintName(currentValue);
};

const askForName = () => {
  form.classList.add(SHOWED_COMPONENT);
  form.addEventListener('submit', handleSubmit);
};

const initGretting = () => {
  const currentUser = localStorage.getItem(USER_NAME);
  if (!currentUser) {
    askForName();
    return;
  }
  paintName(currentUser);
};

export default initGretting;
