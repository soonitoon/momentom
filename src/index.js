import css from "./index.css";

const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1"),
  greeting = document.querySelector(".js-greetings"),
  form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  weather = document.querySelector(".js-weather"),
  btn = document.querySelector(".js-setClock"),
  resetBtn = document.querySelector(".js-reset"),
  popUpBtn = document.querySelector(".js-popUp"),
  popUpWindow = document.querySelector(".popUpWindow"),
  popDownBtn = document.querySelector(".js-popDown"),
  popUpMoreBtn = document.querySelector(".popUpMoreBtn"),
  moreWeatherWindow = document.querySelector(".moreWeather"),
  popDownMoreBtn = document.querySelector(".popDownMoreBtn"),
  body = document.querySelector("body");

const moreWeather = {
  feels_like: document.querySelector(".feels_like"),
  humidity: document.querySelector(".humidity"),
  temp: document.querySelector(".temp"),
  temp_max: document.querySelector(".temp_max"),
  temp_min: document.querySelector(".temp_min"),
};

const CLOCKSET_LS = "clockSet";

function getTime() {
  const date = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let seconds = date.getSeconds();
  let clockSet = JSON.parse(localStorage.getItem(CLOCKSET_LS));
  if (clockSet === false) {
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  } else {
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours = hours - 12;
    }
    clockTitle.innerText = `${hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}

function saveClockSetting(clockSet) {
  localStorage.setItem(CLOCKSET_LS, JSON.stringify(clockSet));
}

function handleBtn() {
  let clockSet = JSON.parse(localStorage.getItem(CLOCKSET_LS));
  if (clockSet === true) {
    saveClockSetting(false);
    btn.innerText = "24H";
    getTime();
  } else {
    saveClockSetting(true);
    btn.innerText = "12H";
    getTime();
  }
}

// ================ gretting.js

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  parintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function parintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    parintGreeting(currentUser);
  }
}

// ========= todo.js

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const value = span.innerText;
  span.innerHTML = `<del>${value}</del>`;
  setTimeout(() => {
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  }, 800);
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  if (toDos.length < 5) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
      text: text,
      id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const paredToDos = JSON.parse(loadedToDos);
    paredToDos.forEach(function (toDo) {
      paintTodo(toDo.text);
    });
  }
}

// ========= weather.js

const COORDS = "coords";
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      const main = json.weather[0].main;
      const feelsLike = json.main.feels_like;
      const humidity = json.main.humidity;
      const temp_max = json.main.temp_max;
      const temp_min = json.main.temp_min;
      weather.innerHTML = `temp ${temp.toFixed(1)}°C, ${main}<br><br>${place}`;
      moreWeather.feels_like.innerText = `feels like : ${feelsLike}°C`;
      moreWeather.humidity.innerText = `humidity : ${humidity}%`;
      moreWeather.temp.innerText = `temp : ${temp}°C`;
      moreWeather.temp_max.innerText = `temp max : ${temp_max}°C`;
      moreWeather.temp_min.innerText = `temp min : ${temp_min}°C`;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function hadleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function hadleGeoError() {
  console.log("Cant access geo location");
  const btn = document.querySelector(".popUpMoreBtn");
  btn.classList.add(HIDING_CN);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(hadleGeoSucces, hadleGeoError);
}

function loadCoords() {
  const loadedCodrds = localStorage.getItem(COORDS);
  if (loadedCodrds === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCodrds);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function reset() {
  resetBtn.addEventListener("click", () => {
    localStorage.clear();
    location.href = "./";
  });
}

let Ispop = false;

const HIDING_CN = "hidden";

function getStatus() {
  let name = localStorage.getItem(USER_LS);
  let clockSet = JSON.parse(localStorage.getItem(CLOCKSET_LS));
  let location = localStorage.getItem(COORDS);
  if (name === null) {
    name = "create!";
  }
  if (clockSet === true) {
    clockSet = "12H";
  } else {
    clockSet = "24H";
  }
  if (location === null) {
    location = "off";
  } else {
    location = "on";
  }

  return {
    name,
    clockSet,
    location,
  };
}

function paintStatus() {
  const status = getStatus();
  const li_name = popUpWindow.querySelector(".js-name");
  const li_clockSet = popUpWindow.querySelector(".js-clockSet");
  const li_location = popUpWindow.querySelector(".js-location");
  if (status.name.length > 10) {
    li_name.classList.add("tooLong");
  }
  li_name.innerText = `name : ${status.name}`;
  li_clockSet.innerText = `clock : ${status.clockSet}`;
  li_location.innerText = `GPS : ${status.location}`;
}

function popUp() {
  popUpWindow.classList.remove(HIDING_CN);
  popUpBtn.classList.add(HIDING_CN);
  paintStatus();
}

function popDown() {
  popUpWindow.classList.add(HIDING_CN);
  setTimeout(() => {
    popUpBtn.classList.remove(HIDING_CN);
  }, 100);
}

function initBtns() {
  popUpBtn.addEventListener("click", popUp);
  popDownBtn.addEventListener("click", popDown);
}

function popUpMore() {
  moreWeatherWindow.classList.remove(HIDING_CN);
  weather.classList.add(HIDING_CN);
  popUpMoreBtn.classList.add(HIDING_CN);
}

function popDownMore() {
  moreWeatherWindow.classList.add(HIDING_CN);
  setTimeout(() => {
    popUpMoreBtn.classList.remove(HIDING_CN);
    weather.classList.remove(HIDING_CN);
  }, 100);
}

function initMoreBtns() {
  popUpMoreBtn.addEventListener("click", popUpMore);
  popDownMoreBtn.addEventListener("click", popDownMore);
}

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape`;

function getImage() {
  fetch(UNSPLASH_URL)
    .then((response) => response.json())
    .then((json) => {
      const url = json.urls.full;
      if (url) {
        const img = new Image();
        img.src = url;
        body.appendChild(img);
      } else {
        getImage();
      }
    });
}

function init() {
  saveClockSetting(true);
  getTime();
  setInterval(getTime, 1000);
  btn.addEventListener("click", handleBtn);
  loadName();
  loadToDos();
  toDoForm.addEventListener("submit", handleToDoSubmit);
  loadCoords();
  reset();
  initBtns();
  initMoreBtns();
  getImage();
}

init();
