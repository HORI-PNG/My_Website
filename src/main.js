let display = document.getElementById('display');
let logList = document.getElementById('log-list');
// データの読み込み
let count = Number(localStorage.getItem('savedCount')) || 0;
// ログは配列として保存するので、JSON.parseで復元する
let logs = JSON.parse(localStorage.getItem('savedLogs')) || [];

count++; //ページが開かれるたびにカウントアップ
addLog("ページを開いた");
saveAndSync();

// document.getElementById('up-button').addEventListener('click', () => {
//     count++;
//     addLog("増加（+1）");
//     saveAndSync();
// });
// document.getElementById('down-button').addEventListener('click', () => {
//     count--;
//     addLog("減少（-1）");
//     saveAndSync();
// });
// document.getElementById('reset-button').addEventListener('click', () => {
//     count = 0;
//     addLog("リセット（0に戻す）");
//     saveAndSync();
// });

function addLog(action) {
    const now = new Date();
    const zeroPad = (num) => String(num).padStart(2, '0')
    const timeStr = `${zeroPad(now.getHours())}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
    const logEntry = `[${timeStr}] ${action}: 現在の値 ${count}`;

    // 一番後ろに追加したいときはpushを使う
    // logs.push(logEntry);
    logs.unshift(logEntry); // 新しいログを先頭に追加
    if (logs.length > 10) {
        logs.pop(); // ログが5件を超えたら古いものを削除
    }
}

/*    
配列やオブジェクトなどの複数なデータを、一つの文字列として表現するためデータ形式
localStorageには文字列しか保存できないため、配列のままでは保存できない
JSON.stringify()を使って、配列やオブジェクトをJSON形式の文字列に変換して保存する
保存したデータを取り出すときは、JSON.parse()を使って元の配列やオブジェクトに戻す
*/
function saveAndSync() {
    updateDisplay();
    renderLogs();
    // setItemは、localStorageにデータを保存するメソッド
    localStorage.setItem('savedCount', count);
    // ログ配列をJSON文字列に変換して保存
    localStorage.setItem('savedLogs', JSON.stringify(logs));
}

function updateDisplay() {
    display.innerText = count;
    if (count === 0) {
        display.style.color = 'black';
    } else if (count > 0) {
        display.style.color = 'blue';
    } else if (count < 0) {
        display.style.color = 'red';
    }
};

function renderLogs() {
    logList.innerHTML = ''; // 既存のログをクリア
    logs.forEach(logText => {
        const li = document.createElement('li');
        li.innerText = logText;
        logList.appendChild(li); // ログをリストに追加
    });
}

updateDisplay();
renderLogs();

const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('active'); // activeクラスを付け外しする
});

// ToDo機能のロジック
const todoInput = document.getElementById('todo-input');
const todoAddBtn = document.getElementById('todo-add-btn');
const todoList = document.getElementById('todo-list');

// データの読み込み
let todos = JSON.parse(localStorage.getItem('savedTodos')) || [];

// 初期化
renderTodos();

todoAddBtn.addEventListener('click', () => {
    if (todoInput.value === "") return;
    const newTodo = {
        id: Date.now(), // 一位のIDとしてタイムスタンプを使用
        text: todoInput.value
    };

    todos.push(newTodo);
    todoInput.value = ""; // 入力欄をクリア
    saveTodos();
    renderTodos();
    addLog(`ToDo追加: ${newTodo.text}`);
    saveAndSync();
});

function renderTodos() {
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

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id); //指定したID以外の要素を残す
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('savedTodos', JSON.stringify(todos));
}

function switchView(viewName) {
    // すべてのビューから active クラスを外す
    document.getElementById('top-view').classList.remove('active');
    document.getElementById('counter-view').classList.remove('active');
    document.getElementById('todo-view').classList.remove('active');
    // 指定されたビューに active クラスをつける
    const activeView = document.getElementById(viewName + '-view');
    activeView.classList.add('active');
    // タイトルを変える
    const title = document.getElementById('view-title');
    if (viewName === 'counter') {
        title.innerText = 'Counter App';
    } else if (viewName === 'todo') {
        title.innerText = 'ToDo List App';
    } else if (viewName === 'top') {
        title.innerText = '2026年!残り一年を謳歌しよう!';
    }
    // サイドメニューが開いていたら閉じる
    sideMenu.classList.remove('active');
}

// main.js の一番最後に追記
updateDisplay();
renderLogs();

// 立ち上げ時にトップ画面を表示する
switchView('top');