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
            if(this.cloudArray.length < 12) {
                this.cloudArray.push(new Cloud1(ui.canvas.width, Math.floor(Math.random() * 350)));
            }
        }, 15000);
        this.addCloud2 = setInterval(() => {
            if(this.cloudArray.length < 12) {
                this.cloudArray.push(new Cloud2(ui.canvas.width, Math.floor(Math.random() * 250)));
            }
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
        this.cloudArray.push(new Cloud1(200, 150));
        this.cloudArray.push(new Cloud1(800, 250));
        this.cloudArray.push(new Cloud1(600, 75));
        this.cloudArray.push(new Cloud2(350, 175));
        this.cloudArray.push(new Cloud2(1000, 50));
    }
}

class CitySkyline {
    constructor() {
        this.image = new Image(528, 314);
        this.image.src = 'Images/Background/citySkyline.png';
        this.x = 0;
        this.width = 528;
        this.height = 314;
    }
    Draw() {
        ui.ctx.drawImage(this.image, this.x, ui.canvas.height - 275, this.width, this.height);
    }
    UpdatePosition() {
        this.x -= .05;
    }
    ControlSkyline() {
        if((this.x + this.width) > 0) {
            this.Draw();
            this.UpdatePosition();
        }
    }
}

class OceanSurface {
    constructor() {
        this.width = ui.canvas.width;
        this.height = 27;
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
    ControlWater() {
        this.Draw();
        this.UpdatePosition();
    }
}

const cloudGenerator = new Clouds;
cloudGenerator.AddInitialClouds();
const skyline = new CitySkyline;

export { cloudGenerator, OceanSurface, skyline };
