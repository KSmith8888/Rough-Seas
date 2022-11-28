import { UserInterface, EventListeners } from './user-interface.js';
import { PlayerClass, PlayerHealthBar, WeaponClass } from './player.js';
import { Clouds, OceanSurface, Lightning } from './background.js';
import { SmallEnemy1, SmallEnemy3, SmallEnemy4 } from './small-enemies.js';
import { LargeEnemy2 } from './large-enemies.js';
import { SmallExplosion, LargeExplosion } from './projectiles.js';

class Level3EnemyGenerator {
    constructor(player, userInterface, water, cloudGenerator) {
        this.player = player;
        this.ui = userInterface;
        this.water = water;
        this.cloudGenerator = cloudGenerator;
        this.EnemyArray = [];
        this.LaserArray = [];
        this.explosionArray = [];
        this.lightningArray = [];
        this.finalBossReleased = false;
        this.finalBossDestroyed = false;
        this.addSmallEnemy1 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !this.ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy1(this, this.player, this.ui));
            }
        }, 20000);
        this.addSmallEnemy3 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !this.ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy3(this, this.player, this.ui));
            }
        }, 10000);
        this.addSmallEnemy4 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !this.ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy4(this, this.player, this.ui));
            }
        }, 12000);
        this.addLightning = setInterval(() => {
            const randomCloud = Math.floor(Math.random() * this.cloudGenerator.cloudArray.length)
            const boltX = this.cloudGenerator.cloudArray[randomCloud].x + (this.cloudGenerator.cloudArray[randomCloud].width / 4);
            const boltY = this.cloudGenerator.cloudArray[randomCloud].y + (this.cloudGenerator.cloudArray[randomCloud].height - 25);
            this.lightningArray.push(new Lightning(this.ui, boltX, boltY));
        }, 8000);
    }
    Collision() {
        this.EnemyArray = this.EnemyArray.filter((ship) => {
            if(!ship.destroyed) {
                return ship;
            }
        });
        this.EnemyArray.forEach((ship) => {
            if(ship.enemyType === 'Small Enemy 1') {
                if(
                    ship.x >= this.player.x && 
                    ship.x < (this.player.x + this.player.width) &&
                    ship.y > (this.ui.canvas.height - this.player.height)
                    ) {
                        this.player.health -= 20;
                        this.explosionArray.push(new SmallExplosion(ship.x, ship.y, this.ui));
                        ship.destroyed = true;
                } else if(ship.y === this.ui.canvas.height) {
                    ship.destroyed = true;
                }
            }
            if(ship.enemyType === 'Small Enemy 4') {
                if(
                    ship.x >= this.player.x && 
                    ship.x < (this.player.x + this.player.width) &&
                    ship.y > (this.ui.canvas.height - this.player.height)
                    ) {
                        this.explosionArray.push(new LargeExplosion(ship.x, ship.y, this.ui, this.player, this));
                        ship.destroyed = true;
                } else if(ship.y === this.ui.canvas.height) {
                    ship.destroyed = true;
                }
            }
        });
        this.LaserArray.forEach((laser) => {
            if(
                laser.x >= this.player.x && 
                laser.x < (this.player.x + this.player.width) &&
                laser.y > (this.ui.canvas.height - this.player.height)
                ) {
                    this.player.health -= laser.damage;
                    this.explosionArray.push(new SmallExplosion(laser.x, laser.y, this.ui));
                    laser.offScreen = true;
            }
            if(laser.y >= canvas.height) {
                laser.offScreen = true;
            }
        });
        this.lightningArray.forEach((bolt) => {
            if(
                bolt.x >= this.player.x &&
                bolt.x < (this.player.x + this.player.width) &&
                bolt.y + bolt.height >= this.player.y &&
                bolt.hitPlayer === false
            ) {
                this.player.health -= 20;
                bolt.hitPlayer = true;
            }
        })
    }
    CompleteLevel() {
        localStorage.setItem('Game Level', JSON.stringify(4));
        setTimeout(() => {
            if(!this.ui.missionCompleteMenu.open) {
                this.ui.missionCompleteMenu.showModal();
                this.ui.damageStat = this.player.damageStat;
                this.ui.armorStat = this.player.healthStat;
            }
        }, 500);
    }
    AddFinalBoss() {
        if(this.player.enemiesDestroyed >= 10 && !this.ui.gameMenu.open && this.finalBossReleased === false) {
            this.finalBossReleased = true;
            clearInterval(this.addSmallEnemy1);
            clearInterval(this.addSmallEnemy2);
            clearInterval(this.addSmallEnemy3);
            clearInterval(this.addSmallEnemy4);
            this.EnemyArray.push(new LargeEnemy2(this, this.player, this.ui));
        }
        if(this.finalBossReleased) {
            if(this.finalBossDestroyed && !this.ui.missionCompleteMenu.open) {
                this.CompleteLevel();
            }
        }
    }
    ControlEnemies() {
        this.EnemyArray = this.EnemyArray.filter((enemy) => {
            if(!enemy.destroyed) {
                return enemy;
            }
        });
        this.EnemyArray.forEach((ship) => {
            ship.Draw();
            ship.UpdatePosition();
            ship.Hit();
        });
    }
    ControlLasers() {
        this.LaserArray = this.LaserArray.filter((laser) => {
            if(!laser.offScreen) {
                return laser;
            }
        });
        this.LaserArray.forEach((laser) => {
            laser.Draw();
            laser.UpdatePosition();
        });
    }
    ControlExplosions() {
        this.explosionArray = this.explosionArray.filter((explosion) => {
            if(explosion.activeFrames < 10) {
                return explosion;
            }
        });
        this.explosionArray.forEach((explosion) => {
            explosion.Draw();
            if(explosion.impactDamage) {
                explosion.Collision();
            }
        });
    }
    ControlLightning() {
        this.lightningArray = this.lightningArray.filter((bolt) => {
            if(bolt.activeFrames < 15) {
                return bolt;
            }
        });
        this.lightningArray.forEach((bolt) => {
            bolt.Draw();
        });
    }
}

