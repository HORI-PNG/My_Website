import { ApiClient } from './api/ApiClient.js';
import { DataVisualizer } from './modules/DataVisualizer.js';

document.addEventListener('DOMContentLoaded', () => {
    const api = new ApiClient();
    const visualizer = new DataVisualizer();
    
    const uploadBtn = document.querySelector('.btn-primary'); // index.htmlの「出力ボタン」
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

                // エンドポイントを的確に指定
                const result = await api.uploadFile('/api/analyze/upload', file);
                
                if (result.status === 'success') {
                    // サイドバーの表示更新（index.htmlのIDに基づき）
                    document.getElementById('display-file_name').textContent = result.filename;
                    document.getElementById('display_students_total').textContent = result.students_total;
                    document.getElementById('display_parents_total').textContent = result.parents_total;
                    document.getElementById('display_satisfaction').textContent = result.satisfaction.toFixed(2);

                    // もともとのきれいなグラフ描画ロジックを呼び出す
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