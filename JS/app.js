'use strict';

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
        this.x = 0;
        this.y = ui.canvas.height - this.height;
        this.health = 100;
        this.healthStat = 100;
        this.firedProjectiles = [];
        this.weaponChoice = JSON.stringify(localStorage.getItem('weaponChoice')) || 'Cannon';
        this.cannonAngle = 1;
        this.cannonImageArray = ['Images/Cannon/cannonLeft.png', 'Images/Cannon/cannonUpLeft.png', 'Images/Cannon/cannonUp.png', 'Images/Cannon/cannonUpRight.png', 'Images/Cannon/cannonRight.png'];
        this.cannonImage = new Image(100, 64);
        this.cannonImage.src = this.cannonImageArray[this.cannonAngle];
        this.cannonWidth = 100;
        this.cannonHeight = 64;
    }
    DrawShip() {
        ui.ctx.drawImage(this.shipImage, this.x, this.y, this.width, this.height);
    }
    DrawCannon() {
        ui.ctx.drawImage(this.cannonImage, this.x + 95, this.y - 55, this.cannonWidth, this.cannonHeight);
    }
    MoveShip(direction) {
        if(direction === 'ArrowLeft') {
            this.x -= 5;
        } else if(direction === 'ArrowRight') {
            this.x += 5;
        }
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
                const box = new Projectile;
                player.firedProjectiles.push(box);
                console.log(player.firedProjectiles)
            } 
            if(event.code === 'KeyA') {
                if(player.cannonAngle > 0) {
                    player.cannonAngle -= 1;
                    player.cannonImage.src = player.cannonImageArray[player.cannonAngle];
                }
            } 
            if(event.code === 'KeyD') {
                if(player.cannonAngle < (player.cannonImageArray.length - 1)) {
                    player.cannonAngle += 1;
                    player.cannonImage.src = player.cannonImageArray[player.cannonAngle];
                }
            } 
            if(event.code === 'KeyM') {
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

class Projectile {
    constructor() {
        this.width = 20;
        this.height = 16;
        this.x = player.x + 120;
        this.y = player.y - 10;
        this.projectileAnglesX = [-5, -5, 0, 5, 5];
        this.projectileAnglesY = [0, 5, 5, 5, 0];
        this.projecttileAdjust = player.cannonAngle;
        this.shellImageArray = ['Images/Cannon/shellLeft.png', 'Images/Cannon/shellUpLeft.png', 'Images/Cannon/shellUp.png', 'Images/Cannon/shellUpRight.png', 'Images/Cannon/shellRight.png'];
        this.shellImage = new Image(20, 16);
        this.shellImage.src = this.shellImageArray[player.cannonAngle];
    }
    Draw() {
        ui.ctx.drawImage(this.shellImage, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x += this.projectileAnglesX[this.projecttileAdjust];
        this.y -= this.projectileAnglesY[this.projecttileAdjust];
        player.firedProjectiles.forEach((projectile, index) => {
            if(projectile.x > ui.canvas.width || projectile.x < 0 || projectile.y < 0 || projectile.y > ui.canvas.height) {
               player.firedProjectiles.splice(index, 1);
               console.log(player.firedProjectiles);
            }
        });
    }
}

class OceanSurface {
    constructor() {
        this.width = ui.canvas.width;
        this.height = 23;
        this.x = 0;
        this.y = ui.canvas.height - this.height;
        this.image = new Image();
        this.image.src = 'Images/oceanSurface.png';
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

const ui = new UserInterface;
const player = new PlayerClass;
const healthBar = new PlayerHealthBar;
const events = new EventListeners;
const water = new OceanSurface;

function animationLoop() {
    if(!ui.gameMenu.open) {
        ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
        player.DrawCannon();
        player.DrawShip();
        water.Draw();
        healthBar.Draw();
        player.firedProjectiles.forEach((box) => {
            box.UpdatePosition();
            box.Draw();
        });
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();
