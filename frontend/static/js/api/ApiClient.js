/**
 * サーバーとのAPI通信を管理するクラス
 */
export class ApiClient {
    constructor() {
        // 必要ならベースURLなどをここで設定
    }

    /**
     * ファイルをアップロードして分析結果を受け取る
     * @param {string} endpoint APIのエンドポイント (例: '/upload')
     * @param {File} file アップロードするファイルオブジェクト
     * @returns {Promise<Object>} 分析結果のJSON
     */
    async uploadFile(endpoint, file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error; // 呼び出し元でエラー処理させるために再スロー
        }
    }
}