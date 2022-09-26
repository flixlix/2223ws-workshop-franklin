/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/


let mostPopulatedCities;
let oneData;

function preload(){
    mostPopulatedCities = loadJSON ("data/25mostPopulatedCities.json");
}


function setup() {
    createCanvas(400, 400);
    oneData = mostPopulatedCities.cities[2].population;
}

function draw() {
    background(51);
    fill (200);
    text(oneData, 20, width/2);
}