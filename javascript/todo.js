const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = []

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span")
    const value = span.innerText;
    span.innerHTML = `<del>${value}</del>`
    setTimeout(() => {
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function(toDo){
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
            id: newId
        };
        toDos.push(toDoObj);
        saveToDos();
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const paredToDos = JSON.parse(loadedToDos);
        paredToDos.forEach(function(toDo){
            paintTodo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();