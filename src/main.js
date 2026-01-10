import { initUI, switchView } from './modules/ui.js';
import { initCounter } from './modules/counter.js';
import { initTodo } from './modules/todo.js';
import { renderLogs } from './modules/logger.js';

// 各機能の初期化
initUI();
initCounter();
initTodo();
renderLogs();

// 初期画面の表示
switchView('top');