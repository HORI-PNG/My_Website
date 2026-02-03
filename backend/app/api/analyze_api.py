from flask import Blueprint, request, jsonify
from app.services.data_service import SurveyAnalyzer

# 'api' という名前でブループリントを作成
api_bp = Blueprint('api', __name__)

@api_bp.route('/upload', methods=['POST'])
def upload_file():
    """ファイルを受け取り、分析結果をJSONで返す"""
    
    # 1. ファイルの存在チェック
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'error': 'ファイルが送信されていません'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'error', 'error': 'ファイルが選択されていません'}), 400

    try:
        # 2. サービス層（クラス）を使って分析実行
        analyzer = SurveyAnalyzer()
        result_data = analyzer.analyze(file, file.filename)
        
        # 3. 結果をFrontendに返す
        return jsonify({
            'status': 'success',
            **result_data # 辞書を展開して結合 (file_name, students_total等が含まれる)
        })

    except ValueError as e:
        # ユーザー起因のエラー（ファイル形式違いなど）
        return jsonify({'status': 'error', 'error': str(e)}), 400
    except Exception as e:
        # 予期せぬサーバーエラー
        print(f"Server Error: {e}") # ログに出力
        return jsonify({'status': 'error', 'error': 'サーバー内部でエラーが発生しました'}), 500