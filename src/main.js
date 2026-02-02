import { initUI, switchView } from './modules/ui.js';
import { initCounter } from './modules/counter.js';
import { initTodo } from './modules/todo.js';

// 各機能の初期化
initUI();
initCounter();
initTodo();

// 初期画面の表示
switchView('top');