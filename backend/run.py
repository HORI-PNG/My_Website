from app import create_app

app = create_app()

if __name__ == '__main__':
    # デバッグモードで起動 (ポート5000)
    app.run(debug=True, port=5000)