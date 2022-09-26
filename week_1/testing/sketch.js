/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

let mySlider;
let myDualSlider;
let myButton;

function setup() {
    createCanvas(800, 400);
    myButton = new Button(390,80, 20, "title");
    mySlider = new Slider(200, 180, 400, 20, 0, 255, 127, "color");
    myDualSlider = new DualSlider(150, 300, 500, 10, 0,100,"percentage");
    console.log(mySlider.myValue);
}

function draw() {
    background(51);

    mySlider.render();
    myButton.display();

    myDualSlider.render(mouseX, mouseY);
    myDualSlider.overMe(mouseX, mouseY);
}

function mousePressed() {
    mySlider.mouseClickMe();
}

function mouseReleased(){
    mySlider.mouseReleasedMe();
    myDualSlider.mouseReleasedMe(mouseX, mouseY);
    myButton.releasedOverMe(mySlider.myValue);
    myButton.myColor = color(155, mySlider.myValue.toFixed(0),155,(myDualSlider.myRIGHTvalue - myDualSlider.myLEFTvalue) * 2.55);
}

function mouseDragged() {
    mySlider.mouseDraggingMe();
    myDualSlider.mouseCheckMe(mouseX, mouseY);
}