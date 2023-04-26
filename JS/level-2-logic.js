import { UserInterface, EventListeners } from "./user-interface.js";
import { PlayerClass, PlayerHealthBar, WeaponClass } from "./player.js";
import {
    Clouds,
    OceanSurface,
    Tornado,
    TornadoRight,
    TornadoLeft,
} from "./background.js";
import { SmallEnemy1, SmallEnemy3, SmallEnemy4 } from "./small-enemies.js";
import { LargeEnemy2 } from "./large-enemies.js";
import { SmallExplosion, LargeExplosion } from "./projectiles.js";

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
        this.smallEnemy4Tutorial = false;
        this.tornadoTutorial = false;
        this.addSmallEnemy1 = setInterval(() => {
            if (
                this.EnemyArray.length < 15 &&
                !this.ui.gameMenu.open &&
                !this.ui.tutorialModal.open
            ) {
                this.EnemyArray.push(
                    new SmallEnemy1(this, this.player, this.ui)
                );
            }
        }, 13000);
        this.addSmallEnemy3 = setInterval(() => {
            if (
                this.EnemyArray.length < 15 &&
                !this.ui.gameMenu.open &&
                !this.ui.tutorialModal.open
            ) {
                this.EnemyArray.push(
                    new SmallEnemy3(this, this.player, this.ui)
                );
            }
        }, 20000);
        this.addSmallEnemy4 = setInterval(() => {
            if (
                this.EnemyArray.length < 15 &&
                !this.ui.gameMenu.open &&
                !this.ui.tutorialModal.open
            ) {
                this.EnemyArray.push(
                    new SmallEnemy4(this, this.player, this.ui)
                );
                if (!this.smallEnemy4Tutorial) {
                    this.ui.DisplayTutorial(
                        "Watch out for SmallEnemy4. They move fast and will explode on impact causing significant damage. Anything caught in the explosion will be damaged.",
                        {
                            src: "Images/Enemies/smallEnemy4.png",
                            alt: "A grey robotic flying enemy with a red orb in the center",
                            width: 24,
                            height: 20,
                        }
                    );
                    this.smallEnemy4Tutorial = true;
                }
            }
        }, 10000);
        this.addTornado = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 10);
            if (
                this.tornadoArray.length < 15 &&
                !this.ui.gameMenu.open &&
                !this.ui.tutorialModal.open
            ) {
                if (randomNum > 5) {
                    this.tornadoArray.push(
                        new TornadoRight(this.ui, this.water)
                    );
                } else {
                    this.tornadoArray.push(
                        new TornadoLeft(this.ui, this.water)
                    );
                }
                if (!this.tornadoTutorial) {
                    this.ui.DisplayTutorial(
                        "Tornados will periodically appear from either side, don't let them near you or they will cause massive damage."
                    );
                    this.tornadoTutorial = true;
                }
            }
        }, 28000);
    }
    Collision() {
        this.EnemyArray = this.EnemyArray.filter((ship) => {
            if (!ship.destroyed) {
                return ship;
            }
        });
        this.EnemyArray.forEach((ship) => {
            if (ship.enemyType === "Small Enemy 1") {
                if (
                    ship.x >= this.player.x &&
                    ship.x < this.player.x + this.player.width &&
                    ship.y > this.ui.canvas.height - this.player.height
                ) {
                    this.player.health -= 20;
                    this.explosionArray.push(
                        new SmallExplosion(ship.x, ship.y, this.ui)
                    );
                    ship.destroyed = true;
                } else if (ship.y === this.ui.canvas.height) {
                    ship.destroyed = true;
                }
            }
            if (ship.enemyType === "Small Enemy 4") {
                if (
                    ship.x >= this.player.x &&
                    ship.x < this.player.x + this.player.width &&
                    ship.y > this.ui.canvas.height - this.player.height
                ) {
                    this.explosionArray.push(
                        new LargeExplosion(
                            ship.x,
                            ship.y,
                            this.ui,
                            this.player,
                            this
                        )
                    );
                    ship.destroyed = true;
                } else if (ship.y === this.ui.canvas.height) {
                    ship.destroyed = true;
                }
            }
        });
        this.LaserArray.forEach((laser) => {
            if (
                laser.x >= this.player.x &&
                laser.x < this.player.x + this.player.width &&
                laser.y > this.ui.canvas.height - this.player.height
            ) {
                this.player.health -= laser.damage;
                this.explosionArray.push(
                    new SmallExplosion(laser.x, laser.y, this.ui)
                );
                laser.offScreen = true;
            }
            if (laser.y >= canvas.height) {
                laser.offScreen = true;
            }
        });
        this.tornadoArray.forEach((tornado) => {
            if (
                tornado.x + tornado.width >= this.player.x &&
                tornado.x < this.player.x + this.player.width
            ) {
                this.player.health -= 1;
            }
        });
    }
    CompleteLevel() {
        localStorage.setItem("Game Level", JSON.stringify(3));
        setTimeout(() => {
            if (!this.ui.missionCompleteMenu.open) {
                this.ui.missionCompleteMenu.showModal();
                this.ui.damageStat = this.player.damageStat;
                this.ui.armorStat = this.player.healthStat;
            }
        }, 500);
    }
    AddFinalBoss() {
        if (
            this.player.enemiesDestroyed >= 10 &&
            !this.ui.gameMenu.open &&
            this.finalBossReleased === false
        ) {
            this.finalBossReleased = true;
            this.ui.levelMusic.pause();
            this.ui.bossSound.volume = 0.2;
            this.ui.bossSound
                .play()
                .then(() => {
                    setTimeout(() => {
                        this.ui.bossSound.pause();
                        this.ui.levelMusic.play();
                    }, 2500);
                })
                .catch((err) => {
                    console.error(err);
                });
            clearInterval(this.addSmallEnemy1);
            clearInterval(this.addSmallEnemy2);
            clearInterval(this.addSmallEnemy3);
            clearInterval(this.addSmallEnemy4);
            this.EnemyArray.push(new LargeEnemy2(this, this.player, this.ui));
        }
        if (this.finalBossReleased) {
            if (this.finalBossDestroyed && !this.ui.missionCompleteMenu.open) {
                this.ui.levelMusic.pause();
                localStorage.setItem(
                    "Level-Music",
                    JSON.stringify("Audio/level-3-music.ogg")
                );
                this.CompleteLevel();
            }
        }
    }
    ControlEnemies() {
        this.EnemyArray = this.EnemyArray.filter((enemy) => {
            if (!enemy.destroyed) {
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
            if (!laser.offScreen) {
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
            if (explosion.activeFrames < 15) {
                return explosion;
            }
        });
        this.explosionArray.forEach((explosion) => {
            explosion.Draw();
            if (explosion.impactDamage) {
                explosion.Collision();
            }
        });
    }
    ControlTornados() {
        this.tornadoArray = this.tornadoArray.filter((tornado) => {
            if (!tornado.offScreen) {
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
        this.level2Generator = new Level2EnemyGenerator(
            this.player,
            this.ui,
            this.water
        );
    }
    LoadSaveData() {
        if (localStorage.getItem("Health Stat") !== null) {
            this.player.healthStat = JSON.parse(
                localStorage.getItem("Health Stat")
            );
            this.player.health = this.player.healthStat;
        }
        if (localStorage.getItem("Damage Stat") !== null) {
            this.player.damageStat = JSON.parse(
                localStorage.getItem("Damage Stat")
            );
        }
        if (localStorage.getItem("Weapon Choice") !== null) {
            this.player.weaponChoice = JSON.parse(
                localStorage.getItem("Weapon Choice")
            );
        }
        if (localStorage.getItem("Audio-Setting") !== null) {
            if (JSON.parse(localStorage.getItem("Audio-Setting")) === "Muted") {
                this.events.MuteAudio();
                this.ui.muteAllAudio = true;
            }
        }
        if (localStorage.getItem("Control-Setting") !== null) {
            if (
                JSON.parse(localStorage.getItem("Control-Setting")) === "Mouse"
            ) {
                this.events.ChangeControlMode();
                this.ui.controlMode = "Mouse";
            }
        }
        if (localStorage.getItem("Tutorial-Setting") !== null) {
            if (
                JSON.parse(localStorage.getItem("Tutorial-Setting")) ===
                "Disabled"
            ) {
                this.events.ToggleTutorials();
                this.ui.turnOffTutorials = true;
            }
        }
        this.ui.levelMusic.volume = 0.1;
        this.ui.levelMusic.loop = true;
        this.ui.levelMusic.play().catch((err) => {
            console.error(err);
        });
        this.ui.canvas.style.background =
            "linear-gradient(#1c1c1c, hsl(240, 70%, 10%, 95%))";
    }
}

const game = new Game();
game.LoadSaveData();
game.cloudGenerator.AddInitialClouds();

function animationLoop() {
    if (
        !game.ui.gameMenu.open &&
        !game.ui.missionCompleteMenu.open &&
        !game.ui.tutorialModal.open
    ) {
        game.ui.ctx.clearRect(
            0,
            0,
            game.ui.canvas.width,
            game.ui.canvas.height
        );
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
