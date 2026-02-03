from flask import Flask, render_template
import os

def create_app():
    # テンプレートと静的ファイルの場所を frontend フォルダに指定
    # backend/app/ から見た相対パスで指定
    base_dir = os.path.abspath(os.path.dirname(__file__))
    frontend_dir = os.path.join(base_dir, '../../frontend')
    
    app = Flask(__name__,
                template_folder=os.path.join(frontend_dir, 'templates'),
                static_folder=os.path.join(frontend_dir, 'static'))

    # APIブループリントの登録
    from app.api.analyze_api import api_bp
    app.register_blueprint(api_bp)

    # ルート定義
    @app.route('/')
    def home():
        return render_template('home.html')

    @app.route('/analyze')
    def analyze():
        return render_template('analyze.html')

    return app