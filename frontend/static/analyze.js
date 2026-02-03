import { ApiClient } from './api/ApiClient.js';
import { DataVisualizer } from './modules/DataVisualizer.js';

document.addEventListener('DOMContentLoaded', () => {
    const api = new ApiClient();
    const visualizer = new DataVisualizer();
    
    // アップロードボタンのイベント登録
    const uploadBtn = document.getElementById('upload-btn'); // HTMLのボタンIDに合わせてください
    const fileInput = document.getElementById('select_file');

    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', async () => {
            const file = fileInput.files[0];
            if (!file) {
                alert('ファイルを選択してください');
                return;
            }

            try {
                // ボタンを無効化（連打防止）
                uploadBtn.disabled = true;
                uploadBtn.innerText = '分析中...';

                // 1. APIを使ってファイルを送信
                const result = await api.uploadFile('/upload', file);
                
                if (result.status === 'success') {
                    // 2. 結果を使って画面を更新
                    visualizer.updateDashboard(result);
                    alert('分析が完了しました！');
                } else {
                    alert('エラー: ' + (result.error || '不明なエラー'));
                }

            } catch (error) {
                console.error(error);
                alert('通信エラーが発生しました');
            } finally {
                // ボタンを元に戻す
                uploadBtn.disabled = false;
                uploadBtn.innerText = 'アップロード';
            }
        });
    }
});