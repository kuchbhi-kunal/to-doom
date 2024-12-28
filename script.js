const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const gunShotAnimation = document.getElementById("gunShotAnimation");

function addTask(taskText, completed) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  span.classList.add("task-text");

  // Only create checkbox if task is not completed
  if (!completed) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    li.appendChild(checkbox);

    checkbox.addEventListener("change", function () {
      handleTaskCompletion(li, span, checkbox);
    });
  } else {
    // For completed tasks, add bullet hole and styling immediately
    const bulletHole = document.createElement("span");
    bulletHole.innerHTML =
      '<img src="assets/bullethole.png" class="bullethole" alt="Bullet Hole">';
    li.appendChild(bulletHole);
    span.classList.add("completed");
    span.style.color = "#ff5733";
  }

  const cross = document.createElement("span");
  cross.innerHTML = "&times;";
  cross.classList.add("cross");

  li.appendChild(span);
  li.appendChild(cross);
  taskList.appendChild(li);

  const hr = document.createElement("hr");
  taskList.appendChild(hr);

  cross.addEventListener("click", function () {
    li.remove();
    hr.remove();
    updateLocalStorage();
  });
}

function handleTaskCompletion(li, span, checkbox) {
  // Mark as completed immediately in the DOM
  span.classList.toggle("completed", checkbox.checked);

  if (checkbox.checked) {
    // Create bullet hole element
    const bulletHole = document.createElement("span");
    bulletHole.innerHTML =
      '<img src="assets/bullethole.png" class="bullethole" alt="Bullet Hole">';

    // Set a flag on the li element to track completion state
    li.dataset.completed = "true";

    // Trigger animations
    setTimeout(() => {
      li.removeChild(checkbox);
      li.insertBefore(bulletHole, span);
      // Update localStorage after bullet hole is added
      updateLocalStorage();
    }, 2000);

    triggerGunShotAnimation();

    setTimeout(() => {
      span.style.color = "#ff5733";
    }, 4500);
  } else {
    li.dataset.completed = "false";
    const existingBulletHole = li.querySelector(".bullethole");
    if (existingBulletHole) {
      li.removeChild(existingBulletHole);
    }
    li.insertBefore(checkbox, span);
    span.style.color = "#000";
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(function (taskItem) {
    const taskText = taskItem.querySelector(".task-text").textContent;
    // Use the data attribute to determine completion status
    const isCompleted =
      taskItem.dataset.completed === "true" ||
      taskItem.querySelector(".bullethole") !== null;
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach(function (task) {
      addTask(task.text, task.completed);
    });
  }
}

loadTasks();

addTaskBtn.addEventListener("click", function () {
  let taskText = taskInput.value.trim().substring(0, 15);
  if (taskText !== "") {
    addTask(taskText, false);
    updateLocalStorage();
    taskInput.value = "";
  }
});

taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    let taskText = taskInput.value.trim().substring(0, 15);
    if (taskText !== "") {
      addTask(taskText, false);
      updateLocalStorage();
      taskInput.value = "";
    }
  }
});

function triggerGunShotAnimation() {
  gunShotAnimation.style.display = "block";
  setTimeout(() => {
    gunShotAnimation.style.display = "none";
  }, 2500);
}
