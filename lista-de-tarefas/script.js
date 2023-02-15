const form = document.querySelector('form');
const input = document.querySelector('form input[type="text"]');
const todoList = document.querySelector('.todo-list');
const sortBySelect = document.getElementById('sort-by-select');

let todos = [];

form.addEventListener('submit', event => {
    event.preventDefault();

    const name = input.value.trim();
    const dueDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    if (!name) {
        return;
    }

    const todo = {
        id: Date.now(),
        name,
        completed: false,
        dueDate
    };

    todos.push(todo);

    input.value = '';

    displayTodos();
});

function displayTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        const nameSpan = document.createElement('span');
        const dueDateSpan = document.createElement('span');
        const completeButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        nameSpan.textContent = todo.name;
        dueDateSpan.textContent = todo.dueDate;

        if (todo.completed) {
            li.classList.add('completed');
            completeButton.textContent = 'Desfazer';
        } else {
            completeButton.textContent = 'Concluir';
        }

        deleteButton.textContent = 'Excluir';

        completeButton.addEventListener('click', () => {
            toggleCompleted(todo.id);
        });

        deleteButton.addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        li.appendChild(nameSpan);
        li.appendChild(dueDateSpan);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function toggleCompleted(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        } else {
            return todo;
        }
    });

    displayTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    displayTodos();
}

function sortTodos() {
    const sortBy = sortBySelect.value;

    if (sortBy === 'due-date') {
        todos = todos.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    } else if (sortBy === 'name') {
        todos = todos.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    displayTodos();
}

sortBySelect.addEventListener('change', sortTodos);