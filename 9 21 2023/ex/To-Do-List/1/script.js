document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";

            // Save tasks to local storage
            saveTasksToLocalStorage();
        }
    });

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    function addTask(taskText, completed = false) {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${completed ? "checked" : ""}>
            <span class="${completed ? "completed" : ""}">${taskText}</span>
            <button class="delete">Delete</button>
        `;

        const checkbox = li.querySelector("input[type='checkbox']");
        const deleteButton = li.querySelector(".delete");

        checkbox.addEventListener("change", function () {
            const taskSpan = li.querySelector("span");
            taskSpan.classList.toggle("completed", checkbox.checked);
            // Save tasks to local storage when a task is marked as completed
            saveTasksToLocalStorage();
        });

        deleteButton.addEventListener("click", function () {
            li.remove();
            // Save tasks to local storage when a task is deleted
            saveTasksToLocalStorage();
        });

        taskList.appendChild(li);
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskElements = document.querySelectorAll("#taskList li");
        taskElements.forEach((taskElement) => {
            const checkbox = taskElement.querySelector("input[type='checkbox']");
            const taskText = taskElement.querySelector("span").textContent;
            tasks.push({
                text: taskText,
                completed: checkbox.checked,
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            addTask(task.text, task.completed);
        });
    }
});
