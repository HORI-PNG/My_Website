from flask import Blueprint, jsonify, request
import pandas as pd
from ..services.data_service import DataService

# インポート名に合わせる
api_bp = Blueprint('analyze', __name__)

@api_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'ファイルが見つかりません'}), 400
    file = request.files['file']
    filename = file.filename
    if filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        if filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif filename.endswith(('.xls', '.xlsx')):
            # シート名を「フォームの回答 1」に固定
            df = pd.read_excel(file, sheet_name='フォームの回答 1')
        else:
            return jsonify({'error': 'ファイル形式が違います。'}), 400
        
        # DataService の完全移植ロジックを呼び出し
        results = DataService.analyze_survey_data(df)
        results['file_name'] = filename # キー名も合わせる
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500