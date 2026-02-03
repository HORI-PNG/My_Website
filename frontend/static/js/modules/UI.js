export class UIManager {
    constructor() {
        this.sideMenu = document.getElementById('side-menu');
        this.menuToggle = document.getElementById('menu-toggle');
        this.views = document.querySelectorAll('.view');
        this.titleElement = document.getElementById('view-title');
        
        // 画面タイトルの定義
        this.titles = {
            'counter': 'Counter App',
            'todo': 'ToDo List App',
            'top': '2026年!残り一年を謳歌しよう!'
        };
    }

    init() {
        // メニューボタンのイベント登録
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.sideMenu.classList.toggle('active');
            });
        }

        // HTMLのonclick="switchView(...)"から呼べるようにする
        window.switchView = (viewName) => this.switchView(viewName);
    }

    switchView(viewName) {
        // 全てのviewからactiveを外す
        this.views.forEach(view => view.classList.remove('active'));
        
        // 指定されたviewを表示
        const targetView = document.getElementById(viewName + '-view');
        if (targetView) {
            targetView.classList.add('active');
        }

        // タイトルの更新
        if (this.titles[viewName] && this.titleElement) {
            this.titleElement.innerText = this.titles[viewName];
        }

        // メニューを閉じる
        if (this.sideMenu) {
            this.sideMenu.classList.remove('active');
        }
    }
}