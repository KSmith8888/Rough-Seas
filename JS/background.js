class Cloud1 {
    constructor(x, y, userInterface) {
        this.width = 174;
        this.height = 157;
        this.x = x;
        this.y = y;
        this.ui = userInterface;
        this.image = new Image(this.width, this.height);
        this.image.src = 'Images/Background/cloud1.png';
        this.offScreen = false;
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x -= .5;
        if((this.x + this.width) < 0) {
            this.offScreen = true;
        }
    }
}

class Cloud2 {
    constructor(x, y, userInterface) {
        this.width = 234;
        this.height = 128;
        this.x = x;
        this.y = y;
        this.ui = userInterface;
        this.image = new Image(this.width, this.height);
        this.image.src = 'Images/Background/cloud2.png';
        this.offScreen = false;
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    UpdatePosition() {
        this.x -= .25;
        if((this.x + this.width) < 0) {
            this.offScreen = true;
        }
    }
}

class Clouds {
    constructor(userInterface) {
        this.ui = userInterface;
        this.cloudArray = [];
        this.addCloud1 = setInterval(() => {
            if(this.cloudArray.length < 12) {
                this.cloudArray.push(new Cloud1(this.ui.canvas.width, Math.floor(Math.random() * 350), this.ui));
            }
        }, 15000);
        this.addCloud2 = setInterval(() => {
            if(this.cloudArray.length < 12) {
                this.cloudArray.push(new Cloud2(this.ui.canvas.width, Math.floor(Math.random() * 250), this.ui));
            }
        }, 20000);
    }
    HandleClouds() {
        this.cloudArray = this.cloudArray.filter((cloud) => {
            if(!cloud.offScreen) {
                return cloud;
            }
        });
    }
    Draw() {
        this.cloudArray.forEach((cloud) => {
            cloud.Draw();
            cloud.UpdatePosition();
        });
    }
    ControlClouds() {
        this.HandleClouds();
        this.Draw();
    }
    AddInitialClouds() {
        this.cloudArray.push(new Cloud1(200, 150, this.ui));
        this.cloudArray.push(new Cloud1(800, 250, this.ui));
        this.cloudArray.push(new Cloud1(600, 75, this.ui));
        this.cloudArray.push(new Cloud2(350, 175, this.ui));
        this.cloudArray.push(new Cloud2(1000, 50, this.ui));
    }
}

class CitySkyline {
    constructor(userInterface) {
        this.ui = userInterface;
        this.image = new Image(528, 314);
        this.image.src = 'Images/Background/citySkyline.png';
        this.x = 0;
        this.width = 528;
        this.height = 314;
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.ui.canvas.height - 275, this.width, this.height);
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
    constructor(userInterface) {
        this.ui = userInterface;
        this.width = this.ui.canvas.width;
        this.height = 27;
        this.x = 0;
        this.y = this.ui.canvas.height - this.height;
        this.image = new Image();
        this.image.src = 'Images/oceanSurface.png';
    }
    Draw() {
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ui.ctx.drawImage(this.image, (this.x + this.width), this.y, this.width, this.height);
    }
    UpdatePosition() {
        if(this.x > (0 - this.ui.canvas.width)) {
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

class Tornado {
    constructor(userInterface, water) {
        this.ui = userInterface;
        this.width = 100;
        this.height = 130;
        this.imageArray = ['Images/Tornado/tornadoLarge1.png', 'Images/Tornado/tornadoLarge2.png', 'Images/Tornado/tornadoLarge3.png', 'Images/Tornado/tornadoLarge4.png'];
        this.frame = 0;
        this.image = new Image(this.width, this.height);
        this.image.src = this.imageArray[this.frame];
        this.alternateFrame = false;
        this.reachedMidway = false;
        this.offScreen = false;
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

class TornadoRight extends Tornado {
    constructor(userInterface, water) {
        super(userInterface, water);
        this.ui = userInterface;
        this.water = water;
        this.x = this.ui.canvas.width;
        this.y = (this.ui.canvas.height - (this.water.height + this.height));
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
}

class TornadoLeft extends Tornado {
    constructor(userInterface, water) {
        super(userInterface, water);
        this.ui = userInterface;
        this.water = water;
        this.x = (0 - this.width);
        this.y = (this.ui.canvas.height - (this.water.height + this.height));
    }
    UpdatePosition() {
        if(this.x < (this.ui.canvas.width / 2) && !this.reachedMidway) {
            this.x += .5;
        } else {
            this.reachedMidway = true;
            this.x -= .5;
        }
        if(this.x < 0 - (this.width * 2)) {
            this.offScreen = true;
        }
    }
}

class Lightning {
    constructor(userInterface, x, y) {
        this.ui = userInterface;
        this.x = x;
        this.y = y;
        this.width = 115;
        this.height = 273;
        this.image = new Image(this.width, this.height);
        this.image.src = 'Images/lightning.png';
        this.activeFrames = 0;
        this.hitPlayer = false;
    }
    Draw() {
        this.activeFrames++;
        this.ui.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export { Clouds, CitySkyline, OceanSurface, Tornado, TornadoRight, TornadoLeft, Lightning };
