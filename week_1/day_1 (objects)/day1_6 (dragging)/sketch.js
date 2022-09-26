/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/



let myObjects = [];
let numObjects = 10;

function setup() {
    createCanvas(400, 400);
    colorMode (HSB, 360, 100, 100, 1);
    for (let i = 0; i < numObjects; i++) {
        myObjects[i] = new MyObject ( random (width), random(height) );;
    }
} // end of setup

function draw() {
    background(15);
    for (let i = 0; i < numObjects; i++) {
        myObjects[i].display();
    }
    fill (50);
    noStroke();
    text("frameRate:   " + Math.round(frameRate()), 20, width-20);
    text("click to setup", 20, height-8);
} // end of draw



function mousePressed() {
    for (let i = 0; i < numObjects; i++) {
        myObjects[i].clickOverMe();
    }
}

function mouseDragged() {
    for (let i = 0; i < numObjects; i++) {
        myObjects[i].draggingMe();
    }
}

function mouseReleased(){
    for (let i = 0; i < numObjects; i++) {
        myObjects[i].released();
    }
} // end of mouseReleased