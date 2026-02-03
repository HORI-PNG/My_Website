import os
from flask import Flask, render_template

def create_app():
    # 1. パスの確実な解決（昔のコードのロジックを完全復元）
    # backend/app/ から見た相対パスで frontend フォルダを指し示す
    base_dir = os.path.abspath(os.path.dirname(__file__))
    frontend_dir = os.path.join(base_dir, '../../frontend')
    
    app = Flask(__name__,
                template_folder=os.path.join(frontend_dir, 'templates'),
                static_folder=os.path.join(frontend_dir, 'static'))

    # 2. Blueprintの登録（関数名を api_bp に統一）
    from app.api.analyze_api import api_bp
    # JS側の '/analyze/upload' と合わせるため prefix を指定
    app.register_blueprint(api_bp, url_prefix='/analyze')

    # 3. ルート定義（昔のコードから端折らずに復元）
    # これがないと http://127.0.0.1:5000/ にアクセスしても表示されません
    @app.route('/')
    def home():
        return render_template('home.html')

    @app.route('/analyze')
    def analyze():
        return render_template('analyze.html')

    return app