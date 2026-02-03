export class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('savedTodos')) || [];
        this.input = document.getElementById('todo-input');
        this.addBtn = document.getElementById('todo-add-btn');
        this.list = document.getElementById('todo-list');
    }

    init() {
        if (this.addBtn) {
            this.addBtn.addEventListener('click', () => this.addTodo());
        }

        // HTMLのonclick="deleteTodo(...)"からクラスのメソッドを呼べるように登録
        window.deleteTodo = (id) => this.deleteTodo(id);

        this.render();
    }

    addTodo() {
        if (!this.input || this.input.value === "") return;

        const newTodo = { id: Date.now(), text: this.input.value };
        this.todos.push(newTodo);
        this.input.value = "";
        
        this.save();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.render();
    }

    save() {
        localStorage.setItem('savedTodos', JSON.stringify(this.todos));
    }

    render() {
        if (!this.list) return;
        
        this.list.innerHTML = "";
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <input type="checkbox" id="check-${todo.id}">
                    <span>${todo.text}</span>
                </div>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">削除</button>
            `;
            this.list.appendChild(li);
        });
    }
}