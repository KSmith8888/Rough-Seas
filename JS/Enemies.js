import { ui, player } from './app.js';

class LaserShot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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

class SmallEnemy1 {
    constructor() {
        this.enemyType = 'Small Enemy 1';
        this.width = 28;
        this.height = 28;
        this.x = Math.floor(Math.random() * ui.canvas.width);
        this.y = 0;
        this.image = new Image(28, 28);
        this.image.src = 'Images/Enemies/smallEnemy1.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * 250);
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.y < ui.canvas.height) {
            this.y += 2;
            if(this.x < (player.x + this.randomXNumber)) {
                this.x += 1;
            } else {
                this.x -= 1;
            }
            
        } else {
            this.y = ui.canvas.height;
        }
    }
    Hit() {
        player.firedProjectiles.forEach((projectile) => {
            if(
                (projectile.x + projectile.width) >= this.x && 
                projectile.x < (this.x + this.width) &&
                (projectile.y + projectile.height) >= this.y &&
                projectile.y < (this.y + this.height)
                ) {
                    this.destroyed = true;
                }
        });
    }
}

class SmallEnemy2 {
    constructor() {
        this.enemyType = 'Small Enemy 2';
        this.width = 22;
        this.height = 32;
        this.x = Math.floor(Math.random() * ui.canvas.width);
        this.y = 0;
        this.image = new Image(22, 32);
        this.image.src = 'Images/Enemies/smallEnemy2.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * 250);
        this.randomYNumber = Math.floor(Math.random() * 30);
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !ui.gameMenu.open) {
                generator.LaserArray.push(new LaserShot(this.x, this.y));
            }
        }, 5000);
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.x < player.x + this.randomXNumber) {
            this.x += 1;
        } else {
            this.x -= 1;
        }
        if(this.y < (40 + this.randomYNumber)) {
            this.y += 2;
        }
    }
    Hit() {
        player.firedProjectiles.forEach((projectile) => {
            if(
                (projectile.x + projectile.width) >= this.x && 
                projectile.x < (this.x + this.width) &&
                (projectile.y + projectile.height) >= this.y &&
                projectile.y < (this.y + this.height)
                ) {
                    this.destroyed = true;
                }
        });
    }
}

class EnemyGenerator {
    constructor() {
        this.EnemyArray = [];
        this.LaserArray = [];
        this.addSmallEnemy1 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy1);
            }
        }, 20000);
        this.addSmallEnemy2 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy2);
            }
        }, 10000);
    }
    Collision() {
        this.EnemyArray.forEach((ship, index) => {
            if(ship.enemyType === 'Small Enemy 1') {
                if(
                    ship.x >= player.x && 
                    ship.x < (player.x + player.width) &&
                    ship.y > (ui.canvas.height - player.height)
                    ) {
                        player.health -= 20;
                        this.EnemyArray.splice(index, 1);
                } else if(ship.y === ui.canvas.height) {
                    this.EnemyArray.splice(index, 1);
                } else if(ship.destroyed) {
                    this.EnemyArray.splice(index, 1);
                }
            }
            if(ship.enemyType === 'Small Enemy 2') {
                if(ship.destroyed) {
                    this.EnemyArray.splice(index, 1);
                }
            }
        });
        this.LaserArray.forEach((laser, index) => {
            if(
                laser.x >= player.x && 
                laser.x < (player.x + player.width) &&
                laser.y > (ui.canvas.height - player.height)
                ) {
                    player.health -= 10;
                    this.LaserArray.splice(index, 1);
            }
            if(laser.y >= canvas.height) {
                this.LaserArray.splice(index, 1);
            }
        })
    }
}

const generator = new EnemyGenerator;

export { generator };
