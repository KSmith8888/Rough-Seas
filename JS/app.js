import { generator }  from './Enemies.js';
import { Shell, Bullet } from './Projectiles.js';
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
        this.shipImage = new Image(255, 80);
        this.shipImage.src = 'Images/playerShipV3.png';
        this.width = 255;
        this.height = 80;
        this.x = 250;
        this.y = ui.canvas.height - this.height;
        this.health = 100;
        this.healthStat = 100;
        this.enemiesDestroyed = 0;
        this.firedProjectiles = [];
        this.weaponChoice = 'Cannon';
        this.weaponAngle = 1;
        this.weaponWidth = 100;
        this.weaponHeight = 64;
        this.cannonImageArray = ['Images/Cannon/cannonLeft.png', 'Images/Cannon/cannonUpLeft.png', 'Images/Cannon/cannonUp.png', 'Images/Cannon/cannonUpRight.png', 'Images/Cannon/cannonRight.png'];
        this.cannonImage = new Image(100, 64);
        this.cannonImage.src = this.cannonImageArray[this.weaponAngle];
        this.machineImageArray = ['Images/Machine/machineLeft.png', 'Images/Machine/machineUpLeft.png', 'Images/Machine/machineUp.png', 'Images/Machine/machineUpRight.png', 'Images/Machine/machineRight.png'];
        this.machineImage = new Image(100, 64);
        this.machineImage.src = this.machineImageArray[this.weaponAngle];
    }
    DrawShip() {
        ui.ctx.drawImage(this.shipImage, this.x, this.y, this.width, this.height);
    }
    DrawWeapon() {
        if(this.weaponChoice === 'Cannon') {
            ui.ctx.drawImage(this.cannonImage, this.x + 95, this.y - 55, this.weaponWidth, this.weaponHeight);
        } else if(this.weaponChoice === 'Rocket') {
         
        } else if(this.weaponChoice === 'Machine') {
            ui.ctx.drawImage(this.machineImage, this.x + 95, this.y - 55, this.weaponWidth, this.weaponHeight);
        }
    }
    MoveShip(direction) {
        if(direction === 'ArrowLeft') {
            this.x -= 5;
        } else if(direction === 'ArrowRight') {
            this.x += 5;
        }
    }
    ChooseWeapon() {
        localStorage.setItem('weaponChoice', JSON.stringify('Cannon'))
        if(JSON.parse(localStorage.getItem('weaponChoice')) === 'Rocket') {
            this.weaponChoice = 'Rocket';
        } else if(JSON.parse(localStorage.getItem('weaponChoice')) === 'Machine') {
            this.weaponChoice = 'Machine';
        } else if(JSON.parse(localStorage.getItem('weaponChoice')) === 'Cannon') {
            this.weaponChoice = 'Cannon';
        }
    }
    ControlProjectiles() {
        this.firedProjectiles.forEach((projectile) => {
            projectile.UpdatePosition();
            projectile.Draw();
        });
    }
}

class PlayerHealthBar {
    constructor() {
        this.x = 40;
        this.y = 10;
        this.width = 200;
        this.height = 15;
        this.fill = 195;
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

class EventListeners {
    constructor() {
        this.keyEvent = document.addEventListener('keydown', (event) => {
            if(event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                player.MoveShip(event.code);
            } 
            if(event.code === 'KeyW') {
                if(player.weaponChoice === 'Cannon' && player.firedProjectiles.length < 5) {
                    const shell = new Shell;
                    player.firedProjectiles.push(shell);
                } else if(player.weaponChoice === 'Rocket') {
                    console.log('Fired Rocket')
                } else if(player.weaponChoice === 'Machine' && player.firedProjectiles.length < 10) {
                    const bullet = new Bullet;
                    player.firedProjectiles.push(bullet);
                }
            } 
            if(event.code === 'KeyA') {
                if(player.weaponAngle > 0) {
                    player.weaponAngle -= 1;
                    player.cannonImage.src = player.cannonImageArray[player.weaponAngle];
                    player.machineImage.src = player.machineImageArray[player.weaponAngle];
                }
            } 
            if(event.code === 'KeyD') {
                if(player.weaponAngle < (player.cannonImageArray.length - 1)) {
                    player.weaponAngle += 1;
                    player.cannonImage.src = player.cannonImageArray[player.weaponAngle];
                    player.machineImage.src = player.machineImageArray[player.weaponAngle];
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
player.ChooseWeapon();
const healthBar = new PlayerHealthBar;
const events = new EventListeners;

function animationLoop() {
    if(!ui.gameMenu.open) {
        ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
        cloudGenerator.DrawClouds();
        skyline.ControlSkyline();
        player.DrawWeapon();
        player.DrawShip();
        generator.ControlEnemies();
        generator.Collision();
        generator.AddFinalBoss();
        generator.ControlLasers();
        generator.ControlExplosions();
        water.ControlWater();
        healthBar.Draw();
        player.ControlProjectiles();
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();

export { player, ui };
