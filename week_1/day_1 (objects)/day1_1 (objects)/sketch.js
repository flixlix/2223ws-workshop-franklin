/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/


let o1, o2, o3;

function setup() {
    createCanvas(400, 400);
    colorMode (HSB, 360, 100, 100);
    o1 = new MyObject ( random (width), random(height) );
    o2 = new MyObject ( random (width), random(height) );
    o3 = new MyObject ( random (width), random(height) );
}

function draw() {
    background(15);
    o1.display();
    o2.display();
    o3.display();
    fill (50);
    text("frameRate:   " + Math.round(frameRate()), 20, width-20);
    text("click to setup", 20, height-8);
}

function mouseReleased(){
    setup();
}