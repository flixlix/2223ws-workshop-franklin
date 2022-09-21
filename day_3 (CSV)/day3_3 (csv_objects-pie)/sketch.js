/*
created by franklin hernandez-castro, www.skizata.com
tec costa rica, hfg sch.gmünd
2019
 */

let countryData;
let myCountries = [];

let numContries = 0;
let maxArea = 17098250; // [17098250,50]
let minArea = 10000;
let totalArea = 0;

function preload(){
    countryData = loadTable('data/countries&areas.csv', 'csv', 'header');
}

function setup() {
    createCanvas(1400, 800);
    colorMode (HSB, 360, 100, 100);
    strokeCap(SQUARE);
    for (let myRow of countryData.rows){
        let nowArea = int (myRow.get('sqr_Km'));
        if (nowArea>minArea)totalArea += nowArea;
    }
    console.log("totalArea: " + totalArea);

    let i=0;
    let nowAngle = 0;
    for (let myRow of countryData.rows){
        let nowArea = myRow.get('sqr_Km');
        if (nowArea > minArea){
            let angleOfCountry = map(nowArea, 0, totalArea, 0, TWO_PI);
            let currentCountry = new CountryArc (500, nowAngle, nowAngle+angleOfCountry);
            nowAngle+=angleOfCountry;
            currentCountry.myCountryArea = myRow.get('sqr_Km');
            currentCountry.myCountry = myRow.get('Country_Name');
            currentCountry.myCountryISO = myRow.get('ISO_A3');
            if ( currentCountry.myCountryISO === "DEU" ||currentCountry.myCountryISO === "CRI")
                currentCountry.myColor = color(200,100,100);
            myCountries [i] = currentCountry;
            i++;
        }
    }
    numContries = i;
    console.log("number of countries: " + numContries);
    console.log("minimal area in countries: " + minArea);
    console.log("maximal area in countries: " + maxArea);
}

function draw() {
    background(25);

    let currentX = width/2;
    let currentY = height/2;

    for (let i = 0; i < myCountries.length; i++) {
        myCountries [i].display (currentX, currentY);
        //console.log("i: " + i +"   x: " + currentX +"   y: " + currentY);
    }
    //console.log("  ");


    //oneArc.display(700,400);

    fill (200);
    textSize(18);
    text ("countries by area", 10, 30);
    textSize(10);
    text("franklin hernandez-castro | hfg 2022 fhc", 10, height-20);

    //noLoop();
}