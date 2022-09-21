/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/


let mostPopulatedCities;
let population, nameOfCity, nameOfCountry, iso3;

function preload(){
    mostPopulatedCities = loadJSON ("data/25mostPopulatedCities.json");
}


function setup() {
    createCanvas(400, 400);
    let numberOfCity = 10;
    population = mostPopulatedCities.cities[numberOfCity].population;
    nameOfCity = mostPopulatedCities.cities[numberOfCity].city_ascii;
    nameOfCountry = mostPopulatedCities.cities[numberOfCity].country;
    iso3 = mostPopulatedCities.cities[numberOfCity].iso3;
}

function draw() {
    background(51);
    fill (200);
    text(nameOfCity, 20, width/2);
    text(nameOfCountry, 20, width/2+15);
    text("code of country: " + iso3, 20, width/2+30);
    text("population: " + population, 20, width/2+45);
}