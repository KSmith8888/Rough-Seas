class UserInterface {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.controlMode = 'Keyboard';
        this.menuSound = new Audio;
        this.menuSound.src = 'Audio/beep.wav';
        this.bossSound = new Audio;
        this.bossSound.src = 'Audio/boss-sound.wav';
        this.levelMusic = new Audio;
        this.levelMusic.src = 'Audio/level-music.ogg';
        this.allAudio = [this.menuSound, this.levelMusic, this.bossSound];
        this.menuIcon = document.getElementById('menu-icon');
        this.gameMenu = document.getElementById('game-menu');
        this.controlModeBtn = document.getElementById('control-mode-button');
        this.muteButton = document.getElementById('mute-button');
        this.closeMenuBtn = document.getElementById('close-menu-button');
        this.exitGameBtn = document.getElementById('exit-game-button');
        this.missionCompleteMenu = document.getElementById('mission-complete-menu');
        this.missionCompleteForm = document.getElementById('mission-complete-form');
        this.armorStat = document.getElementById('armor-stat');
        this.damageStat = document.getElementById('damage-stat');
    }
}

class EventListeners {
    constructor(player, weapon, userInterface) {
        this.player = player;
        this.weapon = weapon;
        this.ui = userInterface;
        this.keyEvent = document.addEventListener('keydown', (event) => {
            if(event.code === 'KeyA' || event.code === 'KeyD' || event.code === 'KeyW') {
                this.player.MoveShip(event.code);
            } 
            if(event.code === 'ArrowUp') {
                this.weapon.FireProjectile();
            } 
            if(event.code === 'ArrowLeft') {
                if(weapon.weaponAngle > 0) {
                    this.weapon.weaponAngle -= 1;
                    this.weapon.cannonImage.src = this.weapon.cannonImageArray[weapon.weaponAngle];
                    this.weapon.machineImage.src = this.weapon.machineImageArray[weapon.weaponAngle];
                    this.weapon.launcherImage.src = this.weapon.launcherImageArray[weapon.weaponAngle];
                }
            } 
            if(event.code === 'ArrowRight') {
                if(weapon.weaponAngle < (weapon.cannonImageArray.length - 1)) {
                    this.weapon.weaponAngle += 1;
                    this.weapon.cannonImage.src = this.weapon.cannonImageArray[weapon.weaponAngle];
                    this.weapon.machineImage.src = this.weapon.machineImageArray[weapon.weaponAngle];
                    this.weapon.launcherImage.src = this.weapon.launcherImageArray[weapon.weaponAngle];
                }
            } 
            if(event.code === 'KeyM') {
                this.ui.menuSound.play().catch((error) => {console.error(error)});
                this.ui.gameMenu.showModal();
            }
        });
        this.hoverEvent = document.addEventListener('mousemove', (event) => {
            if(this.ui.controlMode === 'Mouse') {
                const playerMidpoint = player.x + (player.width / 2)
                if(event.clientX >= (playerMidpoint - 30) && event.clientX <= (playerMidpoint + 30)) {
                this.weapon.weaponAngle = 2;
                } else if(event.clientX < (playerMidpoint - 30) && event.clientY <= (this.ui.canvas.height - 200)) {
                this.weapon.weaponAngle = 1;
                } else if(event.clientX < (playerMidpoint - 30) && event.clientY > (this.ui.canvas.height - 200)) {
                this.weapon.weaponAngle = 0;
                } else if(event.clientX > (playerMidpoint + 30) && event.clientY <= (this.ui.canvas.height - 200)) {
                this.weapon.weaponAngle = 3;
                } else if(event.clientX > (playerMidpoint + 30) && event.clientY > (this.ui.canvas.height - 200)) {
                this.weapon.weaponAngle = 4;
                }
                this.weapon.cannonImage.src = this.weapon.cannonImageArray[weapon.weaponAngle];
                this.weapon.machineImage.src = this.weapon.machineImageArray[weapon.weaponAngle];
                this.weapon.launcherImage.src = this.weapon.launcherImageArray[weapon.weaponAngle];
            }
        });
        this.clickEvent = document.addEventListener('click', () => {
            if(!this.ui.gameMenu.open && !this.ui.missionCompleteMenu.open && this.ui.controlMode === 'Mouse') {
                this.weapon.FireProjectile();
            }
        });
        this.openMenu = this.ui.menuIcon.addEventListener('click', () => {
            this.ui.menuSound.play().catch((error) => {console.error(error)});
            this.ui.gameMenu.showModal();
        });
        this.changeControlMode = this.ui.controlModeBtn.addEventListener('click', () => {
            if(this.ui.controlMode === 'Keyboard') {
                this.ui.controlMode = 'Mouse';
                this.ui.canvas.style.cursor = 'crosshair';
                this.ui.controlModeBtn.textContent = 'Use keyboard controls';
            } else {
                this.ui.controlMode = 'Keyboard';
                this.ui.controlModeBtn.textContent = 'Use mouse controls';
                this.ui.canvas.style.cursor = 'default';
            }
        })
        this.muteAudio = this.ui.muteButton.addEventListener('click', () => {
            this.ui.allAudio.forEach((audio) => {
                if(!audio.muted) {
                    audio.muted = true;
                    audio.pause();
                    this.ui.muteButton.textContent = 'Unmute Audio';
                } else {
                    audio.muted = false;
                    if(audio === this.ui.levelMusic) {
                        audio.play();
                    }
                    this.ui.muteButton.textContent = 'Mute Audio';
                }
            });
        });
        this.closeMenu = this.ui.closeMenuBtn.addEventListener('click', () => {
            this.ui.gameMenu.close();
        });
        this.exitGame = this.ui.exitGameBtn.addEventListener('click', () => {
            location.href = './index.html';
        });
        this.beginNextMission = this.ui.missionCompleteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if(document.getElementById('selectCannon').checked) {
                localStorage.setItem('Weapon Choice', JSON.stringify('Cannon'));
            } else if(document.getElementById('selectMachine').checked) {
                localStorage.setItem('Weapon Choice', JSON.stringify('Machine'));
            }
            if(document.getElementById('selectLauncher')) {
                if(document.getElementById('selectLauncher').checked) {
                    localStorage.setItem('Weapon Choice', JSON.stringify('Rocket'));
                }
            }
            if(document.getElementById('selectArmor').checked) {
                this.player.healthStat += 10;
                localStorage.setItem('Health Stat', JSON.stringify(this.player.healthStat));
            } else if(document.getElementById('selectDamage').checked) {
                this.player.damageStat += 5;
                localStorage.setItem('Damage Stat', JSON.stringify(this.player.damageStat));
            }
            this.player.StartNextMission();
        });
    }
}

export { UserInterface, EventListeners };
