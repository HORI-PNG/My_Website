import { updateDisplay } from './counter.js'; // カウンター値が必要な場合

let todos = JSON.parse(localStorage.getItem('savedTodos')) || [];

export function initTodo() {
    const todoAddBtn = document.getElementById('todo-add-btn');
    const todoInput = document.getElementById('todo-input');

    todoAddBtn.addEventListener('click', () => {
        if (todoInput.value === "") return;
        const newTodo = { id: Date.now(), text: todoInput.value };
        todos.push(newTodo);
        todoInput.value = "";
        
        saveTodos();
        renderTodos();
        
        // カウンターの現在の値を取得してログを出す
        const currentCount = Number(localStorage.getItem('savedCount'));
    });

    // HTMLのonclickから呼べるようにする
    window.deleteTodo = deleteTodo;
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <input type="checkbox" id="check-${todo.id}">
                <span>${todo.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">削除</button>
        `;
        todoList.appendChild(li);
    });
}

export function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('savedTodos', JSON.stringify(todos));
}