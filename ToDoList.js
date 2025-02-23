/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskTime = document.getElementById("taskTime");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const showAll = document.getElementById("showAll");
    const showActive = document.getElementById("showActive");
    const showCompleted = document.getElementById("showCompleted");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "active" && task.completed) return;
            if (filter === "completed" && !task.completed) return;

            const li = document.createElement("li");
            li.className = `flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md transition ${task.completed ? "completed" : ""}`;
            
            const timeSpent = task.completed ? ` (Done in ${((Date.now() - task.timestamp) / 60000).toFixed(1)} min)` : "";
            
            li.innerHTML = `
                <span class="cursor-pointer font-semibold text-gray-700" data-index="${index}">${task.text} - ${task.duration} min ${timeSpent}</span>
                <div class="flex gap-2">
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition edit-btn">Edit</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition delete-btn">Delete</button>
                </div>
            `;
            
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        const taskDuration = taskTime.value.trim();
        if (taskText !== "" && taskDuration !== "") {
            tasks.push({ text: taskText, duration: taskDuration, completed: false, timestamp: Date.now() });
            saveTasks();
            renderTasks();
            taskInput.value = "";
            taskTime.value = "";
        }
    });

    taskList.addEventListener("click", function(e) {
        const index = e.target.closest("li").querySelector("span").getAttribute("data-index");
        if (e.target.classList.contains("delete-btn")) {
            tasks.splice(index, 1);
        } else if (e.target.classList.contains("edit-btn")) {
            const newText = prompt("Edit task:", tasks[index].text);
            if (newText) tasks[index].text = newText;
        } else {
            tasks[index].completed = !tasks[index].completed;
            tasks[index].timestamp = Date.now();
        }
        saveTasks();
        renderTasks();
    });

    showAll.addEventListener("click", () => renderTasks("all"));
    showActive.addEventListener("click", () => renderTasks("active"));
    showCompleted.addEventListener("click", () => renderTasks("completed"));

    renderTasks();
});


document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // التحقق من التفضيلات المحفوظة في localStorage
    if (localStorage.getItem("theme") === "dark" || 
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDarkMode = body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
});



// تبديل الوضع الداكن وحفظه في localStorage
const toggleDarkMode = document.getElementById("toggle-dark-mode");
toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// تحميل حالة الوضع الداكن عند بدء التشغيل
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

