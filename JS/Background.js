import { ui } from './app.js';

class Cloud1 {
    constructor(x, y) {
        this.width = 174;
        this.height = 157;
        this.x = x;
        this.y = y;
        this.image = new Image(this.width, this.height);
        this.image.src = 'Images/Background/cloud1.png';
        this.offScreen = false;
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x -= .5;
        if((this.x + this.width) < 0) {
            this.offScreen = true;
        }
    }
}

class Cloud2 {
    constructor(x, y) {
        this.width = 234;
        this.height = 128;
        this.x = x;
        this.y = y;
        this.image = new Image(this.width, this.height);
        this.image.src = 'Images/Background/cloud2.png';
        this.offScreen = false;
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x -= .25;
        if((this.x + this.width) < 0) {
            this.offScreen = true;
        }
    }
}

class Clouds {
    constructor() {
        this.cloudArray = [];
        this.addCloud1 = setInterval(() => {
            this.cloudArray.push(new Cloud1(ui.canvas.width, Math.floor(Math.random() * ui.canvas.height) - 250));
        }, 15000);
        this.addCloud1 = setInterval(() => {
            this.cloudArray.push(new Cloud1(ui.canvas.width, Math.floor(Math.random() * ui.canvas.height) - 350));
        }, 20000);
    }
    DrawClouds() {
        this.cloudArray.forEach((cloud, index) => {
            if(!cloud.offScreen) {
                cloud.Draw();
                cloud.UpdatePosition();
            } else {
                this.cloudArray.splice(index, 1);
            }
        });
    }
    AddInitialClouds() {
        this.cloudArray.push(new Cloud1(100, 150));
        this.cloudArray.push(new Cloud1(700, 350));
        this.cloudArray.push(new Cloud1(500, 225));
        this.cloudArray.push(new Cloud2(400, 50));
        this.cloudArray.push(new Cloud2(900, 200));
    }
}

class OceanSurface {
    constructor() {
        this.width = ui.canvas.width;
        this.height = 23;
        this.x = 0;
        this.y = ui.canvas.height - this.height;
        this.image = new Image();
        this.image.src = 'Images/oceanSurface.png';
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ui.ctx.drawImage(this.image, (this.x + this.width), this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.x > (0 - ui.canvas.width)) {
            this.x -= 1;
        }else {
            this.x = 0;
        }
    }
}

const cloudGenerator = new Clouds;
cloudGenerator.AddInitialClouds();

export { cloudGenerator, OceanSurface };
