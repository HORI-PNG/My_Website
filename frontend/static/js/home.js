// モジュール（クラス）をインポート
import { UIManager } from './modules/UI.js';
import { CountdownTimer } from './modules/Counter.js';
import { TodoApp } from './modules/TodoApp.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. UIの初期化
    const ui = new UIManager();
    ui.init();
    
    // 初期画面を表示
    ui.switchView('top');

    // 2. カウンターの初期化
    const counter = new CountdownTimer();
    counter.init();

    // 3. ToDoアプリの初期化
    const todo = new TodoApp();
    todo.init();
});