import { Shell, Bullet, Rocket } from './projectiles.js';

class PlayerClass {
    constructor(userInterface) {
        this.ui = userInterface;
        this.width = 255;
        this.height = 80;
        this.x = 500;
        this.y = this.ui.canvas.height - this.height;
        this.healthStat = 100;
        this.damageStat = 10;
        this.health = 100;
        this.weaponChoice = 'Cannon';
        this.enemiesDestroyed = 0;
        this.firedProjectiles = [];
        this.image = new Image(255, 80);
        this.image.src = 'Images/playerShipV3.png';
        this.shipMovement = 'None';
    }
    DrawShip() {
        if (this.x >= 1 && this.shipMovement === 'Left') {
            this.x -= 1;
        } else if (this.x < (this.ui.canvas.width - this.width) && this.shipMovement === 'Right') {
            this.x += 1;
        }
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    MoveShip(direction) {
        if(direction === 'KeyA') {
            this.shipMovement = 'Left';
        } else if(direction === 'KeyD') {
            this.shipMovement = 'Right';
        } else if(direction === 'KeyW') {
            this.shipMovement = 'None';
        }
    }
    GameOver() {
        if(this.health <= 0) {
            alert('Game Over, please try again!');
            location.href = './index.html';
        }
    }
    ControlProjectiles() {
        this.firedProjectiles = this.firedProjectiles.filter((projectile) => {
            if(!projectile.offScreen && !projectile.hit) {
                return projectile;
            }
        });
        this.firedProjectiles.forEach((projectile) => {
            projectile.UpdatePosition();
            projectile.Draw();
        });
    }
    StartNextMission() {
        if(JSON.parse(localStorage.getItem('Game Level')) === 2) {
            location.href = './level-2-monsoon.html';
        } else if(JSON.parse(localStorage.getItem('Game Level')) === 3) {
            alert('The level you have reached is not yet available. Please start a new game or come back when the game is finished to continue.');
            location.href = './index.html';
        }
    }
}

class PlayerHealthBar {
    constructor(player, userInterface) {
        this.ui = userInterface;
        this.player = player;
        this.x = 40;
        this.y = 10;
        this.height = 15;
        this.width = this.player.healthStat * 2 - 5;
        this.fill = this.player.health * 2 - 5;
    }
    Draw() {
        this.width = this.player.healthStat * 2 - 5;
        this.fill = this.player.health * 2 - 5;
        this.ui.ctx.strokeStyle = 'black';
        this.ui.ctx.fillStyle = 'black';
        this.ui.ctx.beginPath();
        this.ui.ctx.moveTo(this.x, this.y);
        this.ui.ctx.lineTo(this.x + this.width + 3, this.y);
        this.ui.ctx.lineTo(this.x + this.width + 3, this.y + this.height);
        this.ui.ctx.lineTo(this.x, this.y + this.height);
        this.ui.ctx.lineTo(this.x, this.y);
        this.ui.ctx.closePath();
        this.ui.ctx.fill();
        this.ui.ctx.stroke();
        this.ui.ctx.fillStyle = 'rgb(184, 29, 9)';
        this.ui.ctx.fillRect(this.x + 2, this.y + 2, this.fill, this.height - 4);
    }
}

class WeaponClass {
    constructor(player, userInterface) {
        this.ui = userInterface;
        this.player = player;
        this.x = this.player.x + 95;
        this.y = this.player.y - 55;
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
    FireProjectile() {
        if(this.player.weaponChoice === 'Cannon' && this.player.firedProjectiles.length < 7) {
            const shell = new Shell(this.player, this, this.ui);
            this.player.firedProjectiles.push(shell);
        } else if(this.player.weaponChoice === 'Rocket' && this.player.firedProjectiles.length < 4) {
            const rocket = new Rocket(this.player, this, this.ui);
            this.player.firedProjectiles.push(rocket);
        } else if(this.player.weaponChoice === 'Machine' && this.player.firedProjectiles.length < 10) {
            const bullet = new Bullet(this.player, this, this.ui);
            this.player.firedProjectiles.push(bullet);
        }
    }
    DrawWeapon() {
        this.x = this.player.x + 95;
        this.y = this.player.y - 55;
        if(this.player.weaponChoice === 'Cannon') {
            this.ui.ctx.drawImage(this.cannonImage, this.x, this.y, this.width, this.height);
        } else if(this.player.weaponChoice === 'Rocket') {
            this.ui.ctx.drawImage(this.launcherImage, this.x, this.y, this.width, this.height);
        } else if(this.player.weaponChoice === 'Machine') {
            this.ui.ctx.drawImage(this.machineImage, this.x, this.y, this.width, this.height);
        }
    }
}

export { PlayerClass, PlayerHealthBar, WeaponClass };
