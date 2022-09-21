/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/


let countryData;

function preload(){
    countryData = loadTable('data/countries&areas.csv', 'csv', 'header');
}

function setup() {
    createCanvas(400, 400);
    //console.log (countryData);
    let i=0;

    for (let myRow of countryData.rows){
        console.log(i + ": " +myRow.get('CountryName'));
        i++;
    }
}

function draw() {
    background(51);

    fill (200);
    text("frameRate:   " + Math.round(frameRate()), 20, width-20);
}