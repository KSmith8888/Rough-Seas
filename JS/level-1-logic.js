import { UserInterface, EventListeners } from './user-interface.js';
import { PlayerClass, PlayerHealthBar, WeaponClass } from './player.js';
import { Clouds, OceanSurface, CitySkyline } from './background.js';
import { SmallEnemy1, SmallEnemy2, SmallEnemy3 } from './small-enemies.js';
import { LargeEnemy1 } from './large-enemies.js';
import { SmallExplosion } from './projectiles.js';

class Level1EnemyGenerator {
    constructor(player, userInterface) {
        this.player = player;
        this.ui = userInterface;
        this.EnemyArray = [];
        this.LaserArray = [];
        this.explosionArray = [];
        this.finalBossReleased = false;
        this.finalBossDestroyed = false;
        this.addSmallEnemy1 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !this.ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy1(this, this.player, this.ui));
            }
        }, 20000);
        this.addSmallEnemy2 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !this.ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy2(this, this.player, this.ui));
            }
        }, 10000);
        this.addSmallEnemy3 = setInterval(() => {
            if(this.EnemyArray.length < 15 && !this.ui.gameMenu.open) {
                this.EnemyArray.push(new SmallEnemy3(this, this.player, this.ui));
            }
        }, 12000);
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
            if(laser.y >= this.ui.canvas.height) {
                laser.offScreen = true;
            }
        });
    }
    CompleteLevel() {
        localStorage.setItem('Game Level', JSON.stringify(2));
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
            this.ui.bossMusic.volume = 0.2;
            this.ui.bossMusic.play();
            clearInterval(this.addSmallEnemy1);
            clearInterval(this.addSmallEnemy2);
            clearInterval(this.addSmallEnemy3);
            this.EnemyArray.push(new LargeEnemy1(this, this.player, this.ui));
        }
        if(this.finalBossReleased) {
            if(this.finalBossDestroyed) {
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
        });
    }
}

class Game {
    constructor() {
        this.ui = new UserInterface();
        this.player = new PlayerClass(this.ui);
        this.weapon = new WeaponClass(this.player, this.ui);
        this.healthBar = new PlayerHealthBar(this.player, this.ui);
        this.level1Generator = new Level1EnemyGenerator(this.player, this.ui);
        this.events = new EventListeners(this.player, this.weapon, this.ui);
        this.cloudGenerator = new Clouds(this.ui);
        this.skyline = new CitySkyline(this.ui);
        this.water = new OceanSurface(this.ui);
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
        game.cloudGenerator.ControlClouds();
        game.skyline.ControlSkyline();
        game.weapon.DrawWeapon();
        game.player.DrawShip();
        game.level1Generator.ControlEnemies();
        game.level1Generator.Collision();
        game.level1Generator.AddFinalBoss();
        game.level1Generator.ControlLasers();
        game.level1Generator.ControlExplosions();
        game.water.ControlWater();
        game.healthBar.Draw();
        game.player.ControlProjectiles();
        game.player.GameOver();
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();
