/**
 * Chart.jsを使ったグラフ描画とダッシュボード更新を管理するクラス
 */
export class DataVisualizer {
    constructor() {
        this.charts = {}; // 作成したチャートのインスタンスを保存しておく
        
        // 画面の表示要素を取得
        this.fileNameElement = document.getElementById('display-file_name');
        this.satisfactionElement = document.getElementById('display-satisfaction');
    }

    /**
     * ダッシュボード全体の数値を更新する
     * @param {Object} data サーバーから受け取ったデータ
     */
    updateDashboard(data) {
        // ファイル名を表示
        if (this.fileNameElement) {
            this.fileNameElement.innerText = data.file_name;
        }

        // 満足度を表示（もしデータにあれば）
        if (this.satisfactionElement && data.satisfaction !== undefined) {
            this.satisfactionElement.innerText = data.satisfaction.toFixed(1); // 小数第1位まで
        }

        // グラフを描画
        this.renderCharts(data);
    }

    /**
     * データを元にグラフを描画する（ここを自由にカスタマイズしてください）
     */
    renderCharts(data) {
        // 例: 参加者内訳のグラフ (students_total, parents_total があると仮定)
        if (data.students_total !== undefined && data.parents_total !== undefined) {
            this.drawBarChart(
                'chart1', // HTMLのcanvas ID
                ['新入生', '保護者'],
                [data.students_total, data.parents_total],
                '参加者数の内訳'
            );
        }
    }

    /**
     * 棒グラフを描画する汎用メソッド
     */
    drawBarChart(canvasId, labels, dataPoints, labelName) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return;

        // 既に同じIDのグラフがあれば破棄する（重複描画防止）
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        // Chart.js で描画
        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: labelName,
                    data: dataPoints,
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}