import { player, ui } from './app.js';

class Shell {
    constructor() {
        this.width = 20;
        this.height = 16;
        this.x = player.x + 120;
        this.y = player.y - 10;
        this.damage = 10;
        this.hit = false;
        this.projectileAnglesX = [-5, -5, 0, 5, 5];
        this.projectileAnglesY = [0, 5, 5, 5, 0];
        this.projecttileAdjust = player.weaponAngle;
        this.shellImageArray = ['Images/Cannon/shellLeft.png', 'Images/Cannon/shellUpLeft.png', 'Images/Cannon/shellUp.png', 'Images/Cannon/shellUpRight.png', 'Images/Cannon/shellRight.png'];
        this.shellImage = new Image(20, 16);
        this.shellImage.src = this.shellImageArray[player.weaponAngle];
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
            }
        });
    }
}

class Bullet {
    constructor() {
        this.width = 20;
        this.height = 16;
        this.x = player.x + 130;
        this.y = player.y - 20;
        this.damage = 5;
        this.hit = false;
        this.projectileAnglesX = [-5, -5, 0, 5, 5];
        this.projectileAnglesY = [0, 5, 5, 5, 0];
        this.projecttileAdjust = player.weaponAngle;
        this.bulletImageArray = ['Images/Machine/bulletLeft.png', 'Images/Machine/bulletUpLeft.png', 'Images/Machine/bulletUp.png', 'Images/Machine/bulletUpRight.png', 'Images/Machine/bulletRight.png'];
        this.bulletImage = new Image(20, 16);
        this.bulletImage.src = this.bulletImageArray[player.weaponAngle];
    }
    Draw() {
        ui.ctx.drawImage(this.bulletImage, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x += this.projectileAnglesX[this.projecttileAdjust];
        this.y -= this.projectileAnglesY[this.projecttileAdjust];
        player.firedProjectiles.forEach((projectile, index) => {
            if(projectile.x > ui.canvas.width || projectile.x < 0 || projectile.y < 0 || projectile.y > ui.canvas.height) {
               player.firedProjectiles.splice(index, 1);
            }
        });
    }
}

class SmallLaserShot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.damage = 5;
        this.image = new Image(8, 14);
        this.image.src = 'Images/Enemies/smallLaser.png';
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, 8, 14);
    }
    UpdatePosition() {
        this.y += 2;
    }
}

class LargeLaserShot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.damage = 10;
        this.image = new Image(10, 16);
        this.image.src = 'Images/Enemies/smallLaser.png';
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, 10, 16);
    }
    UpdatePosition() {
        this.y += 2;
    }
}

export { Shell, Bullet, SmallLaserShot, LargeLaserShot };