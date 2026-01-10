const sideMenu = document.getElementById('side-menu');

export function initUI() {
    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
    });

    // HTMLのonclickから呼べるようにグローバルに登録
    window.switchView = switchView;
}

export function switchView(viewName) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(viewName + '-view').classList.add('active');

    const title = document.getElementById('view-title');
    const titles = {
        'counter': 'Counter App',
        'todo': 'ToDo List App',
        'top': '2026年!残り一年を謳歌しよう!'
    };
    if (titles[viewName]) title.innerText = titles[viewName];

    sideMenu.classList.remove('active');
}