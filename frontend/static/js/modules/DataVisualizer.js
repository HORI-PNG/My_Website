/**
 * Chart.jsを使ったグラフ描画とダッシュボード更新を管理するクラス
 */
export class DataVisualizer {
    constructor() {
        this.charts = {}; // 作成したチャートのインスタンスを保存
        
        // サイドバーの表示要素を取得
        this.elements = {
            fileName: document.getElementById('display-file_name'),
            studentsTotal: document.getElementById('display_students_total'),
            studentsTotalLivingAlone: document.getElementById('display_students_total_living_alone'),
            studentsTotalLivingHome: document.getElementById('display_students_total_living_home'),
            parentsTotal: document.getElementById('display_parents_total'),
            parentsTotalLivingAlone: document.getElementById('display_parents_total_living_alone'),
            parentsTotalLivingHome: document.getElementById('display_parents_total_living_home'),
            satisfaction: document.getElementById('display_satisfaction')
        };
    }

    /**
     * ダッシュボード全体の数値を更新する
     * @param {Object} data サーバーから受け取った結果データ
     */
    updateDashboard(data) {
        // 1. テキスト情報の更新
        if (this.elements.fileName) this.elements.fileName.textContent = data.file_name;
        if (this.elements.studentsTotal) this.elements.studentsTotal.textContent = data.students_total;
        if (this.elements.parentsTotal) this.elements.parentsTotal.textContent = data.parents_total;
        if (this.elements.studentsTotalLivingAlone) this.elements.studentsTotalLivingAlone.textContent = data.students_total_living_alone;
        if (this.elements.studentsTotalLivingHome) this.elements.studentsTotalLivingHome.textContent = data.students_total_living_home;
        if (this.elements.parentsTotalLivingAlone) this.elements.parentsTotalLivingAlone.textContent = data.parents_total_living_alone;
        if (this.elements.parentsTotalLivingHome) this.elements.parentsTotalLivingHome.textContent = data.parents_total_living_home;
        if (this.elements.satisfaction) {
            // 数値が有効な場合のみ小数点第2位まで表示
            const score = parseFloat(data.satisfaction);
            this.elements.satisfaction.textContent = !isNaN(score) ? score.toFixed(2) : data.satisfaction;
        }

        // 2. 各グラフの描画
        this.renderAllCharts(data);
    }

    /**
     * 各種グラフを描画する
     * @param {Object} data 分析結果データ
     */
    renderAllCharts(data) {
        // Chart 1: 参加者内訳
        this.drawChart('chart1', ['合計'], [
            { label: '新入生', data: [data.students_total], color: 'rgba(54, 162, 235, 0.5)' },
            { label: '保護者', data: [data.parents_total], color: 'rgba(255, 159, 64, 0.5)' }
        ]);

        // Chart 2: 満足度平均
        this.drawChart('chart2', ['平均'], [
            { label: '全体', data: [data.satisfaction], color: 'rgba(75, 192, 192, 0.5)' },
            { label: '新入生', data: [data.satisfaction_students], color: 'rgba(153, 102, 255, 0.5)' },
            { label: '保護者', data: [data.satisfaction_parents], color: 'rgba(255, 99, 132, 0.5)' }
        ]);

        // Chart 3: 時間帯別
        this.drawChart('chart3', data.time_labels, [
            { label: '全体', data: data.time_data_all, color: 'rgba(255, 206, 86, 0.5)' },
            { label: '新入生', data: data.time_data_students, color: 'rgba(54, 162, 235, 0.5)' },
            { label: '保護者', data: data.time_data_parents, color: 'rgba(255, 159, 64, 0.5)' }
        ]);

        // Chart 4: 良かった点（属性別）
        this.drawChart('chart4', data.good_point_labels, [
            { label: '全体', data: data.good_point_data_all, color: 'rgba(75, 192, 192, 0.5)' },
            { label: '新入生', data: data.good_point_data_students, color: 'rgba(153, 102, 255, 0.5)' },
            { label: '保護者', data: data.good_point_data_parents, color: 'rgba(255, 99, 132, 0.5)' }
        ]);

        // Chart 5: 良かった点（居住形態別）
        this.drawChart('chart5', data.good_point_labels, [
            { label: '一人暮らし予定', data: data.good_point_data_living_alone, color: 'rgba(255, 159, 64, 0.5)' },
            { label: '実家通学予定', data: data.good_point_data_living_home, color: 'rgba(54, 162, 235, 0.5)' }
        ]);
    }

    /**
     * 汎用描画メソッド
     */
    drawChart(canvasId, labels, datasets) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return;

        // 既存のグラフがあれば破棄（メモリリーク・重複防止）
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets.map(ds => ({
                    label: ds.label,
                    data: ds.data,
                    backgroundColor: ds.color,
                    borderColor: ds.color.replace('0.5', '1'), // 枠線は不透明に
                    borderWidth: 1
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}