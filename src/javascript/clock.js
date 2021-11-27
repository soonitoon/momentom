import localStorageKeys from '../util/localStorageKeys';
import { timeTemplate12H, timeTemplate24H } from '../util/timeTemplate';

const clockContainer = document.querySelector('.js-clock');
const timeText = clockContainer.querySelector('h1');
const clockSetBtn = document.querySelector('.js-setClock');

const CLOCK_TICK_MS = 1000;
const INITIAL_CLOCK_SETTING = false;
const { CLOCK_SETTING } = localStorageKeys;

let is12Hour;

const getTime = () => {
  const date = new Date();
  const timeObj = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
  timeText.textContent = is12Hour
    ? timeTemplate12H(timeObj)
    : timeTemplate24H(timeObj);
};

const updateClockSetBtnText = () => {
  clockSetBtn.textContent = is12Hour ? '12H' : '24H';
};

const saveClockSetting = newSetting => {
  is12Hour = newSetting;
  localStorage.setItem(CLOCK_SETTING, JSON.stringify(newSetting));
  updateClockSetBtnText();
  getTime();
};

const updateClockSetting = () => {
  const storedSetting = localStorage.getItem(CLOCK_SETTING);
  is12Hour =
    storedSetting === null ? INITIAL_CLOCK_SETTING : JSON.parse(storedSetting);
  updateClockSetBtnText();
};

const initClock = () => {
  updateClockSetting();
  setInterval(getTime, CLOCK_TICK_MS);
  clockSetBtn.addEventListener('click', () => saveClockSetting(!is12Hour));
};

export default initClock;
