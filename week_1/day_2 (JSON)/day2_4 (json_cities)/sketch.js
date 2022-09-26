/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let mostPopulatedCities;
let backgroundImage;

function preload(){
    mostPopulatedCities = loadJSON ("data/25mostPopulatedCities.json");
    backgroundImage = loadImage ('data/mapaMundi1600x800.png');
}


function setup() {
    createCanvas(1600, 800);
}

function draw() {
    image(backgroundImage, 0, 0);
    noStroke();
    fill (100,100,255, 100); // color de los círculos
    let numOfCities = mostPopulatedCities.cities.length;
    for (let r = 0; r < numOfCities; r++) {
        let lonNow = mostPopulatedCities.cities[r].longitude;
        let latNow = mostPopulatedCities.cities[r].latitude;
        let posX = map (lonNow, -180,180, 0,width );
        let posY = map (latNow, 90,-90, 0,height );

        let pop = map( mostPopulatedCities.cities[r].population, 35000000,500000,  200,5) ;

        ellipse(posX, posY,pop,pop);
    } // end for
    noLoop();
}