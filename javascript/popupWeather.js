const popUpMoreBtn = document.querySelector(".popUpMoreBtn"),
    moreWeatherWindow = document.querySelector(".moreWeather"),
    popDownMoreBtn = document.querySelector(".popDownMoreBtn");

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

function initBtns() {
    popUpMoreBtn.addEventListener("click", popUpMore);
    popDownMoreBtn.addEventListener("click", popDownMore);
}

function init() {
    initBtns();
}

init();