/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let mostPopulatedCities;

function preload(){
    mostPopulatedCities = loadJSON ("data/25mostPopulatedCities.json");
}


function setup() {
    createCanvas(400, 400);
    console.log (mostPopulatedCities);
}

function draw() {
    background(51);

    
    fill (200);
    text("frameRate:   " + Math.round(frameRate()), 20, width-20);
}