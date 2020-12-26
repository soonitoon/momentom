const resetBtn = document.querySelector(".js-reset");

function reset() {
    resetBtn.addEventListener("click", () => {
        localStorage.clear();
        location.href="./"
    })
}

function init() {
    reset();
}

init();