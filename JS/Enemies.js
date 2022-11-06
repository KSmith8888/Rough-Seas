import { ui, player } from './app.js';
import { SmallLaserShot, LargeLaserShot, SmallExplosion} from './Projectiles.js';

class SmallEnemy1 {
    constructor(generator) {
        this.generator = generator;
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
                    this.generator.explosionArray.push(new SmallExplosion(this.x, this.y));
                    player.enemiesDestroyed += 1;
                }
        });
    }
}

class SmallEnemy2 {
    constructor(generator) {
        this.generator = generator;
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
                this.generator.LaserArray.push(new SmallLaserShot(this.x, this.y));
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
                    this.generator.explosionArray.push(new SmallExplosion(this.x, this.y));
                    player.enemiesDestroyed += 1;
                }
        });
    }
}

class SmallEnemy3 {
    constructor(generator) {
        this.generator = generator;
        this.enemyType = 'Small Enemy 3';
        this.width = 26;
        this.height = 34;
        this.x = Math.floor(Math.random() * ui.canvas.width);
        this.y = 0;
        this.image = new Image(26, 34);
        this.image.src = 'Images/Enemies/smallEnemy3.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * 250);
        this.randomYNumber = Math.floor(Math.random() * 300);
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !ui.gameMenu.open) {
                this.generator.LaserArray.push(new SmallLaserShot(this.x, this.y));
            }
        }, 5000);
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        
        if(this.x < player.x + this.randomXNumber) {
            this.x += 2;
        } else {
            this.x -= 2;
        }
        if(this.y < (this.randomYNumber)) {
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
                    this.generator.explosionArray.push(new SmallExplosion(this.x, this.y));
                    player.enemiesDestroyed += 1;
                }
        });
    }
}

class LargeEnemy1 {
    constructor(generator) {
        this.generator = generator;
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
                this.generator.LaserArray.push(new LargeLaserShot(this.x, this.y + (this.height / 2)));
                this.generator.LaserArray.push(new LargeLaserShot(this.x + 45, this.y + (this.height / 2)));
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
                    this.generator.explosionArray.push(new SmallExplosion(this.x, this.y));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.generator.finalBossDestroyed = true;
                        player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

export { SmallEnemy1, SmallEnemy2, SmallEnemy3, LargeEnemy1 };
