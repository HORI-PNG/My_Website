import { addLog } from './logger.js';

let count = Number(localStorage.getItem('savedCount')) || 0;
const today = new Date();

export function updateDisplay(date) {
    const display = document.getElementById('display');
    if (!display) return;
    
    display.innerText = date - today;
    display.style.color = count === 0 ? 'black' : (count > 0 ? 'blue' : 'red');
}

function saveCount() {
    localStorage.setItem('savedCount', count);
}