import { level1Generator }  from './Enemy-Generation.js';
import { Shell, Bullet, Rocket } from './Projectiles.js';
import { cloudGenerator, OceanSurface, skyline } from './Background.js';

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
    }
}

class PlayerClass {
    constructor() {
        this.width = 255;
        this.height = 80;
        this.x = 500;
        this.y = ui.canvas.height - this.height;
        this.gameLevel = 1;
        this.healthStat = 100;
        this.damageStat = 5;
        this.health = 100;
        this.weaponChoice = 'Cannon';
        this.enemiesDestroyed = 0;
        this.firedProjectiles = [];
        this.image = new Image(255, 80);
        this.image.src = 'Images/playerShipV3.png';
    }
    DrawShip() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    MoveShip(direction) {
        if(direction === 'ArrowLeft') {
            if (this.x >= 5) {
                this.x -= 5;
            }
        } else if(direction === 'ArrowRight') {
            if (this.x < (ui.canvas.width - this.width)) {
                this.x += 5;
            }
        }
    }
    ControlProjectiles() {
        this.firedProjectiles.forEach((projectile) => {
            projectile.UpdatePosition();
            projectile.Draw();
        });
    }
    LoadSaveData() {
        localStorage.setItem('Weapon Choice', JSON.stringify('Rocket'));
        localStorage.setItem('Health Stat', JSON.stringify(120));
        if(localStorage.getItem('Health Stat') !== null) {
            this.healthStat = JSON.parse(localStorage.getItem('Health Stat'));
            this.health = this.healthStat;
        }
        if(localStorage.getItem('Damage Stat') !== null) {
            this.damageStat = JSON.parse(localStorage.getItem('Damage Stat'));
        }
        if(localStorage.getItem('Weapon Choice') !== null) {
            this.weaponChoice = JSON.parse(localStorage.getItem('Weapon Choice'));
        }
    }
}

class PlayerHealthBar {
    constructor() {
        this.x = 40;
        this.y = 10;
        this.height = 15;
        this.width = player.healthStat * 2 - 5;
        this.fill = player.health * 2 - 5;
    }
    Draw() {
        this.width = player.healthStat * 2 - 5;
        this.fill = player.health * 2 - 5;
        ui.ctx.strokeStyle = 'black';
        ui.ctx.fillStyle = 'black';
        ui.ctx.beginPath();
        ui.ctx.moveTo(this.x, this.y);
        ui.ctx.lineTo(this.x + this.width + 3, this.y);
        ui.ctx.lineTo(this.x + this.width + 3, this.y + this.height);
        ui.ctx.lineTo(this.x, this.y + this.height);
        ui.ctx.lineTo(this.x, this.y);
        ui.ctx.closePath();
        ui.ctx.fill();
        ui.ctx.stroke();
        ui.ctx.fillStyle = 'rgb(184, 29, 9)';
        ui.ctx.fillRect(this.x + 2, this.y + 2, this.fill, this.height - 4);
    }
}

class WeaponClass {
    constructor() {
        this.x = player.x + 95;
        this.y = player.y - 55;
        this.width = 100;
        this.height = 64;
        this.weaponAngle = 1;
        this.cannonImageArray = ['Images/Cannon/cannonLeft.png', 'Images/Cannon/cannonUpLeft.png', 'Images/Cannon/cannonUp.png', 'Images/Cannon/cannonUpRight.png', 'Images/Cannon/cannonRight.png'];
        this.cannonImage = new Image(100, 64);
        this.cannonImage.src = this.cannonImageArray[this.weaponAngle];
        this.machineImageArray = ['Images/Machine/machineLeft.png', 'Images/Machine/machineUpLeft.png', 'Images/Machine/machineUp.png', 'Images/Machine/machineUpRight.png', 'Images/Machine/machineRight.png'];
        this.machineImage = new Image(100, 64);
        this.machineImage.src = this.machineImageArray[this.weaponAngle];
        this.launcherImageArray = ['Images/Rocket/launcherLeft.png', 'Images/Rocket/launcherUpLeft.png', 'Images/Rocket/launcherUp.png', 'Images/Rocket/launcherUpRight.png', 'Images/Rocket/launcherRight.png'];
        this.launcherImage = new Image(100, 64);
        this.launcherImage.src = this.launcherImageArray[this.weaponAngle];
    }
    DrawWeapon() {
        this.x = player.x + 95;
        this.y = player.y - 55;
        if(player.weaponChoice === 'Cannon') {
            ui.ctx.drawImage(this.cannonImage, this.x, this.y, this.width, this.height);
        } else if(player.weaponChoice === 'Rocket') {
            ui.ctx.drawImage(this.launcherImage, this.x, this.y, this.width, this.height);
        } else if(player.weaponChoice === 'Machine') {
            ui.ctx.drawImage(this.machineImage, this.x, this.y, this.width, this.height);
        }
    }
}

class EventListeners {
    constructor() {
        this.keyEvent = document.addEventListener('keydown', (event) => {
            if(event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                player.MoveShip(event.code);
            } 
            if(event.code === 'KeyW') {
                if(player.weaponChoice === 'Cannon' && player.firedProjectiles.length < 7) {
                    const shell = new Shell;
                    player.firedProjectiles.push(shell);
                } else if(player.weaponChoice === 'Rocket' && player.firedProjectiles.length < 4) {
                    const rocket = new Rocket;
                    player.firedProjectiles.push(rocket);
                } else if(player.weaponChoice === 'Machine' && player.firedProjectiles.length < 10) {
                    const bullet = new Bullet;
                    player.firedProjectiles.push(bullet);
                }
            } 
            if(event.code === 'KeyA') {
                if(weapon.weaponAngle > 0) {
                    weapon.weaponAngle -= 1;
                    weapon.cannonImage.src = weapon.cannonImageArray[weapon.weaponAngle];
                    weapon.machineImage.src = weapon.machineImageArray[weapon.weaponAngle];
                    weapon.launcherImage.src = weapon.launcherImageArray[weapon.weaponAngle];
                }
            } 
            if(event.code === 'KeyD') {
                if(weapon.weaponAngle < (weapon.cannonImageArray.length - 1)) {
                    weapon.weaponAngle += 1;
                    weapon.cannonImage.src = weapon.cannonImageArray[weapon.weaponAngle];
                    weapon.machineImage.src = weapon.machineImageArray[weapon.weaponAngle];
                    weapon.launcherImage.src = weapon.launcherImageArray[weapon.weaponAngle];
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
    }
}

const ui = new UserInterface;
const water = new OceanSurface;
const player = new PlayerClass;
player.LoadSaveData();
const weapon = new WeaponClass;
const healthBar = new PlayerHealthBar;
const events = new EventListeners;

function animationLoop() {
    if(!ui.gameMenu.open) {
        ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
        cloudGenerator.DrawClouds();
        skyline.ControlSkyline();
        weapon.DrawWeapon();
        player.DrawShip();
        level1Generator.ControlEnemies();
        level1Generator.Collision();
        level1Generator.AddFinalBoss();
        level1Generator.ControlLasers();
        level1Generator.ControlExplosions();
        water.ControlWater();
        healthBar.Draw();
        player.ControlProjectiles();
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();

export { player, ui, weapon };
