const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const gunShotAnimation = document.getElementById('gunShotAnimation');

function addTask(taskText, completed) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    const span = document.createElement('span');
    span.textContent = taskText;
    span.classList.add('task-text');
    // if (completed) {
    //     span.classList.add('completed'); // Add completed class if task is completed
    //     const bulletHole = document.createElement('span');
    //     bulletHole.innerHTML = '<img src="assets/bullethole.png" class="bullethole" alt="Bullet Hole">';
    //     li.appendChild(bulletHole);
    // }
    const cross = document.createElement('span');
    cross.innerHTML = '&times;';
    cross.classList.add('cross');

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(cross);
    taskList.appendChild(li);

    const hr = document.createElement('hr');
    taskList.appendChild(hr);

    cross.addEventListener('click', function() {
        li.remove();
        hr.remove();
        updateLocalStorage();
    });

    checkbox.addEventListener('change', function() {
        span.classList.toggle('completed', checkbox.checked);
        if (checkbox.checked) {
           setTimeout(() => {
             li.removeChild(checkbox);
              }, 2000);
            const bulletHole = document.createElement('span');
            bulletHole.innerHTML = '<img src="assets/bullethole.png" class="bullethole" alt="Bullet Hole">';
            setTimeout(() => {
                li.insertBefore(bulletHole, span);
            }, 2000);
            triggerGunShotAnimation();
            setTimeout(() => {
                span.style.color = '#ff5733';
            }, 4500);
        } else {
            li.removeChild(li.querySelector('.bullethole'));
            li.insertBefore(checkbox, span);
            span.style.color = '#000';
        }
        updateLocalStorage();
    });

    if (completed) {
        span.classList.add('completed');
    }
}


function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(function(taskItem) {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            addTask(task.text, task.completed);
        });
    }
}

loadTasks();

addTaskBtn.addEventListener('click', function() {
    let taskText = taskInput.value.trim().substring(0, 15);
    if (taskText !== '') {
        addTask(taskText, false);
        updateLocalStorage();
        taskInput.value = '';
    }
});

taskInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        let taskText = taskInput.value.trim().substring(0, 15);
        if (taskText !== '') {
            addTask(taskText, false);
            updateLocalStorage();
            taskInput.value = '';
        }
    }
});

function triggerGunShotAnimation() {
    gunShotAnimation.style.display = 'block';
    setTimeout(() => {
        gunShotAnimation.style.display = 'none';
    }, 2500);
}
