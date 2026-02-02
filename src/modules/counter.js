const today = new Date();

// 他のファイルで使えるようにexportをつけてる
export function updateDisplay(elementId, targetDate) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 0) {
        el.innerText = `残り${diffDays}日！`
    }
    el.style.color = diffDays >= 0 ? "blue" : "red";
}

export function initCounter() {
    updateDisplay(`display-1`, new Date('2026-12-31')); // 2026年
    updateDisplay(`display-2`, new Date('2027-03-31')); // 大学最終日
}