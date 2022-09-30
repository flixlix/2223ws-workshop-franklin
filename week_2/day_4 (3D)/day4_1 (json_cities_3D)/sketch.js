/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

let mostPopulatedCities;
let backgroundImage;
let myCities = [];
let numOfCities;

function preload(){
    //mostPopulatedCities = loadJSON ("data/25mostPopulatedCities.json");
    mostPopulatedCities = loadJSON ("data/25mostPopulatedCitiesTemp.json");
    backgroundImage = loadImage ('imgs/earth.jpg');
}


function setup() {
    createCanvas(1600, 800, WEBGL);
    setAttributes('antialias', true);
    easycam = new Dw.EasyCam(this._renderer, {distance : 1000});

    numOfCities = mostPopulatedCities.cities.length;
    for (let r = 0; r < numOfCities; r++) {
        let currentCountry = new Cities();
        currentCountry.myLongitude = mostPopulatedCities.cities[r].longitude;
        currentCountry.myLatitude = mostPopulatedCities.cities[r].latitude;
        currentCountry.myX = -width/2 + map (currentCountry.myLongitude, -180,180, 0,width );
        currentCountry.myY = -height/2 + map (currentCountry.myLatitude, 90,-90, 0,height );
        currentCountry.mySizeCold = map( mostPopulatedCities.cities[r].coldest, 70,-70, 350,-350);
        currentCountry.mySizeHot = map( mostPopulatedCities.cities[r].hottest, 70,-70, 350,-350);
        currentCountry.myPopulation = mostPopulatedCities.cities[r].population;
        currentCountry.myName = mostPopulatedCities.cities[r].city_ascii;
        currentCountry.myCountry = mostPopulatedCities.cities[r].country;
        currentCountry.myCountryISO = mostPopulatedCities.cities[r].iso3;
        myCities [r] = currentCountry;
    } // end for
}

function draw() {
    background(51);
    // projection
    perspective(1 * PI/180, width/height, 1, 5000);

    // background Image
    fill(100);
    texture(backgroundImage);
    plane(1600, 800); // texture

    // city bars
    for (let i = 0; i < numOfCities; i++) {
        myCities[i].display();
    }
}