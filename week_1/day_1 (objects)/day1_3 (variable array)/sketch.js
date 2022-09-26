/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let myObjects;
let numObjects;

function setup() {
    createCanvas(400, 400);
    colorMode (HSB, 360, 100, 100);
    myObjects = [];
    numObjects = 0;
}

function draw() {
    background(15);
    for (let i = 0; i < myObjects.length; i++) {
        myObjects[i].display();
    }
    fill (50);
    text("frameRate:   " + Math.round(frameRate()), 20, width-20);
    text("click to setup", 20, height-8);
}

function mouseReleased(){
    setup();
}

// Add a new boid into the System
function mouseMoved() {
    myObjects[numObjects] = new MyObject ( mouseX, mouseY );
    numObjects++;
}