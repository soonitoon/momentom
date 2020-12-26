const popUpBtn = document.querySelector(".js-popUp"),
    popUpWindow = document.querySelector(".popUpWindow"),
    popDownBtn = document.querySelector(".js-popDown");

let Ispop = false;

const HIDING_CN = "hidden"

function getStatus() {
    let name = localStorage.getItem(USER_LS);
    let clockSet = JSON.parse(localStorage.getItem(CLOCKSET_LS));
    let location = localStorage.getItem(COORDS);
    if (name === null) {
        name = "create!"
    }
    if (clockSet === true) {
        clockSet = "12H"
    } else {
        clockSet = "24H"
    }
    if (location === null) {
        location = "off"
    } else {
        location = "on"
    }

    return {
        name,
        clockSet,
        location
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

function init() {
    initBtns();
}

init();