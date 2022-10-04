let launchDataByCountry;
let rocketLaunches;
const minLaunches = 30; /* Minimum number of launches per country to it to be displayed */
const arrayOfCountries = [];
let currentYear;
let xLine;
const numYears = 5567;

function preload() {
  launchDataByCountry = loadTable(
    "data/launches_by_country.csv",
    "csv",
    "header"
  );
  rocketLaunches = loadTable("data/rocket_launches.csv", "csv", "header");
}

function setup() {
  createCanvas(1200, 800); /* size of canvas in x and y direction */
  let currentCountry;
  currentYear = 0;
  xLine = height - 100;

  /* Run through all columns except first column of header row & Create Country object */
  for (let currentColumn = 1; currentColumn < launchDataByCountry.getColumnCount(); currentColumn++) {
    currentCountry = new Country();
    currentCountry._name = launchDataByCountry.columns[currentColumn]; /* add name of country to object */
    currentCountry._index = currentColumn;
    arrayOfCountries.push(currentCountry);
  }

  /* add new value to array of data to each country */
  for (let currentRow = 0; currentRow < launchDataByCountry.getRowCount(); currentRow++) {
    let _date = launchDataByCountry.rows[currentRow].arr[0]; /* get date of current row */

    /* run through all columns in current row */
    for (let currentColumn = 1; currentColumn < launchDataByCountry.getColumnCount(); currentColumn++) {
      let _rocket_launches = launchDataByCountry.rows[currentRow].arr[currentColumn]; /* get number of rocket launches on current cell */
      let _vector = createVector(_date, _rocket_launches); /* create a vector with current date and current number of rocket launches */

      /* index gets subtracted by 1, because of the date column */
      arrayOfCountries[currentColumn - 1]._arrayOfData.push(_vector); /* assign vector to countries array of data */
    }
  }

  for (let country = 0; country < arrayOfCountries.length; country++) { // countries
    //calculates the pixel position of each year in the country
    arrayOfCountries[country].calculatePoints(xLine);
  }

  console.log(arrayOfCountries)
}

function draw() {
  background("#0c164f"); /* color of background of canvas */
  fill(255);
  textSize(30);
  text("First Launch date: " + launchDataByCountry.rows[0].obj.date, 50, 50);
  for (let country = 0; country < arrayOfCountries.length; country++) { // countries
    arrayOfCountries[country].drawNumRocketLaunch(xLine);
  }
}


function mouseReleased() {
  for (let country = 0; country < arrayOfCountries.length; country++) { // countries
      arrayOfCountries[country].clickOverMe();
  }

}
/* 
Hochschule für Gestaltung - Schwäbisch Gmünd
Grundlagen im medialen Raum - Projektarbeit
Anton Pelezki 
Carina Senger 
Luca Mário Ziegler Félix  
Tim Niedermeier 


                             ___-------___
                         _-~~             ~~-_
                      _-~                    /~-_
   /^\__/^\         /~  \                   /    \
 /|  O|| O|        /      \_______________/        \
| |___||__|      /       /                \          \
|          \    /      /                    \          \
|   (_______) /______/                        \_________ \
|         / /         \                      /            \
 \         \^\\         \                  /               \     /
   \         ||           \______________/      _-_       //\__//
     \       ||------_-~~-_ ------------- \ --/~   ~\    || __/
       ~-----||====/~     |==================|       |/~~~~~
        (_(__/  ./     /                    \_\      \.
               (_(___/                         \_____)_)
*/
