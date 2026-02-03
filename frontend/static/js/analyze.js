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