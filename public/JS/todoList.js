const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function playAlertSound() {
    let audio = new Audio("AUDIO/alert.mp3");
    audio.play();
}
function addTask() {
    if (inputBox.value.trim() === "") {
        playAlertSound();
        alert("You have to write something!");
    } else {
        let task = {
            text: inputBox.value,
            checked: false
        };

        appendTask(task);
    }

    inputBox.value = "";
    saveData();
}

function appendTask(task) {
    let li = document.createElement("li");
    li.innerHTML = task.text;
    
    if (task.checked) {
        li.classList.add("checked");
    }

    listContainer.appendChild(li);
    
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}

function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    let tasks = [];
    let listItems = document.querySelectorAll("#list-container li");

    listItems.forEach(function (li) {
        let task = {
            text: li.textContent.slice(0,-1),
            checked: li.classList.contains("checked")
        };
        tasks.push(task);
    });

    localStorage.setItem("data", JSON.stringify(tasks));
}

function showData() {
    let storedData = localStorage.getItem("data");

    if (storedData) {
        let tasks = JSON.parse(storedData);

        tasks.forEach(function (task) {
            appendTask(task);
        });
    }
}

showData();
