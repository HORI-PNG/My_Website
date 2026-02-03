import { ApiClient } from './api/ApiClient.js';
import { DataVisualizer } from './modules/DataVisualizer.js';

document.addEventListener('DOMContentLoaded', () => {
    const api = new ApiClient();
    const visualizer = new DataVisualizer();
    
    const uploadBtn = document.querySelector('.btn-primary');
    const fileInput = document.getElementById('select_file');

    if (uploadBtn && fileInput) {
        uploadBtn.onclick = async () => {
            const file = fileInput.files[0];
            if (!file) {
                alert('ファイルを選択してください');
                return;
            }

            try {
                uploadBtn.disabled = true;
                uploadBtn.innerText = '分析中...';

                const result = await api.uploadFile('/analyze/upload', file);
                
                if (result.status === 'success') {
                    // サイドバーの全項目を更新
                    document.getElementById('display-file_name').textContent = result.file_name;
                    document.getElementById('display_students_total').textContent = result.students_total;
                    document.getElementById('display_parents_total').textContent = result.parents_total;
                    document.getElementById('display_satisfaction').textContent = result.satisfaction.toFixed(2);

                    // 1mmも削っていない全集計データをグラフ描画モジュールに渡す
                    // visualizer.updateDashboard(result);

                    renderChart('chart1', ['合計'], [
                        {
                            label: '新入生',
                            data: [data.students_total],
                            color: 'rgba(54, 162, 235, 0.5)' // 明るい青（透明度50%）
                        },
                        {
                            label: '保護者',
                            data: [data.parents_total],
                            color: 'rgba(255, 159, 64, 0.5)' // 明るいオレンジ（透明度50%）
                        }
                    ]);

                    renderChart('chart2', ['平均'], [
                        {
                            label: '全体',
                            data: [data.satisfaction],
                            color: 'rgba(75, 192, 192, 0.5)' // 明るいエメラルド
                        },
                        {
                            label: '新入生',
                            data: [data.satisfaction_students],
                            color: 'rgba(153, 102, 255, 0.5)' // 明るいパープル
                        },
                        {
                            label: '保護者',
                            data: [data.satisfaction_parents],
                            color: 'rgba(255, 99, 132, 0.5)' // 明るいピンク
                        }
                    ]);
                    renderChart('chart3', data.time_labels, [
                        {
                            label: '全体', 
                            data: data.time_data_all,
                            color: 'rgba(255, 206, 86, 0.5)' // 明るいイエロー
                        },
                        {
                            label: '新入生', 
                            data: data.time_data_students,
                            color: 'rgba(54, 162, 235, 0.5)' // 明るいブルー
                        },
                        {
                            label: '保護者', 
                            data: data.time_data_parents,
                            color: 'rgba(255, 159, 64, 0.5)' // 明るいオレンジ
                        }
                    ]);
                    renderChart('chart4', data.good_point_labels, [
                        {
                            label: '全体', 
                            data: data.good_point_data_all,
                            color: 'rgba(75, 192, 192, 0.5)' // 明るいエメラルド
                        },
                        {
                            label: '新入生', 
                            data: data.good_point_data_students,
                            color: 'rgba(153, 102, 255, 0.5)' // 明るいパープル
                        },
                        {
                            label: '保護者',
                            data: data.good_point_data_parents,
                            color: 'rgba(255, 99, 132, 0.5)' // 明るいピンク
                        }
                    ]);
                    renderChart('chart5', data.good_point_labels, [
                        {
                            label: '一人暮らし予定',
                            data: data.good_point_data_living_alone,
                            color: 'rgba(255, 159, 64, 0.5)' // 明るいオレンジ
                        },
                        {
                            label: '実家通学予定',
                            data: data.good_point_data_living_home,
                            color: 'rgba(54, 162, 235, 0.5)' // 明るいブルー
                        }
                    ]);
                    
                    
                    alert('分析が完了しました！');
                } else {
                    alert('エラー: ' + (result.error || '不明なエラー'));
                }
            } catch (error) {
                console.error(error);
                alert('通信エラーが発生しました');
            } finally {
                uploadBtn.disabled = false;
                uploadBtn.innerText = '出力ボタン';
            }
        };
    }
});