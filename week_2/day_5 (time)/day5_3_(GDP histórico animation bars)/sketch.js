/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
 */

let GDP_data;
let myFont;
let arrayOfCountries = [];
let selectedCountries = ['BEL',  'CRI', 'CZE', 'DEU', 'EUU', 'FRA', 'GBR',  'ITA', 'JPN', 'MEX', 'RUS', 'USA', 'NAC','IND','LCN', '' ];
let currentYear;
let myPlayButton, myRewindButton;

// --------------------------------------------------------  PRELOAD  ----------------------------------------------------
function preload(){
    //GDP_data = loadTable('data/GPD historical2021.csv', 'csv', 'header'); // CountryName,ISO_A3,sqrKm,population,gdpPc,gdp
    GDP_data = loadTable('data/suicide.csv', 'csv', 'header'); // CountryName,ISO_A3,sqrKm,population,gdpPc,gdp
    myFont = loadFont('assets/Roboto-Medium.ttf');
}// -------------------------------------------------------  PRELOAD  ----------------------------------------------------


// --------------------------------------------------------  SET UP ----------------------------------------------------
function setup() {
    createCanvas(1600, 1200);
    textFont(myFont);
    // to check loaded files -------------------------
    console.log(' total rows in GDP_data: ' + GDP_data.getRowCount() ); // 266
    console.log(' total columns in GDP_data: ' + GDP_data.getColumnCount() ); // 64
    console.log(' number of selected countries: ' + selectedCountries.length ); // 217

    //create and fill data in country objects --------------------------
    let currentCountry;
    for (let r = 0; r < GDP_data.getRowCount(); r++) {
        let currentCountryCODE = GDP_data.getString(r, 1);
        if (isThere(currentCountryCODE)){
            let currentCountryNAME = GDP_data.getString(r, 0);
            currentCountry = new Country();
            currentCountry.myName = currentCountryNAME;
            currentCountry.myCode = currentCountryCODE;
            arrayOfCountries.push(currentCountry);
        }
    } // end for  tablaDeAreas --------------------------------------------------
    console.log('number of country objects: ' + arrayOfCountries.length );

    // save the years data in each country object
    foundCountries = 0;
    for (let r = 0; r < GDP_data.getRowCount(); r++) { // runs through the whole table
        let currentCountryCODE = GDP_data.getString(r, 1);
        if (isThere(currentCountryCODE)){
            for (let country = 0; country < arrayOfCountries.length; country++){ // runs through the whole object list
                if(arrayOfCountries[country].myCode === currentCountryCODE){
                    foundCountries++;
                    let index = 2; // before we have: Country Name & Country Code
                    for (let year = 2000; year < 2020; year++) {
                        let currentGDP = GDP_data.getString(r, index);
                        let currentPaar = createVector (year,currentGDP); // small array with [year,GDP]
                        arrayOfCountries[country].arrayOfData.push(currentPaar);
                        index++;
                    }
                }
            }
        }
    }
    console.log('number of found countries: ' + foundCountries );

    currentYear = 0;
    myPlayButton = new Button (100, 80, 20, ">");
    myRewindButton = new Button (50, 80, 20, "<<");
}// --------------------------------------------------------  SET UP ----------------------------------------------------







// -----------------------------------------------------------  DRAW  ----------------------------------------------------
function draw() {
    background(51);

    let yNow = 150;
    for (let country = 0; country < arrayOfCountries.length; country++) { // countries
        // year ∈ [0, 61] -> [1960, 2021]
        arrayOfCountries[country].displayBar(currentYear, 50, yNow);
        yNow += 40;
    }

    if (myPlayButton.selected && frameCount % 5 === 0) {
        if(currentYear < 61) currentYear++;
        else {
            currentYear=61;
            myPlayButton.selected = false;
        }
    }

    if (myRewindButton.selected) {
            currentYear=0;
            myRewindButton.selected = false;
    }

    myPlayButton.display();
    myRewindButton.display();

    textAlign(LEFT);
    fill(200);
    noStroke();
    textSize(18);
    text("Suicide rate per 100k citizens ", 50, 40);
    text("2000-2020", 50, 60);
    textSize(40);
    text(arrayOfCountries[0].arrayOfData[currentYear].x, 150, 105);
    
}// -----------------------------------------------------------  DRAW  ----------------------------------------------------





// -----------------------------------------------------------  EVENTS  ----------------------------------------------------
function mouseReleased() {
    myPlayButton.releasedOverMe();
    myRewindButton.releasedOverMe();
}



// -----------------------------------------------------------  miscellaneous  ----------------------------------------------------

function isThere (candidate) {
    let answer = false;
    for (let i = 0; i < selectedCountries.length; i++) {
        if (selectedCountries[i] === candidate) answer = true;
    }
    return (answer);
}