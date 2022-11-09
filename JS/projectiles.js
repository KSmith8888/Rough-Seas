//Player Projectiles

class Shell {
    constructor(player, weapon, userInterface) {
        this.player = player;
        this.weapon = weapon;
        this.ui = userInterface;
        this.width = 20;
        this.height = 16;
        this.x = this.player.x + 120;
        this.y = this.player.y - 10;
        this.damage = 10;
        this.hit = false;
        this.offScreen = false;
        this.projectileAnglesX = [-5, -5, 0, 5, 5];
        this.projectileAnglesY = [0, 5, 5, 5, 0];
        this.projecttileAdjust = this.weapon.weaponAngle;
        this.shellImageArray = ['Images/Cannon/shellLeft.png', 'Images/Cannon/shellUpLeft.png', 'Images/Cannon/shellUp.png', 'Images/Cannon/shellUpRight.png', 'Images/Cannon/shellRight.png'];
        this.shellImage = new Image(20, 16);
        this.shellImage.src = this.shellImageArray[this.weapon.weaponAngle];
    }
    Draw() {
        this.ui.ctx.drawImage(this.shellImage, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x += this.projectileAnglesX[this.projecttileAdjust];
        this.y -= this.projectileAnglesY[this.projecttileAdjust];
        this.player.firedProjectiles.forEach((projectile) => {
            if(projectile.x > this.ui.canvas.width || projectile.x < 0 || projectile.y < 0 || projectile.y > this.ui.canvas.height) {
                projectile.offScreen = true;
            }
        });
    }
}

class Bullet {
    constructor(player, weapon, userInterface) {
        this.player = player;
        this.weapon = weapon;
        this.ui = userInterface;
        this.width = 20;
        this.height = 16;
        this.x = this.player.x + 130;
        this.y = this.player.y - 20;
        this.damage = 5;
        this.hit = false;
        this.offScreen = false;
        this.projectileAnglesX = [-8, -8, 0, 8, 8];
        this.projectileAnglesY = [0, 8, 8, 8, 0];
        this.projecttileAdjust = this.weapon.weaponAngle;
        this.bulletImageArray = ['Images/Machine/bulletLeft.png', 'Images/Machine/bulletUpLeft.png', 'Images/Machine/bulletUp.png', 'Images/Machine/bulletUpRight.png', 'Images/Machine/bulletRight.png'];
        this.bulletImage = new Image(20, 16);
        this.bulletImage.src = this.bulletImageArray[this.weapon.weaponAngle];
    }
    Draw() {
        this.ui.ctx.drawImage(this.bulletImage, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x += this.projectileAnglesX[this.projecttileAdjust];
        this.y -= this.projectileAnglesY[this.projecttileAdjust];
        this.player.firedProjectiles.forEach((projectile) => {
            if(projectile.x > this.ui.canvas.width || projectile.x < 0 || projectile.y < 0 || projectile.y > this.ui.canvas.height) {
                projectile.offScreen = true;
            }
        });
    }
}

class Rocket {
    constructor(player, weapon, userInterface) {
        this.player = player;
        this.weapon = weapon;
        this.ui = userInterface;
        this.width = 20;
        this.height = 16;
        this.x = this.player.x + 130;
        this.y = this.player.y - 20;
        this.damage = 15;
        this.hit = false;
        this.offScreen = false;
        this.projectileAnglesX = [-3, -3, 0, 3, 3];
        this.projectileAnglesY = [0, 3, 3, 3, 0];
        this.projecttileAdjust = weapon.weaponAngle;
        this.rocketImageArray = ['Images/Rocket/rocketLeft.png', 'Images/Rocket/rocketUpLeft.png', 'Images/Rocket/rocketUp.png', 'Images/Rocket/rocketUpRight.png', 'Images/Rocket/rocketRight.png'];
        this.rocketImage = new Image(20, 16);
        this.rocketImage.src = this.rocketImageArray[weapon.weaponAngle];
    }
    Draw() {
        this.ui.ctx.drawImage(this.rocketImage, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x += this.projectileAnglesX[this.projecttileAdjust];
        this.y -= this.projectileAnglesY[this.projecttileAdjust];
        this.player.firedProjectiles.forEach((projectile) => {
            if(projectile.x > this.ui.canvas.width || projectile.x < 0 || projectile.y < 0 || projectile.y > this.ui.canvas.height) {
                projectile.offScreen = true;
            }
        });
    }
}

//Enemy Projectiles

class SmallLaserShot {
    constructor(x, y, userInterface) {
        this.x = x;
        this.y = y;
        this.ui = userInterface;
        this.damage = 5;
        this.image = new Image(8, 14);
        this.image.src = 'Images/Enemies/smallLaser.png';
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, 8, 14);
    }
    UpdatePosition() {
        this.y += 2;
    }
}

class LargeLaserShot {
    constructor(x, y, userInterface) {
        this.x = x;
        this.y = y;
        this.ui = userInterface;
        this.damage = 10;
        this.image = new Image(10, 16);
        this.image.src = 'Images/Enemies/smallLaser.png';
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, 10, 16);
    }
    UpdatePosition() {
        this.y += 2;
    }
}

//Explosions

class SmallExplosion {
    constructor(x, y, userInterface) {
        this.width = 18;
        this.height = 18;
        this.ui = userInterface;
        this.x = x;
        this.y = y;
        this.image = new Image(this.width, this.height);
        this.image.src = 'Images/explosionImage.png';
        this.activeFrames = 0;
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.activeFrames++;
    }
}

export { Shell, Bullet, Rocket, SmallLaserShot, LargeLaserShot, SmallExplosion };
