class UserInterface {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.menuSound = new Audio;
        this.menuSound.src = 'Audio/beep.wav';
        this.menuIcon = document.getElementById('menu-icon');
        this.gameMenu = document.getElementById('game-menu');
        this.closeMenuBtn = document.getElementById('close-menu-button');
        this.exitGameBtn = document.getElementById('exit-game-button');
        this.missionCompleteMenu = document.getElementById('mission-complete-menu');
        this.missionCompleteForm = document.getElementById('mission-complete-form');
    }
}

class EventListeners {
    constructor(player, weapon, userInterface) {
        this.player = player;
        this.weapon = weapon;
        this.ui = userInterface;
        this.keyEvent = document.addEventListener('keydown', (event) => {
            if(event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                this.player.MoveShip(event.code);
            } 
            if(event.code === 'KeyW') {
                this.weapon.FireProjectile();
            } 
            if(event.code === 'KeyA') {
                if(weapon.weaponAngle > 0) {
                    this.weapon.weaponAngle -= 1;
                    this.weapon.cannonImage.src = this.weapon.cannonImageArray[weapon.weaponAngle];
                    this.weapon.machineImage.src = this.weapon.machineImageArray[weapon.weaponAngle];
                    this.weapon.launcherImage.src = this.weapon.launcherImageArray[weapon.weaponAngle];
                }
            } 
            if(event.code === 'KeyD') {
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
        this.openMenu = this.ui.menuIcon.addEventListener('click', () => {
            this.ui.menuSound.play().catch((error) => {console.error(error)});
            this.ui.gameMenu.showModal();
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
