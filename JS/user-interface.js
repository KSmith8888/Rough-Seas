import { Shell, Bullet, Rocket } from './projectiles.js';

class UserInterface {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.menuSound = new Audio;
        this.menuSound.src = 'Audio/beep.wav';
        this.menuIcon = document.getElementById('menu-icon');
        this.gameMenu = document.getElementById('game-menu');
        this.closeMenuBtn = document.getElementById('close-menu-button');
        this.exitGameBtn = document.getElementById('exit-game-button');
        this.missionCompleteMenu = document.getElementById('mission-complete-menu');
        this.missionCompleteForm = document.getElementById('mission-complete-form');
    }
}

class EventListeners {
    constructor(player, weapon) {
        this.player = player;
        this.weapon = weapon;
        this.keyEvent = document.addEventListener('keydown', (event) => {
            if(event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                this.player.MoveShip(event.code);
            } 
            if(event.code === 'KeyW') {
                if(this.player.weaponChoice === 'Cannon' && this.player.firedProjectiles.length < 7) {
                    const shell = new Shell(this.player, this.weapon);
                    this.player.firedProjectiles.push(shell);
                } else if(this.player.weaponChoice === 'Rocket' && this.player.firedProjectiles.length < 4) {
                    const rocket = new Rocket(this.player, this.weapon);
                    this.player.firedProjectiles.push(rocket);
                } else if(this.player.weaponChoice === 'Machine' && this.player.firedProjectiles.length < 10) {
                    const bullet = new Bullet(this.player, this.weapon);
                    this.player.firedProjectiles.push(bullet);
                }
            } 
            if(event.code === 'KeyA') {
                if(weapon.weaponAngle > 0) {
                    this.weapon.weaponAngle -= 1;
                    this.weapon.cannonImage.src = this.weapon.cannonImageArray[weapon.weaponAngle];
                    this.weapon.machineImage.src = this.weapon.machineImageArray[weapon.weaponAngle];
                    this.weapon.launcherImage.src = this.weapon.launcherImageArray[weapon.weaponAngle];
                }
            } 
            if(event.code === 'KeyD') {
                if(weapon.weaponAngle < (weapon.cannonImageArray.length - 1)) {
                    this.weapon.weaponAngle += 1;
                    this.weapon.cannonImage.src = this.weapon.cannonImageArray[weapon.weaponAngle];
                    this.weapon.machineImage.src = this.weapon.machineImageArray[weapon.weaponAngle];
                    this.weapon.launcherImage.src = this.weapon.launcherImageArray[weapon.weaponAngle];
                }
            } 
            if(event.code === 'KeyM') {
                ui.menuSound.play().catch((error) => {console.error(error)});
                ui.gameMenu.showModal();
            }
        });
        this.openMenu = ui.menuIcon.addEventListener('click', () => {
            ui.menuSound.play().catch((error) => {console.error(error)});
            ui.gameMenu.showModal();
        });
        this.closeMenu = ui.closeMenuBtn.addEventListener('click', () => {
            ui.gameMenu.close();
        });
        this.exitGame = ui.exitGameBtn.addEventListener('click', () => {
            location.href = './index.html';
        });
        this.beginNextMission = ui.missionCompleteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.player.StartNextMission();
        });
    }
}

const ui = new UserInterface();

export { ui, EventListeners };
