const startButton = document.getElementById('start-button');
const continueButton = document.getElementById('continue-button');
const infoButton = document.getElementById('info-button');
const menuSound = new Audio();
menuSound.src = 'Audio/beep.wav';

/*
Start new game button sends user to level 1. If user has a save file already, prompts if they want to delete it to start a new game.
*/
function startGame() {
    menuSound.play().catch((error) => {console.error(error)});
    if(localStorage.getItem('Game Level') !== null) { 
        if(window.confirm('You have save data for this game, if you start a new game your previous save file will be deleted. Are you sure you want to delete your save file and start a new game?')) {
        localStorage.clear();
        location.href = './level-1-adrift.html';
        }
    } else {
    location.href = './level-1-adrift.html';
    }
}
startButton.addEventListener('click', startGame);

/*
Continue game button accesses saved player info if it is present in local storage, sets player object values to match saved info and sends user to correct level
*/
function continueGame() {
    menuSound.play().catch((error) => {console.error(error)});
    if(localStorage.getItem('Game Level') !== null) { 
        if(JSON.parse(localStorage.getItem('Game Level')) === 1) {
            location.href = './level-1-adrift.html';
        } else if(JSON.parse(localStorage.getItem('Game Level')) === 2) {
            location.href = './level-2-monsoon.html';
        } else if(JSON.parse(localStorage.getItem('Game Level')) === 3) {
            alert('The level you have reached is not yet available. Please start a new game or come back when the game is finished to continue.');
        }
    } else {
        alert('No save data found, please start a new game.');
    }
}
continueButton.addEventListener('click', continueGame);
