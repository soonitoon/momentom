import classNames from '../util/classNames';
import localStorageKeys from '../util/localStorageKeys';

const mainInfoSpan = document.querySelector('.js-weather');
const feelsLikeLi = document.querySelector('.feels_like');
const humidityLi = document.querySelector('.humidity');
const tempLi = document.querySelector('.temp');
const tempMaxLi = document.querySelector('.temp_max');
const tempMinLi = document.querySelector('.temp_min');
const popUpMoreBtn = document.querySelector('.popUpMoreBtn');

const { COORDS } = localStorageKeys;

// eslint-disable-next-line prefer-destructuring
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`;

const paintweatherInfo = weatherObj => {
  const {
    main,
    name,
    moreInfo: { temp, humidity, temp_max, temp_min, feels_like },
  } = weatherObj;
  mainInfoSpan.innerHTML = `temp ${temp.toFixed(1)}°C, ${main}<br><br>${name}`;
  feelsLikeLi.textContent = `feels like : ${feels_like}°C`;
  humidityLi.textContent = `humidity : ${humidity}%`;
  tempLi.textContent = `temp : ${temp}°C`;
  tempMaxLi.textContent = `temp max : ${temp_max}°C`;
  tempMinLi.textContent = `temp min : ${temp_min}°C`;
};

const getWeather = async ({ latitude, longitude }) => {
  const queryConfig = {
    lat: latitude,
    lon: longitude,
    appid: OPENWEATHER_API_KEY,
    units: 'metric',
  };
  const queryURL = Object.keys(queryConfig)
    .map(key => `${key}=${queryConfig[key]}`)
    .join('&');
  const data = await fetch(OPENWEATHER_API_BASE_URL + queryURL);
  const parsedData = await data.json();
  const {
    weather,
    name,
    main: { temp, humidity, temp_max, temp_min, feels_like },
  } = parsedData;
  const { main } = weather[0];
  const weatherObj = {
    main,
    name,
    moreInfo: {
      temp,
      humidity,
      temp_max,
      temp_min,
      feels_like,
    },
  };
  return weatherObj;
};

const saveCoords = coordsObj => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const hadleGeoSucces = async position => {
  const {
    coords: { latitude, longitude },
  } = position;
  const coordsObj = { latitude, longitude };
  const weatherObj = await getWeather(coordsObj);
  paintweatherInfo(weatherObj);
  saveCoords(coordsObj);
};

const hadleGeoError = () => {
  popUpMoreBtn.classList.add(classNames.HIDDEN_COMPONENT);
};

const initWeatherInfo = async () => {
  const storedCoords = localStorage.getItem(COORDS);
  if (!storedCoords) {
    navigator.geolocation.getCurrentPosition(hadleGeoSucces, hadleGeoError);
    return;
  }
  const weatherObj = await getWeather(JSON.parse(storedCoords));
  paintweatherInfo(weatherObj);
};

export default initWeatherInfo;
