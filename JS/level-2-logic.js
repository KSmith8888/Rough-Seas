import { UserInterface, EventListeners } from './user-interface.js';
import { PlayerClass, PlayerHealthBar, WeaponClass } from './player.js';
import { Clouds, OceanSurface } from './background.js';
import { SmallEnemy1, SmallEnemy3, LargeEnemy1 } from './enemies.js';
import { SmallExplosion } from './projectiles.js';

class Tornado {
    constructor(userInterface, water) {
        this.ui = userInterface;
        this.water = water;
        this.width = 100;
        this.height = 130;
        this.x = this.ui.canvas.width;
        this.y = (this.ui.canvas.height - (this.water.height + this.height));
        this.imageArray = ['Images/Tornado/tornadoLarge1.png', 'Images/Tornado/tornadoLarge2.png', 'Images/Tornado/tornadoLarge3.png', 'Images/Tornado/tornadoLarge4.png'];
        this.frame = 0;
        this.image = new Image(this.width, this.height);
        this.image.src = this.imageArray[this.frame];
        this.alternateFrame = false;
        this.reachedMidway = false;
        this.offScreen = false;
    }
    UpdatePosition() {
        if(this.x > (this.ui.canvas.width / 2) && !this.reachedMidway) {
            this.x -= .5;
        } else {
            this.reachedMidway = true;
            this.x += .5;
        }
        if(this.x > this.ui.canvas.width + this.width) {
            this.offScreen = true;
        }
    }
    Draw() {
        if(this.alternateFrame) {
            if(this.frame < (this.imageArray.length - 1)) {
                this.frame++;
            } else {
                this.frame = 0;
            }
            this.alternateFrame = false;
        } else {
            this.alternateFrame = true;
        }
        this.image.src = this.imageArray[this.frame];
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


class Level2EnemyGenerator {
    constructor(player, userInterface, water) {
        this.player = player;
        this.ui = userInterface;
        this.water = water;
        this.EnemyArray = [];
        this.LaserArray = [];
        this.explosionArray = [];
        this.tornadoArray = [];
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
        }, 12000);
        this.addTornado = setInterval(() => {
            if(this.tornadoArray.length < 15 && !this.ui.gameMenu.open) {
                this.tornadoArray.push(new Tornado(this.ui, this.water));
            }
        }, 8000);
    }
    Collision() {
        this.EnemyArray = this.EnemyArray.filter((ship) => {
            if(!ship.destroyed) {
                return ship;
            }
        });
        this.EnemyArray.forEach((ship, index) => {
            if(ship.enemyType === 'Small Enemy 1') {
                if(
                    ship.x >= this.player.x && 
                    ship.x < (this.player.x + this.player.width) &&
                    ship.y > (this.ui.canvas.height - this.player.height)
                    ) {
                        this.player.health -= 20;
                        this.explosionArray.push(new SmallExplosion(ship.x, ship.y, this.ui));
                        this.EnemyArray.splice(index, 1);
                } else if(ship.y === this.ui.canvas.height) {
                    ship.destroyed = true;
                }
            }
        });
        this.LaserArray.forEach((laser, index) => {
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
        this.tornadoArray.forEach((tornado) => {
            if(
                tornado.x >= this.player.x && 
                tornado.x < (this.player.x + this.player.width) 
                ) {
                    this.player.health -= 1;
            }
        });
    }
    CompleteLevel() {
        localStorage.setItem('Game Level', JSON.stringify(3));
        this.ui.missionCompleteMenu.showModal();
        this.ui.damageStat = this.player.damageStat;
        this.ui.armorStat = this.player.healthStat;
    }
    AddFinalBoss() {
        if(this.player.enemiesDestroyed >= 10 && !this.ui.gameMenu.open && this.finalBossReleased === false) {
            this.finalBossReleased = true;
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
    ControlTornados() {
        this.tornadoArray = this.tornadoArray.filter((tornado) => {
            if(!tornado.offScreen) {
                return tornado;
            }
        });
        this.tornadoArray.forEach((tornado) => {
            tornado.UpdatePosition();
            tornado.Draw();
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
        this.level2Generator = new Level2EnemyGenerator(this.player, this.ui, this.water);
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
        game.weapon.DrawWeapon();
        game.player.DrawShip();
        game.level2Generator.ControlEnemies();
        game.level2Generator.ControlTornados();
        game.level2Generator.Collision();
        game.level2Generator.AddFinalBoss();
        game.level2Generator.ControlLasers();
        game.level2Generator.ControlExplosions();
        game.water.ControlWater();
        game.healthBar.Draw();
        game.player.ControlProjectiles();
        game.player.GameOver();
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();
