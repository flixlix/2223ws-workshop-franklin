/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let myObjects = [];
let numObjects = 50;

function setup() {
    createCanvas(400, 400);
    colorMode (HSB, 360, 100, 100);
    for (let i = 0; i < numObjects; i++) {
        myObjects[i] = new MyObject ( random (width), random(height) );;
    }
}

function draw() {
    background(15);
    for (let i = 0; i < numObjects; i++) {
        myObjects[i].display();
    }

    fill (50);
    text("frameRate:   " + Math.round(frameRate()), 20, width-20);
    text("click to setup", 20, height-8);
}

function mouseReleased(){
    setup();
}