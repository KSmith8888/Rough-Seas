const startButton = document.getElementById('start-button');
const continueButton = document.getElementById('continue-button');
const infoButton = document.getElementById('info-button');
let savedInfo = {};

const menuSound = new Audio();
menuSound.src = 'Audio/beep.wav';

/*
Start new game button sends user to level 1. If user has a save file already, prompts if they want to delete it to start a new game.
*/
startButton.addEventListener('click', function() {
    if(localStorage.getItem('playerInfo') !== null) { 
        if(window.confirm('You have save data for this game, if you start a new game your previous save file will be deleted. Are you sure you want to delete your save file and start a new game?')) {
        localStorage.clear();
        location.href = './Level-1-Adrift.html';
        }
    } else {
    location.href = './Level-1-Adrift.html';
    }
});
