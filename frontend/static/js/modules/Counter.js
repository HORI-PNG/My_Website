export class CountdownTimer {
    constructor() {
        this.today = new Date();
    }

    /**
     * 指定された要素IDに、ターゲット日付までの日数を表示する
     * @param {string} elementId 表示先のHTML要素ID
     * @param {string} dateString 目標日付 (例: '2026-12-31')
     */
    addTimer(elementId, dateString) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const targetDate = new Date(dateString);
        const diffTime = targetDate - this.today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0) {
            el.innerText = `残り${diffDays}日！`;
        }
        
        // 色の変更
        el.style.color = diffDays >= 0 ? "blue" : "red";
    }

    init() {
        // 必要なタイマーをセットアップ
        this.addTimer('display-1', '2026-12-31');
        this.addTimer('display-2', '2027-03-31');
    }
}