class Game {
    constructor() {
        this.ui = new UserInterface();
        this.player = new PlayerClass(this.ui);
        this.weapon = new WeaponClass(this.player, this.ui);
        this.healthBar = new PlayerHealthBar(this.player, this.ui);
        this.events = new EventListeners(this.player, this.weapon, this.ui);
        this.cloudGenerator = new Clouds(this.ui);
        this.water = new OceanSurface(this.ui);
        this.level3Generator = new Level3EnemyGenerator(this.player, this.ui, this.water, this.cloudGenerator);
    }
    LoadSaveData() {
        if(localStorage.getItem('Health Stat') !== null) {
            this.player.healthStat = JSON.parse(localStorage.getItem('Health Stat'));
            this.player.health = this.player.healthStat;
        }
        if(localStorage.getItem('Damage Stat') !== null) {
            this.player.damageStat = JSON.parse(localStorage.getItem('Damage Stat'));
        }
        if(localStorage.getItem('Weapon Choice') !== null) {
            this.player.weaponChoice = JSON.parse(localStorage.getItem('Weapon Choice'));
        }
    }
}

const game = new Game();
game.LoadSaveData();
game.cloudGenerator.AddInitialClouds();

function animationLoop() {
    if(!game.ui.gameMenu.open && !game.ui.missionCompleteMenu.open) {
        game.ui.ctx.clearRect(0, 0, game.ui.canvas.width, game.ui.canvas.height);
        game.level3Generator.ControlLightning();
        game.cloudGenerator.ControlClouds();
        game.weapon.DrawWeapon();
        game.player.DrawShip();
        game.level3Generator.ControlEnemies();
        game.level3Generator.Collision();
        game.level3Generator.AddFinalBoss();
        game.level3Generator.ControlLasers();
        game.level3Generator.ControlExplosions();
        game.water.ControlWater();
        game.healthBar.Draw();
        game.player.ControlProjectiles();
        game.player.GameOver();
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();
