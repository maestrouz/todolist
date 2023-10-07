const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

renderTodos();

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
}

function removeTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

function editTodo(index) {
    const li = todoList.childNodes[index];
    
    const input = document.createElement('input');
    input.value = todos[index];

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        todos[index] = input.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    });

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        renderTodos();
    });

    const container = document.createElement('div');
    container.appendChild(input);
    container.appendChild(saveButton);
    container.appendChild(cancelButton);

    li.innerHTML = '';
    li.appendChild(container);
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo}</span>
            <button id="edit" onclick="editTodo(${index})">EDIT</button>
            <button id="del" onclick="removeTodo(${index})">DELETE</button>
        `;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
}

todoInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});