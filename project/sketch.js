const backgroundColor = "#0f0326";
let launchDataByCountry;
let colorsOfEachCountry;
let rocketLaunches;
let eventsData;
const minLaunches = 30; /* Minimum number of launches per country to it to be displayed */
const arrayOfCountries = [];
const arrayOfEvents = [];
const arrayOfLegendItems = [];
let currentYear;
let xLine;
let numYears; /* to be reassigned in the beginning of setup */
let yearsDisplayed;
const topY = 250;
let lineMaxX, lineMinX;
let playButton, pauseButton;
let animationState;
let font;
let legendUdSSR, legendUSA, legendChina, legendRussia, legendBrazil, legendAustralia, legendEurope, legendAsia;
let highestValueY;

function preload() {
  font = loadFont('fonts/OpenSans-Regular.ttf');
  launchDataByCountry = loadTable(
    "data/country_launches_by_year.csv",
    "csv",
    "header"
  );
  colorsOfEachCountry = loadTable(
    "data/colors_of_each_country.csv",
    "csv",
    "header"
  );
  rocketLaunches = loadTable("data/rocket_launches.csv", "csv", "header");
  eventsData = loadTable("data/special_events.csv", "csv", "header");
}

/* prepare everything for sketch */

function setup() {
  createCanvas(1400, 900); /* size of canvas in x and y direction */
  textFont(font);
  frameRate(60);
  let currentCountry;
  let currentEvent;
  lineMaxX = (width - 75);
  lineMinX = 75;
  playButton = new Button('play');
  pauseButton = new Button('pause');
  addLegendItems();
  currentYear = 0;
  xLine = height - 100;
  numYears = launchDataByCountry.rows.length; /* 61 */
  yearsDisplayed = 1; /* assign number of points to number of rows in original csv */
  avoidTooManyYearsOnStartup();
  createCountryObjects();
  createDataArrayForEachCountry();
  createEventObjects();
  calculateAllPoints();
}


/* runs 60 times per second */
function draw() {
  background(backgroundColor); /* color of background of canvas */

  /* start animation every frame if animation state is enabled */
  displayAnimation();

  /* show starting and current years at the bottom of the graph */
  displayAxesTitle();

  /* show one point per country per year and connect the points with a line */
  displayLaunches();

  /* show the special events markers in the right fraction of the year */
  displayEvents();

  /* show rectangle on top to hide incoming points */
  displayBlockingRect();
}

function getHighestValueY() {
  let arrayOfMaxes = [];
  for (let year = 0; year < numYears; year++) {
      for (let i = 0; i < arrayOfCountries.length; i++) {
          if (arrayOfCountries[i]._isSelected && arrayOfCountries[i].isAnySelected() || !arrayOfCountries[i].isAnySelected()) {
              arrayOfMaxes.push(Math.max(arrayOfCountries[i]._arrayOfData[year].y))
          } else {
              arrayOfMaxes.push(0)
          }
      }
      highestValueY = Math.max(...arrayOfMaxes);
  }
  console.log(highestValueY)
}

function calculateMaxPointCountry() {
  let arrayOfMaxes = [];
  for (let country = 0; country < arrayOfCountries.length; country++) {
    for (let year = 0; year < yearsDisplayed; year++) {
      arrayOfMaxes.push(arrayOfCountries[country]._arrayOfData[year].y);
    }
    
  }
  let maxxx= Math.max(arrayOfMaxes)
  console.log(maxxx)
}


function displayLaunches() {
  for (let country = 0; country < arrayOfCountries.length; country++) {
    /* call draw function inside each object */
    arrayOfCountries[country].drawNumRocketLaunch();
  }
}

function displayEvents() {
  /* run through events markers */
  for (let event = 0; event < arrayOfEvents.length; event++) {
    /* call draw function inside each object */
    arrayOfEvents[event].drawMarker();
  }
}

function displayAxesTitle() {
  let currentYear = round(yearsDisplayed + 1956, 0);
  push();
  fill(255)
  text("1957", 72, 820)
  textAlign(RIGHT)
  text(currentYear, width - 72, 820)
  pop();
}

function displayAnimation() {
  if (frameCount % 1 === 0 && animationState) {
    /* exponential growth */
    setYearsDisplayed((yearsDisplayed * 1.005) + 0.05)
  }
}

function mouseReleased() {
  for (let event = 0; event < arrayOfEvents.length; event++) {
    arrayOfEvents[event].clickOverMe();
  }

}

function skipBackward() {
  setYearsDisplayed(1)
}

function skipPrevious() {
  setYearsDisplayed(floor(yearsDisplayed) - 1);
}

/* can't have "play" function, leads to a conflict */
function playAnimation() {
  setYearsDisplayed("continue");
  animationState = true;
  playButton.hide();
  pauseButton.show();
}

function pause() {
  animationState = false;
  playButton.show();
  pauseButton.hide();
}

function toggle() {
  if (animationState) {
    pause();
  } else {
    playAnimation();
  }
}

