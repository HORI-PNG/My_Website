/**
 * 日付のカウントダウンを行うクラス
 */
export class CountdownTimer {
    constructor() {
        this.today = new Date();
    }

    /**
     * 特定の要素にカウントダウンを表示する
     * @param {string} elementId HTMLの要素ID
     * @param {string} dateString 目標日 (YYYY-MM-DD)
     */
    addTimer(elementId, dateString) {
        const el = document.getElementById(elementId);
        if (!el) return; // 要素がなければ何もしない

        const targetDate = new Date(dateString);
        // ミリ秒単位の差分を計算
        const diffTime = targetDate - this.today;
        // 日数に変換 (切り上げ)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0) {
            el.innerText = `残り${diffDays}日！`;
            el.style.color = "blue";
        } else {
            el.innerText = `期限切れ`; // 必要に応じて変更
            el.style.color = "red";
        }
    }

    /**
     * アプリ起動時に実行する処理
     */
    init() {
        // ここで必要なタイマーを登録
        this.addTimer('display-1', '2026-12-31');
        this.addTimer('display-2', '2027-03-31');
    }
}