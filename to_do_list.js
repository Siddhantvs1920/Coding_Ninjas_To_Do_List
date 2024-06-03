document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo-input');
    const addButton = document.querySelector('.add-button');
    const todoList = document.querySelector('.todo-list');
    const totalTasks = document.querySelector('.total-tasks');
    const cTasks=document.querySelector('.completed-tasks');

    // Load tasks from localStorage when the page loads
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateTotalTasks() {
        totalTasks.textContent = todoList.children.length;
        let completedTasks = 0;
    let incompleteTasks = 0;

    todoList.querySelectorAll('li').forEach((item) => {
        if (item.querySelector('.todo-checkbox').checked) {
            completedTasks++;
        } else {
            incompleteTasks++;
        }
    });
    cTasks.textContent=completedTasks;
    console.log(completedTasks+" "+incompleteTasks);

    }

    function createTodoItem(task, isChecked) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${isChecked ? 'checked' : ''}>
            <span class="todo-item">${task}</span>
            <button class="delete-button">❎</button>
        `;

        li.querySelector('.delete-button').addEventListener('click', () => {
            li.remove();
            updateTotalTasks();
            updateLocalStorage();
        });

        li.querySelector('.todo-checkbox').addEventListener('change', () => {
            if (li.querySelector('.todo-checkbox').checked) {
                li.querySelector('.todo-item').classList.add('checked');
            } else {
                li.querySelector('.todo-item').classList.remove('checked');
            }
            updateLocalStorage();
            updateTotalTasks();
        });

        return li;
    }

    function renderTasks() {
        savedTasks.forEach(({ task, isChecked }) => {
            const todoItem = createTodoItem(task, isChecked);
            todoList.appendChild(todoItem);
    
            // Check if the task is completed and update its visual state
            if (isChecked) {
                todoItem.querySelector('.todo-checkbox').checked = true;
                todoItem.querySelector('.todo-item').classList.add('checked');
            } else {
                todoItem.querySelector('.todo-checkbox').checked = false;
                todoItem.querySelector('.todo-item').classList.remove('checked');
            }
        });
    
        updateTotalTasks();
    }

    addButton.addEventListener('click', () => {
        const task = todoInput.value.trim();
        if (task) {
            const todoItem = createTodoItem(task, false);
            todoList.appendChild(todoItem);
            todoInput.value = '';
            updateTotalTasks();
            updateLocalStorage();
        }
        else
        {
            alert("Please Enter the Value");
        }
    });

    function updateLocalStorage() {
        const tasks = Array.from(todoList.children).map(li => ({
            task: li.querySelector('.todo-item').textContent,
            isChecked: li.querySelector('.todo-checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    renderTasks();
});
