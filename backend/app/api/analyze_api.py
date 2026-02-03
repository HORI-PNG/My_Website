from flask import Blueprint, request, jsonify
from app.services.data_service import SurveyAnalyzer

api_bp = Blueprint('api', __name__)

@api_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'ファイルがありません'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'ファイルが選択されていません'}), 400

    try:
        # クラスをインスタンス化して分析を実行
        analyzer = SurveyAnalyzer(file, file.filename)
        result_data = analyzer.analyze()
        
        return jsonify({
            'status': 'success',
            'file_name': file.filename,
            **result_data # 辞書を展開して結合
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500