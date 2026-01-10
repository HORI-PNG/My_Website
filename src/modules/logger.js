// データの復元
let logs = JSON.parse(localStorage.getItem('savedLogs')) || [];

export function addLog(action, currentCount) {
    const now = new Date();
    const zeroPad = (num) => String(num).padStart(2, '0');
    const timeStr = `${zeroPad(now.getHours())}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
    const logEntry = `[${timeStr}] ${action}: 現在の値 ${currentCount}`;

    logs.unshift(logEntry);
    if (logs.length > 10) logs.pop();
    
    saveLogs();
    renderLogs();
}

export function renderLogs() {
    const logList = document.getElementById('log-list');
    if (!logList) return;
    
    logList.innerHTML = '';
    logs.forEach(logText => {
        const li = document.createElement('li');
        li.innerText = logText;
        logList.appendChild(li);
    });
}

function saveLogs() {
    localStorage.setItem('savedLogs', JSON.stringify(logs));
}