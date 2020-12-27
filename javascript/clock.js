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
<<<<<<< HEAD
      minutes < 10 ? `0${minutes}` : minutes
=======
    minutes < 10 ? `0${minutes}` : minutes
>>>>>>> 00cfe01808d5db2b0cc390277bff9c1e8bb2060e
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  } else {
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours = hours - 12;
    }
    clockTitle.innerText = `${hours}:${
<<<<<<< HEAD
      minutes < 10 ? `0${minutes}` : minutes
=======
    minutes < 10 ? `0${minutes}` : minutes
>>>>>>> 00cfe01808d5db2b0cc390277bff9c1e8bb2060e
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}

function saveClockSetting(clockSet) {
  localStorage.setItem(CLOCKSET_LS, JSON.stringify(clockSet));
}

function handleBtn() {
  let clockSet = JSON.parse(localStorage.getItem(CLOCKSET_LS));
  if (clockSet === true) {
    clockSet = false;
    btn.innerText = "24H";
    getTime();
  } else {
    clockSet = true;
    btn.innerText = "12H";
    getTime();
  }
  saveClockSetting(clockSet);
}

function init() {
  saveClockSetting(true);
  getTime();
  setInterval(getTime, 1000);
  btn.addEventListener("click", handleBtn);
}

init();
