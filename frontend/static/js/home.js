// クラス（モジュール）を読み込む
// ※ファイルパスの ./modules/ が正しいか確認してください
import { UIManager } from './modules/UI.js';
import { CountdownTimer } from './modules/Counter.js';
import { ToDoApp } from './modules/ToDoApp.js';

// HTMLの読み込みが完了したら実行する
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. UIマネージャーを起動
    const ui = new UIManager();
    ui.init();
    
    // 最初に表示する画面を指定 ('top' というIDのviewを表示)
    ui.switchView('top');

    // 2. カウンター機能を起動
    const counter = new CountdownTimer();
    counter.init();

    // 3. ToDoアプリを起動
    const todo = new ToDoApp();
    todo.init();
});