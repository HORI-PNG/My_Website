/**
 * 画面表示やメニューの開閉を管理するクラス
 */
export class UIManager {
    constructor() {
        // HTMLの要素を取得して自分の持ち物（プロパティ）にする
        this.sideMenu = document.getElementById('side-menu');
        this.menuToggle = document.getElementById('menu-toggle');
        this.views = document.querySelectorAll('.view');
        this.titleElement = document.getElementById('view-title');
        
        // 画面ごとのタイトル定義
        this.titles = {
            'counter': 'Counter App',
            'todo': 'ToDo List App',
            'top': '2026年!残り一年を謳歌しよう!'
        };
    }

    /**
     * 初期化処理：イベントリスナーの登録など
     */
    init() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.sideMenu.classList.toggle('active');
            });
        }

        // HTMLの onclick="switchView(...)" からこのクラスのメソッドを呼べるようにする
        // アロー関数を使うことで、thisがクラスインスタンスを指すように保つ
        window.switchView = (viewName) => this.switchView(viewName);
    }

    /**
     * 画面を切り替えるメソッド
     */
    switchView(viewName) {
        // すべての画面を一度非表示にする
        this.views.forEach(view => view.classList.remove('active'));
        
        // 指定されたIDの画面だけを表示する
        const targetView = document.getElementById(viewName + '-view');
        if (targetView) {
            targetView.classList.add('active');
        }

        // タイトルを書き換える
        if (this.titles[viewName] && this.titleElement) {
            this.titleElement.innerText = this.titles[viewName];
        }

        // スマホなどでメニューが開いていたら閉じる
        if (this.sideMenu) {
            this.sideMenu.classList.remove('active');
        }
    }
}