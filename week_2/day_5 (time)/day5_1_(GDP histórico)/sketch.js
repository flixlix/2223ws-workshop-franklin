let GDP_data;
let myFont;
let arrayOfCountries = [];
let baseLine = 0;
//let selectedCurrencies = ['AFG', 'ARE', 'ARG', 'AUS', 'AUT', 'BEL', 'BGD', 'BGR', 'BHR', 'BIH', 'BLR', 'BMU', 'BOL', 'BRA', 'BRB', 'CAF', 'CAN', 'CHE', 'CHI', 'CHL', 'CHN', 'COD', 'COL', 'CRI', 'CUB', 'CYP', 'CZE', 'DEU', 'DMA', 'DNK', 'DOM', 'ECU', 'EGY', 'ESP', 'EST', 'ETH', 'EUU', 'FIN', 'FRA', 'GBR', 'GEO', 'GHA', 'GIN', 'GRC', 'GRD', 'GRL', 'GTM', 'HKG', 'HND', 'HRV', 'HTI', 'HUN', 'IND', 'IRL', 'IRN', 'IRQ', 'ISL', 'ISR', 'ITA', 'JAM', 'JOR', 'JPN', 'KAZ', 'KEN', 'KHM', 'KOR', 'KWT', 'LBN', 'LBR', 'LCN', 'LIE', 'LTU', 'LUX', 'MAC', 'MAR', 'MCO', 'MEX', 'MLT', 'MMR', 'MNE', 'MNG', 'MRT', 'MUS', 'MYS', 'NGA', 'NIC', 'NLD', 'NOR', 'NPL', 'NZL', 'OMN',  'PAK', 'PAN', 'PER', 'PHL',  'POL', 'PRI', 'PRT', 'PRY', 'QAT', 'ROU', 'RUS', 'RWA', 'SAU', 'SDN', 'SEN', 'SGP', 'SLE', 'SLV', 'SMR', 'SOM', 'SRB', 'SSD', 'SUR', 'SVK', 'SVN', 'SWE', 'SYR', 'THA', 'TJK', 'TKM', 'TTO', 'TUN', 'TZA', 'UGA', 'UKR', 'URY', 'USA', 'VEN', 'VNM', 'XKX', 'YEM', 'ZAF', 'ZMB', 'ZWE'];
let selectedCurrencies = ['BRA',  'CAN', 'CHN', 'DEU', 'EUU', 'FRA', 'GBR',  'ITA', 'JPN', 'MEX', 'RUS', 'USA', 'CHL','IND','LCN' ];

// --------------------------------------------------------  PRELOAD  ----------------------------------------------------
function preload(){
    GDP_data = loadTable('data/GPD historico 2.csv', 'csv', 'header'); // CountryName,ISO_A3,sqrKm,population,gdpPc,gdp
    myFont = loadFont('assets/Roboto-Medium.ttf');
}// -------------------------------------------------------  PRELOAD  ----------------------------------------------------



// --------------------------------------------------------  SET UP ----------------------------------------------------
function setup() {
    createCanvas(1600, 1200);
    // para verificar que los datos hayan subido bien -------------------------
    console.log(' total rows in GDP_data: ' + GDP_data.getRowCount() ); // 266
    console.log(' total columns in GDP_data: ' + GDP_data.getColumnCount() ); // 64
    console.log(' number of selected countries: ' + selectedCurrencies.length ); // 217

    baseLine = height-50;
    textFont(myFont);

    //crea y llena los datos de los objetos país --------------------------
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
    console.log('cantidad de países: ' + arrayOfCountries.length ); // 217

    // save the years data in each country object
    foundCountries = 0;
    for (let r = 0; r < GDP_data.getRowCount(); r++) { // runs through the whole table
        let currentCountryCODE = GDP_data.getString(r, 1);
        if (isThere(currentCountryCODE)){
            for (let country = 0; country < arrayOfCountries.length; country++){ // runs through the whole object list
                if(arrayOfCountries[country].myCode === currentCountryCODE){
                    foundCountries++;
                    let index = 2; // before we have: Country Name & Country Code

                    for (let year = 1960; year < 2022; year++) {
                        let currentGDP = GDP_data.getString(r, index);
                        let currentPaar = createVector (year,currentGDP); // small array with [year,GDP]
                        arrayOfCountries[country].arrayOfData.push(currentPaar);
                        index++;
                    }
                }
            }
        }
    }
    console.log(' number of found countries: ' + foundCountries );

    for (let country = 0; country < arrayOfCountries.length; country++) { // countries
        //calculates the pixel position of each year in the country
        arrayOfCountries[country].calculatePoints(baseLine);
    }
}// --------------------------------------------------------  SET UP ----------------------------------------------------







// -----------------------------------------------------------  DRAW  ----------------------------------------------------
function draw() {
    background(51);
    for (let country = 0; country < arrayOfCountries.length; country++) { // countries
        arrayOfCountries[country].drawCountryGDP(baseLine);
    }

    noStroke();
    fill(200);
    textSize(18);
    text("Gross Domestic Product (GDP)", 20, 30);
    text("1960-2017", 20, 50);

    fill(200);
    textSize(12);
    text(frameRate().toFixed(2), 20, height-30);
}// -----------------------------------------------------------  DRAW  ----------------------------------------------------


function mouseReleased() {
    for (let country = 0; country < arrayOfCountries.length; country++) { // countries
        arrayOfCountries[country].clickOverMe();
    }
}


function isThere (candidate) {
    let answer = false;
    for (let i = 0; i < selectedCurrencies.length; i++) {
        if (selectedCurrencies[i] === candidate) answer = true;
    }
    return (answer);
}

