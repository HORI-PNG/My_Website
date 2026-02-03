import { ApiClient } from './api/ApiClient.js';
import { DataVisualizer } from './modules/DataVisualizer.js';

document.addEventListener('DOMContentLoaded', () => {
    const api = new ApiClient();
    const visualizer = new DataVisualizer();
    
    // index.html の「出力ボタン」
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

                // APIエンドポイントを指定
                const result = await api.uploadFile('/analyze/upload', file);
                
                if (result.status === 'success') {
                    // サイドバーの統計情報を更新
                    document.getElementById('display-file_name').textContent = result.file_name;
                    document.getElementById('display_students_total').textContent = result.students_total;
                    document.getElementById('display_parents_total').textContent = result.parents_total;
                    document.getElementById('display_satisfaction').textContent = result.satisfaction.toFixed(2);

                    // もともとのきれいなグラフ描画ロジックへ流し込む
                    visualizer.updateDashboard(result);
                    
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