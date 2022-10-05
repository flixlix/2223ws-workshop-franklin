let launchDataByCountry;
let colorsOfEachCountry;
let rocketLaunches;
const minLaunches = 30; /* Minimum number of launches per country to it to be displayed */
const arrayOfCountries = [];
let currentYear;
let xLine;
let numYears; /* to be reassigned in the beginning of setup */
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

function preload() {
  launchDataByCountry = loadTable(
    "data/launches_by_year.csv",
    "csv",
    "header"
  );
  colorsOfEachCountry = loadTable(
    "data/colors_of_each_country.csv",
    "csv",
    "header"
  );
  rocketLaunches = loadTable("data/rocket_launches.csv", "csv", "header");
}

function setup() {
  createCanvas(vw, vh); /* size of canvas in x and y direction */
  frameRate(10)
  let currentCountry;
  currentYear = 0;
  xLine = height - 100;
  numYears = launchDataByCountry.rows.length; /* assign number of points to number of rows in original csv */

  /* Run through all columns except first column of header row & Create Country objects */
  for (let currentColumn = 1; currentColumn < launchDataByCountry.getColumnCount(); currentColumn++) {
    currentCountry = new Country();
    currentCountry._name = launchDataByCountry.columns[currentColumn]; /* add name of country to object */
    currentCountry._index = currentColumn;
    arrayOfCountries.push(currentCountry);
  }

  /* Run through all columns of color csv file and assign that color to country objects */
  for (let currentColumn = 0; currentColumn < colorsOfEachCountry.getColumnCount(); currentColumn++) {
    arrayOfCountries[currentColumn]._color = "#" + colorsOfEachCountry.rows[0].arr[currentColumn]; /* assign color from csv to country object */
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

}

function draw() {

  background("#0c164f"); /* color of background of canvas */
  fill(255);
  textSize(30);
  text("Rocket launches throughout history", 50, 50)
  textSize(15);
  text("First Launch date: " + launchDataByCountry.rows[0].obj.date, 50, 75);
  for (let country = 0; country < arrayOfCountries.length; country++) { // countries
    arrayOfCountries[country].drawNumRocketLaunch(xLine);
  }
  
  let lineMaxX = arrayOfCountries[arrayOfCountries.length - 1]._arrayOfPoints[arrayOfCountries[arrayOfCountries.length - 1]._arrayOfPoints.length - 1].x;
  let myYear = 1969.5;
  let lineX = map(myYear, 1957, 2022, 75, lineMaxX);

  line(lineX, xLine, lineX, 100)
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
