const weather = document.querySelector(".js-weather");
const moreWeather = {
    feels_like: document.querySelector(".feels_like"),
    humidity: document.querySelector(".humidity"),
    temp: document.querySelector(".temp"),
    temp_max: document.querySelector(".temp_max"),
    temp_min: document.querySelector(".temp_min")
};

const COORDS = 'coords';
const AIP_KEY = "3d328986457d6b23d5ff91e9ddccad53";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${AIP_KEY}&units=metric`)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const temp = json.main.temp;
            const place = json.name;
            const main = json.weather[0].main;
            const feelsLike = json.main.feels_like;
            const humidity = json.main.humidity;
            const temp_max = json.main.temp_max;
            const temp_min = json.main.temp_min;
            weather.innerHTML = `temp ${temp.toFixed(1)}°C, ${main}<br><br>${place}`
            moreWeather.feels_like.innerText = `feels like : ${feelsLike}°C`;
            moreWeather.humidity.innerText = `humidity : ${humidity}%`;
            moreWeather.temp.innerText = `temp : ${temp}°C`;
            moreWeather.temp_max.innerText = `temp max : ${temp_max}°C`;
            moreWeather.temp_min.innerText = `temp min : ${temp_min}°C`;
        });
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function hadleGeoSucces(position) {
    const latitude = (position.coords.latitude);
    const longitude = (position.coords.longitude);
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function hadleGeoError() {
    console.log("Cant access geo location");
    const btn = document.querySelector(".popUpMoreBtn")
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

function init() {
    loadCoords();
}

init();