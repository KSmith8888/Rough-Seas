import { LargeLaserShot, SmallExplosion } from './projectiles.js';

class LargeEnemy1 {
    constructor(generator, player, userInterface) {
        this.player = player;
        this.generator = generator;
        this.ui = userInterface;
        this.enemyType = 'Large Enemy 1';
        this.health = 100;
        this.width = 50;
        this.height = 60;
        this.x = Math.floor(Math.random() * this.ui.canvas.width);
        this.y = 0 - this.height;
        this.image = new Image(50, 60);
        this.image.src = 'Images/Enemies/largeEnemy1.png';
        this.destroyed = false;
        this.boss = true;
        this.randomXNumber = Math.floor(Math.random() * 250);
        this.randomYNumber = Math.floor(Math.random() * 30);
        this.updateXTarget = 0;
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !this.ui.gameMenu.open) {
                this.generator.LaserArray.push(new LargeLaserShot(this.x, this.y + (this.height / 2), this.ui));
                this.generator.LaserArray.push(new LargeLaserShot(this.x + 45, this.y + (this.height / 2), this.ui));
            }
        }, 5000);
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.updateXTarget === 30) {
            this.randomXNumber = Math.floor(Math.random() * this.player.width);
            this.updateXTarget = 0;
        } else {
            this.updateXTarget++;
        }
        if(this.x < this.player.x + this.randomXNumber) {
            this.x += 1;
        } else {
            this.x -= 1;
        }
        if(this.y < (40 + this.randomYNumber)) {
            this.y += .5;
        }
    }
    Hit() {
        this.player.firedProjectiles.forEach((projectile) => {
            if(
                (projectile.x + projectile.width) >= this.x && 
                projectile.x < (this.x + this.width) &&
                (projectile.y + projectile.height) >= this.y &&
                projectile.y < (this.y + this.height) &&
                projectile.hit === false
                ) {
                    projectile.hit = true;
                    this.health -= (projectile.damage + this.player.damageStat);
                    this.generator.explosionArray.push(new SmallExplosion(projectile.x, projectile.y - (this.height / 2), this.ui));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.generator.finalBossDestroyed = true;
                        this.player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

class LargeEnemy2 {
    constructor(generator, player, userInterface) {
        this.player = player;
        this.generator = generator;
        this.ui = userInterface;
        this.enemyType = 'Large Enemy 2';
        this.health = 100;
        this.width = 86;
        this.height = 80;
        this.x = Math.floor(Math.random() * this.ui.canvas.width);
        this.y = 0 - this.height;
        this.image = new Image(86, 80);
        this.image.src = 'Images/Enemies/largeEnemy2.png';
        this.destroyed = false;
        this.boss = true;
        this.randomXNumber = Math.floor(Math.random() * (this.player.width - this.width));
        this.randomYNumber = Math.floor(Math.random() * 30);
        this.updateXTarget = 0;
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !this.ui.gameMenu.open) {
                this.generator.LaserArray.push(new LargeLaserShot(this.x, this.y + (this.height / 4), this.ui));
                this.generator.LaserArray.push(new LargeLaserShot(this.x + this.width, this.y + (this.height / 4), this.ui));
            }
        }, 5000);
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.updateXTarget === 30) {
            this.randomXNumber = Math.floor(Math.random() * this.player.width);
            this.updateXTarget = 0;
        } else {
            this.updateXTarget++;
        }
        if(this.x < this.player.x + this.randomXNumber) {
            this.x += 1;
        } else {
            this.x -= 1;
        }
        if(this.y < (40 + this.randomYNumber)) {
            this.y += .5;
        }
    }
    Hit() {
        this.player.firedProjectiles.forEach((projectile) => {
            if(
                (projectile.x + projectile.width) >= this.x && 
                projectile.x < (this.x + this.width) &&
                (projectile.y + projectile.height) >= this.y &&
                projectile.y < (this.y + this.height) &&
                projectile.hit === false
                ) {
                    projectile.hit = true;
                    this.health -= (projectile.damage + this.player.damageStat);
                    this.generator.explosionArray.push(new SmallExplosion(projectile.x, projectile.y - (this.height / 2), this.ui));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.generator.finalBossDestroyed = true;
                        this.player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

class LargeEnemy3 {
    constructor(generator, player, userInterface) {
        this.player = player;
        this.generator = generator;
        this.ui = userInterface;
        this.enemyType = 'Large Enemy 3';
        this.health = 100;
        this.width = 66;
        this.height = 66;
        this.x = Math.floor(Math.random() * this.ui.canvas.width);
        this.y = 0 - this.height;
        this.image = new Image(66, 66);
        this.image.src = 'Images/Enemies/largeEnemy3.png';
        this.destroyed = false;
        this.boss = true;
        this.randomXNumber = Math.floor(Math.random() * (this.player.width - this.width));
        this.randomYNumber = Math.floor(Math.random() * 30);
        this.updateXTarget = 0;
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !this.ui.gameMenu.open) {
                this.generator.LaserArray.push(new LargeLaserShot(this.x, this.y + this.height, this.ui));
                this.generator.LaserArray.push(new LargeLaserShot(this.x + this.width, this.y + this.height, this.ui));
            }
        }, 5000);
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.updateXTarget === 30) {
            this.randomXNumber = Math.floor(Math.random() * this.player.width);
            this.updateXTarget = 0;
        } else {
            this.updateXTarget++;
        }
        if(this.x < this.player.x + this.randomXNumber) {
            this.x += 1;
        } else {
            this.x -= 1;
        }
        if(this.y < (40 + this.randomYNumber)) {
            this.y += .5;
        }
    }
    Hit() {
        this.player.firedProjectiles.forEach((projectile) => {
            if(
                (projectile.x + projectile.width) >= this.x && 
                projectile.x < (this.x + this.width) &&
                (projectile.y + projectile.height) >= this.y &&
                projectile.y < (this.y + this.height) &&
                projectile.hit === false
                ) {
                    projectile.hit = true;
                    this.health -= (projectile.damage + this.player.damageStat);
                    this.generator.explosionArray.push(new SmallExplosion(projectile.x, projectile.y - (this.height / 2), this.ui));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.generator.finalBossDestroyed = true;
                        this.player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

export { LargeEnemy1, LargeEnemy2, LargeEnemy3 };
