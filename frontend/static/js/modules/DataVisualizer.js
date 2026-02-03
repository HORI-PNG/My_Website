export class DataVisualizer {
    constructor() {
        self.charts = {}; // チャートインスタンスを保持
    }

    /**
     * データを元にグラフを描画または更新する
     * @param {string} canvasId 
     * @param {Array} labels 
     * @param {Array} datasetsConfig 
     */
    renderChart(canvasId, labels, datasetsConfig) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return;

        // 既存のチャートがあれば破棄
        if (self.charts[canvasId]) {
            self.charts[canvasId].destroy();
        }

        // データセットの構築
        const datasets = datasetsConfig.map(config => ({
            label: config.label,
            data: config.data,
            backgroundColor: config.color,
            borderWidth: 1
        }));

        // 新規チャート作成
        self.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: { labels: labels, datasets: datasets },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    updateDashboard(data) {
        // テキスト情報の更新
        document.getElementById('display-file_name').innerText = data.file_name;
        
        // グラフの更新（ロジックをここに集約）
        this.renderChart('chart1', ['合計'], [
            { label: '新入生', data: [data.students_total], color: 'blue' },
            { label: '保護者', data: [data.parents_total], color: 'orange' }
        ]);
        // ...他のチャートも同様に
    }
}