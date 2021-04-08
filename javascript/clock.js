const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

const btn = document.querySelector(".js-setClock");

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

function init() {
  saveClockSetting(true);
  getTime();
  setInterval(getTime, 1000);
  btn.addEventListener("click", handleBtn);
}

init();
