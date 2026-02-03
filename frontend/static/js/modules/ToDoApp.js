/**
 * ToDoリストの機能を管理するクラス
 */
export class ToDoApp {
    constructor() {
        // ローカルストレージからデータを読み込む、なければ空の配列
        this.todos = JSON.parse(localStorage.getItem('savedTodos')) || [];
        
        // 操作するHTML要素を取得
        this.input = document.getElementById('todo-input');
        this.addBtn = document.getElementById('todo-add-btn');
        this.list = document.getElementById('todo-list');
    }

    /**
     * 初期化処理
     */
    init() {
        if (this.addBtn) {
            // ボタンが押されたら addTodo を実行
            this.addBtn.addEventListener('click', () => this.addTodo());
        }

        // HTMLの onclick="deleteTodo(...)" から呼べるようにグローバルに登録
        window.deleteTodo = (id) => this.deleteTodo(id);

        // 最初の描画を行う
        this.render();
    }

    /**
     * 新しいToDoを追加する
     */
    addTodo() {
        if (!this.input || this.input.value === "") return;

        const newTodo = {
            id: Date.now(), // 現在時刻をIDにする
            text: this.input.value
        };

        this.todos.push(newTodo);
        this.input.value = ""; // 入力欄を空にする
        
        this.save();
        this.render();
    }

    /**
     * 指定されたIDのToDoを削除する
     */
    deleteTodo(id) {
        // 指定されたID以外のものだけを残す（＝削除）
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.render();
    }

    /**
     * データをブラウザに保存する
     */
    save() {
        localStorage.setItem('savedTodos', JSON.stringify(this.todos));
    }

    /**
     * 画面を再描画する
     */
    render() {
        if (!this.list) return;
        
        this.list.innerHTML = ""; // 一度リストをクリア
        
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