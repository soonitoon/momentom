const body = document.querySelector("body");
const changeBtn = document.querySelector(".js-changeBg");

function paintImage() {
    const image = new Image();
    image.src = `https://source.unsplash.com/1920x1080/?mountain`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function changeBg() {
    img = document.querySelector(".bgImage");
    body.removeChild(img);
    paintImage();
}

function initChangeBtn() {
    changeBtn.addEventListener("click", changeBg);
}

function init() {
    paintImage();
    initChangeBtn();
}

init();