function skipNext() {
  setYearsDisplayed(floor(yearsDisplayed) + 1);
}

function skipForward() {
  setYearsDisplayed("max");
}

/* accept as argument number of years or text (such as max) */
function setYearsDisplayed(years) {

  /* was max number of years asked? */
  /* or */
  /* was the maximum reached? */
  if (years === "max" || years >= launchDataByCountry.rows.length) {

    /* set maximum number of years */
    years = launchDataByCountry.rows.length;

    /* stop animation */
    pause();
  }

  /* did user ask for less than 1 year to be displayed? */
  else if (years < 1) {

    /* force 1 year to be displayed */
    years = 1;
  }

  /* did user ask to continue animation? */
  else if (years === "continue") {

    /* was the maximum number of years reched beforehand? */
    /* or */
    /* is there currently only one year being displayed? */
    if (yearsDisplayed >= launchDataByCountry.rows.length || yearsDisplayed === 1) {

      /* reset number of years to display */
      years = 1;
    }


    /* is the before mentioned not the case? */
    else {

      /* set years to be seen the same value that was already there */
      years = yearsDisplayed;
    }
  }
  /* sync argument that was entered with number of years to be displayed */
  yearsDisplayed = years;

  /* recalculate arrays of points */
  calculateAllPoints();
}

function calculateAllPoints() {
  getHighestValueY();

  /* run through array of countries */
  for (let country = 0; country < arrayOfCountries.length; country++) {

    /* calculate the x-y-position of each country */
    arrayOfCountries[country].calculatePoints(xLine);
  }

  /* run through array of events */
  for (let i = 0; i < arrayOfEvents.length; i++) {

    /* calculate the x-position of each event marker */
    arrayOfEvents[i].calculatePositionX(xLine);
  }
}

/* is any key pressed */
function keyReleased() {

  /* is spacebar pressed? */
  if (keyCode === 32) {
    /* turn animation on if it was off and viceversa */
    toggle();
  }

  /* is pgup button pressed? */
  else if (keyCode === 33) {
    skipBackward();
  }

  /* is pgdn button pressed? */
  else if (keyCode === 34) {
    skipForward();
  }

  /* is right arrow pressed? */
  else if (keyCode === 39) {
    skipNext();
  }

  /* is left arrow pressed? */
  else if (keyCode === 37) {
    skipPrevious();
  }
}
function createEventObjects() {
  for (let i = 0; i < eventsData.rows.length; i++) {
    currentEvent = new Marker();
    currentEvent._name = eventsData.rows[i].obj.Country;
    currentEvent._index = i;
    currentEvent._date = eventsData.rows[i].obj.Date;
    currentEvent._decimalYear = eventsData.rows[i].obj.Position;
    currentEvent._description = eventsData.rows[i].obj.Event;
    currentEvent._crew = eventsData.rows[i].obj.Crew
    currentEvent.calculatePositionX(xLine);
    arrayOfEvents.push(currentEvent)
  }
}

function createDataArrayForEachCountry() {
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
}

function createCountryObjects() {
  /* Run through all columns except first column of header row & Create Country objects */
  for (let currentColumn = 1; currentColumn < launchDataByCountry.getColumnCount(); currentColumn++) {
    currentCountry = new Country();
    currentCountry._name = launchDataByCountry.columns[currentColumn]; /* add name of country to object */
    currentCountry._index = currentColumn;
    arrayOfCountries.push(currentCountry);
  }
  assignColorsToObject();
}

function assignColorsToObject() {
  /* Run through all columns of color csv file and assign that color to country objects */
  for (let currentColumn = 0; currentColumn < colorsOfEachCountry.getColumnCount(); currentColumn++) {
    arrayOfCountries[currentColumn]._color = "#" + colorsOfEachCountry.rows[0].arr[currentColumn]; /* assign color from csv to country object */
  }
}

function avoidTooManyYearsOnStartup() {
  if (yearsDisplayed > launchDataByCountry.rows.length || yearsDisplayed < 1) {
    console.error("You entered too many years, resetting value...")
    yearsDisplayed = launchDataByCountry.rows.length; /* 61 */
  }
}

function addLegendItems() {
  legendRussia = new LegendItem("Russia", "russia");
  /* legendRussia = new LegendItem("Russia", "udssr"); */
  legendUSA = new LegendItem("USA", "usa");
  legendChina = new LegendItem("China", "china");
  legendBrazil = new LegendItem("Brazil", "brazil");
  legendAustralia = new LegendItem("Australia", "australia");
  legendEurope = new LegendItem("Europe", "europe");
  legendAsia = new LegendItem("Asia", "asia");
}

function displayBlockingRect() {
  push();
  noStroke();
  fill(backgroundColor);
  rect(width - 72, 200, 200, 1000);
  pop();
}

/* 
Hochschule für Gestaltung - Schwäbisch Gmünd
Grundlagen im medialen Raum - Projektarbeit
Anton Pelezki 
Carina Senger 
Luca Mário Ziegler Félix  
Tim Niedermeier 
 */
