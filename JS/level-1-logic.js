import { ui, EventListeners } from './user-interface.js';
import { PlayerClass, PlayerHealthBar, WeaponClass } from './player.js';
import { cloudGenerator, water, skyline } from './background.js';
import { SmallEnemy1, SmallEnemy2, SmallEnemy3, LargeEnemy1 } from './enemies.js';
import { SmallExplosion } from './projectiles.js';

class Level1EnemyGenerator {
    constructor(player) {
        this.player = player;
        this.EnemyArray = [];
        this.LaserArray = [];
        this.explosionArray = [];
        this.finalBossReleased = false;
        this.finalBossDestroyed = false;
        this.addSmallEnemy1 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy1(this, this.player));
            }
        }, 20000);
        this.addSmallEnemy2 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy2(this, this.player));
            }
        }, 10000);
        this.addSmallEnemy3 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy3(this, this.player));
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
    CompleteLevel() {
        localStorage.setItem('Game Level', JSON.stringify(2));
        ui.missionCompleteMenu.showModal();
    }
    AddFinalBoss() {
        if(player.enemiesDestroyed >= 10 && !ui.gameMenu.open && this.finalBossReleased === false) {
            this.finalBossReleased = true;
            clearInterval(this.addSmallEnemy1);
            clearInterval(this.addSmallEnemy2);
            clearInterval(this.addSmallEnemy3);
            this.EnemyArray.push(new LargeEnemy1(this, this.player));
        }
        if(this.finalBossReleased) {
            if(this.finalBossDestroyed) {
                this.CompleteLevel();
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

const player = new PlayerClass(ui);
player.LoadSaveData();
const weapon = new WeaponClass(player);
const healthBar = new PlayerHealthBar(player);
const level1Generator = new Level1EnemyGenerator(player);
const events = new EventListeners(player, weapon);

function animationLoop() {
    if(!ui.gameMenu.open && !ui.missionCompleteMenu.open) {
        ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
        cloudGenerator.DrawClouds();
        skyline.ControlSkyline();
        weapon.DrawWeapon();
        player.DrawShip();
        level1Generator.ControlEnemies();
        level1Generator.Collision();
        level1Generator.AddFinalBoss();
        level1Generator.ControlLasers();
        level1Generator.ControlExplosions();
        water.ControlWater();
        healthBar.Draw();
        player.ControlProjectiles();
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();
