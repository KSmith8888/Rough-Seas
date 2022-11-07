import { ui } from './user-interface.js';

class PlayerClass {
    constructor() {
        this.width = 255;
        this.height = 80;
        this.x = 500;
        this.y = ui.canvas.height - this.height;
        this.healthStat = 100;
        this.damageStat = 10;
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
        localStorage.setItem('Weapon Choice', JSON.stringify('Cannon'));
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
    constructor(player) {
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
    constructor(player) {
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
    DrawWeapon() {
        this.x = this.player.x + 95;
        this.y = this.player.y - 55;
        if(this.player.weaponChoice === 'Cannon') {
            ui.ctx.drawImage(this.cannonImage, this.x, this.y, this.width, this.height);
        } else if(this.player.weaponChoice === 'Rocket') {
            ui.ctx.drawImage(this.launcherImage, this.x, this.y, this.width, this.height);
        } else if(this.player.weaponChoice === 'Machine') {
            ui.ctx.drawImage(this.machineImage, this.x, this.y, this.width, this.height);
        }
    }
}

export { PlayerClass, PlayerHealthBar, WeaponClass };
