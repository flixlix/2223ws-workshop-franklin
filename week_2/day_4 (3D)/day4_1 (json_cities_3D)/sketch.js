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
    mostPopulatedCities = loadJSON ("data/1kmostPopulatedCities.json");
    backgroundImage = loadImage ('data/mapaMundi1800x600.png');
}


function setup() {
    createCanvas(1600, 800, WEBGL);
    setAttributes('antialias', true);
    easycam = new Dw.EasyCam(this._renderer, {distance : 600});

    numOfCities = mostPopulatedCities.cities.length;
    for (let r = 0; r < numOfCities; r++) {
        let currentCountry = new Cities();
        currentCountry.myLongitude = mostPopulatedCities.cities[r].longitude;
        currentCountry.myLatitude = mostPopulatedCities.cities[r].latitude;
        currentCountry.myX = -width/2 + map (currentCountry.myLongitude, -180,180, 0,width );
        currentCountry.myY = -height/2 + map (currentCountry.myLatitude, 90,-90, 0,height );
        currentCountry.mySize = map( mostPopulatedCities.cities[r].population, 35000000,500000, 300,5) ;
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
    perspective(60 * PI/180, width/height, 1, 5000);

    // background Image
    fill(100);
    texture(backgroundImage);
    plane(1600, 800); // texture

    // city bars
    for (let i = 0; i < numOfCities; i++) {
        myCities[i].display();
    }
}