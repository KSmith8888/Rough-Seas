'use strict';

class UserInterface {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

class PlayerClass {
    constructor() {
        this.shipImage = new Image(200, 100);
        this.shipImage.src = 'Images/shipv1.png';
        this.width = 200;
        this.height = 100;
        this.x = 0;
        this.y = ui.canvas.height - this.height;
        this.health = 100;
        this.healthStat = 100;
        this.firedProjectiles = [];
        this.cannonAngle = 2;
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
        ui.ctx.drawImage(this.cannonImage, this.x + 60, this.y - 20, this.cannonWidth, this.cannonHeight);
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
        ui.ctx.fillStyle = 'grey';
        ui.ctx.beginPath();
        ui.ctx.moveTo(this.x, this.y);
        ui.ctx.lineTo(this.x + this.width + 3, this.y);
        ui.ctx.lineTo(this.x + this.width + 3, this.y + this.height);
        ui.ctx.lineTo(this.x, this.y + this.height);
        ui.ctx.lineTo(this.x, this.y);
        ui.ctx.closePath();
        ui.ctx.fill();
        ui.ctx.stroke();
        ui.ctx.fillStyle = 'navy';
        ui.ctx.fillRect(this.x + 2, this.y + 2, this.fill, this.height - 4);
    }
}

class EventListeners {
    constructor() {
        this.keyEvent = document.addEventListener('keydown', (event) => {
            if(event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                player.MoveShip(event.code);
                player.health -= 1;
            } else if(event.code === 'KeyW') {
                const box = new Projectile;
                player.firedProjectiles.push(box);
                console.log(player.firedProjectiles)
            } else if(event.code === 'KeyA') {
                if(player.cannonAngle > 0) {
                    player.cannonAngle -= 1;
                    player.cannonImage.src = player.cannonImageArray[player.cannonAngle];
                }
            } else if(event.code === 'KeyD') {
                if(player.cannonAngle < (player.cannonImageArray.length - 1)) {
                    player.cannonAngle += 1;
                    player.cannonImage.src = player.cannonImageArray[player.cannonAngle];
                }
            }
        });
    }
}

class Projectile {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.x = player.x + 100;
        this.y = player.y + 10;
        this.projectileAnglesX = [-5, -5, 0, 5, 5];
        this.projectileAnglesY = [0, 5, 5, 5, 0];
        this.projecttileAdjust = player.cannonAngle;
    }
    Draw() {
        ui.ctx.beginPath();
        ui.ctx.strokeStyle = 'red';
        ui.ctx.fillStyle = 'black';
        ui.ctx.rect(this.x, this.y, this.width, this.height);
        ui.ctx.fill();
        ui.ctx.stroke();
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

const ui = new UserInterface;
const player = new PlayerClass;
const healthBar = new PlayerHealthBar;
const events = new EventListeners;

function animationLoop() {
    ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
    player.DrawShip();
    player.DrawCannon();
    healthBar.Draw();
    player.firedProjectiles.forEach((box) => {
        box.UpdatePosition();
        box.Draw();
    })
    requestAnimationFrame(animationLoop);
}
animationLoop();
