import { SmallLaserShot, SmallExplosion, LargeExplosion} from './projectiles.js';

class SmallEnemy1 {
    constructor(generator, player, userInterface) {
        this.player = player;
        this.generator = generator;
        this.ui = userInterface;
        this.enemyType = 'Small Enemy 1';
        this.health = 30;
        this.width = 28;
        this.height = 28;
        this.x = Math.floor(Math.random() * this.ui.canvas.width);
        this.y = 0;
        this.image = new Image(28, 28);
        this.image.src = 'Images/Enemies/smallEnemy1.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * this.player.width);
        this.updateXTarget = 0;
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.updateXTarget === 15) {
            this.randomXNumber = Math.floor(Math.random() * this.player.width);
            this.updateXTarget = 0;
        } else {
            this.updateXTarget++;
        }
        if(this.y < this.ui.canvas.height) {
            this.y += 2;
            if(this.x < (this.player.x + this.randomXNumber)) {
                this.x += 1;
            } else {
                this.x -= 1;
            }
            
        } else {
            this.y = this.ui.canvas.height;
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
                    this.generator.explosionArray.push(new SmallExplosion(this.x, this.y, this.ui));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

class SmallEnemy2 {
    constructor(generator, player, userInterface) {
        this.player = player;
        this.generator = generator;
        this.ui = userInterface;
        this.enemyType = 'Small Enemy 2';
        this.health = 25;
        this.width = 22;
        this.height = 32;
        this.x = Math.floor(Math.random() * this.ui.canvas.width);
        this.y = 0;
        this.image = new Image(22, 32);
        this.image.src = 'Images/Enemies/smallEnemy2.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * this.player.width);
        this.randomYNumber = Math.floor(Math.random() * 30);
        this.updateXTarget = 0;
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !this.ui.gameMenu.open) {
                this.generator.LaserArray.push(new SmallLaserShot(this.x, this.y, this.ui));
            }
        }, 5000);
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.updateXTarget === 15) {
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
            this.y += 2;
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
                    this.generator.explosionArray.push(new SmallExplosion(this.x, this.y, this.ui));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

class SmallEnemy3 {
    constructor(generator, player, userInterface) {
        this.player = player;
        this.generator = generator;
        this.ui = userInterface;
        this.enemyType = 'Small Enemy 3';
        this.health = 20;
        this.width = 26;
        this.height = 34;
        this.x = Math.floor(Math.random() * this.ui.canvas.width);
        this.y = 0;
        this.image = new Image(26, 34);
        this.image.src = 'Images/Enemies/smallEnemy3.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * this.player.width);
        this.randomYNumber = Math.floor(Math.random() * 300);
        this.updateXTarget = 0;
        this.fireLaser = setInterval(() => {
            if(!this.destroyed && !this.ui.gameMenu.open) {
                this.generator.LaserArray.push(new SmallLaserShot(this.x, this.y, this.ui, this.player, this.generator));
            }
        }, 5000);
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        //Periodically change the X coord position that the enemy is trying to get to above the player
        if(this.updateXTarget === 15) {
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
        if(this.y < (this.randomYNumber)) {
            this.y += 2;
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
                    this.generator.explosionArray.push(new SmallExplosion(this.x, this.y, this.ui));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

class SmallEnemy4 {
    constructor(generator, player, userInterface) {
        this.player = player;
        this.generator = generator;
        this.ui = userInterface;
        this.enemyType = 'Small Enemy 4';
        this.health = 5;
        this.width = 24;
        this.height = 20;
        this.x = Math.floor(Math.random() * this.ui.canvas.width);
        this.y = 0;
        this.image = new Image(24, 20);
        this.image.src = 'Images/Enemies/smallEnemy4.png';
        this.destroyed = false;
        this.randomXNumber = Math.floor(Math.random() * this.player.width);
        this.updateXTarget = 0;
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.updateXTarget === 15) {
            this.randomXNumber = Math.floor(Math.random() * this.player.width);
            this.updateXTarget = 0;
        } else {
            this.updateXTarget++;
        }
        if(this.y < this.ui.canvas.height) {
            this.y += 2;
            if(this.x < (this.player.x + this.randomXNumber)) {
                this.x += 2;
            } else {
                this.x -= 2;
            }
            
        } else {
            this.y = this.ui.canvas.height;
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
                    this.generator.explosionArray.push(new LargeExplosion(this.x, this.y, this.ui, this.player, this.generator));
                    if(this.health <= 0) {
                        this.destroyed = true;
                        this.player.enemiesDestroyed += 1;
                    }
                }
        });
    }
}

export { SmallEnemy1, SmallEnemy2, SmallEnemy3, SmallEnemy4 };
