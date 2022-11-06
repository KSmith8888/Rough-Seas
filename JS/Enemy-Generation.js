import { ui, player } from './app.js';
import { SmallEnemy1, SmallEnemy2, SmallEnemy3, LargeEnemy1 } from './Enemies.js';
import { SmallExplosion } from './Projectiles.js';

class Level1EnemyGenerator {
    constructor() {
        this.EnemyArray = [];
        this.LaserArray = [];
        this.explosionArray = [];
        this.finalBossReleased = false;
        this.finalBossDestroyed = false;
        this.addSmallEnemy1 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy1(this));
            }
        }, 20000);
        this.addSmallEnemy2 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy2(this));
            }
        }, 10000);
        this.addSmallEnemy3 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy3(this));
            }
        }, 12000);
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
            if(ship.enemyType === 'Small Enemy 3') {
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
            this.EnemyArray.push(new LargeEnemy1(this));
        }
        if(this.finalBossReleased) {
            if(this.finalBossDestroyed) {
                
            }
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

const level1Generator = new Level1EnemyGenerator();

export { level1Generator };
