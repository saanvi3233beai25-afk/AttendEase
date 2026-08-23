/* ================= TASK SYSTEM ================= */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    let list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.style.background = task.color;

        li.innerHTML = `
            <span onclick="editTask(${index})">${task.name}</span>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
    });
}

function addTask() {
    let name = prompt("Enter task:");
    if (!name) return;

    tasks.push({
        name: name,
        color: "#6f8cff"
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    let newTask = prompt("Edit task:", tasks[index].name);
    if (!newTask) return;

    tasks[index].name = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

/* ================= TIMER ================= */
let timer;
let timeLeft = 1500;
let isBreak = false;

let sessions = parseInt(localStorage.getItem("sessions")) || 0;

function startTimer() {
    clearInterval(timer);

    if (!isBreak) {
        timeLeft = 25 * 60;
    } else {
        timeLeft = 5 * 60;
    }

    runTimer();
}

function runTimer() {
    timer = setInterval(() => {

        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;

        let timeEl = document.getElementById("time");
        if (timeEl) {
            timeEl.innerText =
                `${m}:${s < 10 ? "0" : ""}${s}`;
        }

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);

            if (!isBreak) {
                sessions++;
                localStorage.setItem("sessions", sessions);

                alert("Break Time! 5 minutes ⏱");
                isBreak = true;
            } else {
                alert("Back to Study! 📚");
                isBreak = false;
            }

            updateProgress();
        }

    }, 1000);
}

/* ================= PROGRESS ================= */
function updateProgress() {
    let percentEl = document.getElementById("percent");

    if (percentEl) {
        percentEl.innerText =
            "Sessions Completed: " + sessions;
    }
}

/* ================= SCHEDULE ================= */
function editSchedule(cell) {
    let text = prompt("Enter subject/task:", cell.innerText);
    if (!text) return;

    cell.innerText = text;
}

/* ================= LOAD ================= */
window.onload = function () {
    displayTasks();
    updateProgress();
};