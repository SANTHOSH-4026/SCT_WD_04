const addBtn = document.getElementById('addBtn');
const taskTitle = document.getElementById('taskTitle');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addBtn.addEventListener('click', addTask);

function addTask() {
    if (!taskTitle.value || !taskDate.value || !taskTime.value) {
        alert("Please fill in all fields!");
        return;
    }

    tasks.push({
        title: taskTitle.value,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    });

    saveTasks();
    renderTasks();
    taskTitle.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('task-info');
        infoDiv.innerHTML = `
            <strong>${task.title}</strong>
            <span class="task-date">📅 ${task.date} ⏰ ${task.time}</span>
        `;

        const settingsDiv = document.createElement('div');
        settingsDiv.classList.add('settings');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = "✔";
        completeBtn.classList.add('complete');
        completeBtn.addEventListener('click', () => toggleComplete(index));

        const editBtn = document.createElement('button');
        editBtn.textContent = "✏";
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', () => editTask(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "🗑";
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => deleteTask(index));

        settingsDiv.appendChild(completeBtn);
        settingsDiv.appendChild(editBtn);
        settingsDiv.appendChild(deleteBtn);

        li.appendChild(infoDiv);
        li.appendChild(settingsDiv);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newTitle = prompt("Edit task title:", tasks[index].title);
    const newDate = prompt("Edit date (YYYY-MM-DD):", tasks[index].date);
    const newTime = prompt("Edit time (HH:MM):", tasks[index].time);
    if (newTitle && newDate && newTime) {
        tasks[index].title = newTitle;
        tasks[index].date = newDate;
        tasks[index].time = newTime;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
