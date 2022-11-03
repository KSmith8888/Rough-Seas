import { ui, player } from './app.js';
import { SmallLaserShot, LargeLaserShot, SmallExplosion} from './Projectiles.js';

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
                    generator.explosionArray.push(new SmallExplosion(this.x, this.y));
                    player.enemiesDestroyed += 1;
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
                generator.LaserArray.push(new SmallLaserShot(this.x, this.y));
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
                    generator.explosionArray.push(new SmallExplosion(this.x, this.y));
                    player.enemiesDestroyed += 1;
                }
        });
    }
}

class LargeEnemy1 {
    constructor() {
        this.enemyType = 'Large Enemy 1';
        this.health = 50;
        this.width = 50;
        this.height = 60;
        this.x = Math.floor(Math.random() * ui.canvas.width);
        this.y = 0;
        this.image = new Image(50, 60);
        this.image.src = 'Images/Enemies/largeEnemy1.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * 250);
        this.randomYNumber = Math.floor(Math.random() * 30);
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !ui.gameMenu.open) {
                generator.LaserArray.push(new LargeLaserShot(this.x, this.y + (this.height / 2)));
                generator.LaserArray.push(new LargeLaserShot(this.x + 45, this.y + (this.height / 2)));
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
                projectile.y < (this.y + this.height) &&
                projectile.hit === false
                ) {
                    projectile.hit = true;
                    this.health -= projectile.damage;
                    generator.explosionArray.push(new SmallExplosion(this.x, this.y));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

class EnemyGenerator {
    constructor() {
        this.EnemyArray = [];
        this.LaserArray = [];
        this.explosionArray = [];
        this.finalBossReleased = false;
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
                        this.explosionArray.push(new SmallExplosion(ship.x, ship.y));
                        this.EnemyArray.splice(index, 1);
                } else if(ship.y === ui.canvas.height || ship.destroyed) {
                    this.EnemyArray.splice(index, 1);
                }
            }
            if(ship.enemyType === 'Small Enemy 2') {
                if(ship.destroyed) {
                    this.EnemyArray.splice(index, 1);
                }
            }
            if(ship.enemyType === 'Large Enemy 1') {
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
                    player.health -= laser.damage;
                    this.explosionArray.push(new SmallExplosion(laser.x, laser.y));
                    this.LaserArray.splice(index, 1);
            }
            if(laser.y >= canvas.height) {
                this.LaserArray.splice(index, 1);
            }
        })
    }
    AddFinalBoss() {
        if(player.enemiesDestroyed >= 10 && !ui.gameMenu.open && this.finalBossReleased === false) {
            this.finalBossReleased = true;
            clearInterval(this.addSmallEnemy1);
            clearInterval(this.addSmallEnemy2);
            this.EnemyArray.push(new LargeEnemy1);
        }
    }
    ControlEnemies() {
        this.EnemyArray.forEach((ship) => {
            ship.Draw();
            ship.UpdatePosition();
            ship.Hit();
        });
    }
    ControlLasers() {
        this.LaserArray.forEach((laser) => {
            laser.Draw();
            laser.UpdatePosition();
        });
    }
    ControlExplosions() {
        this.explosionArray.forEach((explosion, index) => {
            if(explosion.activeFrames < 10) {
                explosion.Draw();
            } else {
                this.explosionArray.splice(index, 1);
            }
        })
    }
}

const generator = new EnemyGenerator;

export { generator };
