import classNames from '../util/classNames';
import localStorageKeys from '../util/localStorageKeys';

const popupStatusBtn = document.querySelector('.js-popUp');
const popDownStatusBtn = document.querySelector('.js-popDown');
const popupMoreWeatherBtn = document.querySelector('.popUpMoreBtn');
const popDownMoreWeatherBtn = document.querySelector('.popDownMoreBtn');
const moreWeatherWindow = document.querySelector('.moreWeather');
const mainWeatherInfoSpan = document.querySelector('.js-weather');
const statusWindow = document.querySelector('.popUpWindow');
const nameLi = statusWindow.querySelector('.js-name');
const clockSettingLi = statusWindow.querySelector('.js-clockSet');
const locationSettingLi = statusWindow.querySelector('.js-location');

const { HIDDEN_COMPONENT, SMALL_TEXT } = classNames;
const { USER_NAME, CLOCK_SETTING, COORDS } = localStorageKeys;

const getStatus = () => {
  const storedName = localStorage.getItem(USER_NAME);
  const is12Hour = localStorage.getItem(CLOCK_SETTING);
  const storedLocation = localStorage.getItem(COORDS);
  const name = storedName || 'create!';
  const timeSetting = is12Hour ? '12H' : '24H';
  const locationSetting = storedLocation ? 'on' : 'off';
  return { name, timeSetting, locationSetting };
};

const paintStatus = statusObj => {
  const { name, timeSetting, locationSetting } = statusObj;
  if (name.length > 10) nameLi.classList.add(SMALL_TEXT);
  nameLi.textContent = `name : ${name}`;
  clockSettingLi.textContent = `clock setting : ${timeSetting}`;
  locationSettingLi.textContent = `GPS : ${locationSetting}`;
};

const handlePopup = () => {
  statusWindow.classList.remove(HIDDEN_COMPONENT);
  popupStatusBtn.classList.add(HIDDEN_COMPONENT);
  paintStatus(getStatus());
};

const handlePopDown = () => {
  statusWindow.classList.add(HIDDEN_COMPONENT);
  popupStatusBtn.classList.remove(HIDDEN_COMPONENT);
};

const handlePopupMore = () => {
  moreWeatherWindow.classList.remove(HIDDEN_COMPONENT);
  mainWeatherInfoSpan.classList.add(HIDDEN_COMPONENT);
  popupMoreWeatherBtn.classList.add(HIDDEN_COMPONENT);
};

const handlePopDownMore = () => {
  moreWeatherWindow.classList.add(HIDDEN_COMPONENT);
  popupMoreWeatherBtn.classList.remove(HIDDEN_COMPONENT);
  mainWeatherInfoSpan.classList.remove(HIDDEN_COMPONENT);
};

const initpopupStatusBtn = () => {
  popupStatusBtn.addEventListener('click', handlePopup);
  popDownStatusBtn.addEventListener('click', handlePopDown);
  popupMoreWeatherBtn.addEventListener('click', handlePopupMore);
  popDownMoreWeatherBtn.addEventListener('click', handlePopDownMore);
};

export default initpopupStatusBtn;
