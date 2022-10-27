import { ui, player } from './app.js';

class SmallEnemy1 {
    constructor() {
        this.width = 28;
        this.height = 28;
        this.x = Math.floor(Math.random() * ui.canvas.width);
        this.y = 200;
        this.image = new Image(28, 28);
        this.image.src = 'Images/Enemies/smallEnemy1.png';
        this.destroyed = false;
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.y < ui.canvas.height) {
            this.y += 2;
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
                }
        });
    }
}

class EnemyGenerator {
    constructor() {
        this.SmallEnemy1Array = [];
        this.addSmallEnemy1 = setInterval(() => {
            this.SmallEnemy1Array.push(new SmallEnemy1);
        }, 10000);
    }
    Collision() {
        this.SmallEnemy1Array.forEach((ship, index) => {
            if(
                ship.x >= player.x && 
                ship.x < (player.x + player.width) &&
                ship.y > (ui.canvas.height - player.height)
                ) {
                    player.health -= 20;
                    this.SmallEnemy1Array.splice(index, 1);
            } else if(ship.y === ui.canvas.height) {
                this.SmallEnemy1Array.splice(index, 1);
            } else if(ship.destroyed === true) {
                this.SmallEnemy1Array.splice(index, 1);
            }
        });
    }
}

const generator = new EnemyGenerator;

export { SmallEnemy1, generator };
