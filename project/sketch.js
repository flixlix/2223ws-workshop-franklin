const backgroundColor = "#0f0326";
let sumOfSums;
let launchDataByCountry;
let sumOfLaunchDataByCountry;
let colorsOfEachCountry;
let rocketLaunches;
let eventsData;
const minLaunches = 30; /* Minimum number of launches per country to it to be displayed */
const arrayOfCountries = [];
const arrayOfEvents = [];
const arrayOfLegendItems = [];
let arrayOfWidths = [];
let arrayOfSums
let currentYear;
let xLine;
let numYears; /* to be reassigned in the beginning of setup */
let yearsDisplayed;
const topY = 250;
const radiusRect = 3;
let lineMaxX, lineMinX;
let playButton, pauseButton;
let animationState = false;
let font;
let legendUdSSR, legendUSA, legendChina, legendRussia, legendBrazil, legendAustralia, legendEurope, legendAsia;
let highestValueY;
let thisCountryHighestValue;
let arrayOfDataPoints = [];
let autoScale = false;
let eventsContainer;
let imageEventElement;
let starsElement;
let rocketELement;
let flyAway;

function preload() {
  font = loadFont('fonts/OpenSans-Regular.ttf');
  launchDataByCountry = loadTable(
    "data/country_launches_by_year.csv",
    "csv",
    "header"
  );
  sumOfLaunchDataByCountry = loadTable(
    "data/sum_of_country_launches_by_month.csv",
    "csv",
    "header"
  )
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
  smooth();
  pixelDensity(2.0)
  frameRate(30);
  let currentEvent;
  lineMaxX = (width - 75);
  lineMinX = 75;
  playButton = new Button('play');
  pauseButton = new Button('pause');
  autoScaleButton = new Button('auto-scale');
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
  getHtmlElements();
}

function getHtmlElements() {
  eventsContainer = document.getElementById('event-container');
  imageEventElement = document.getElementById('image-event-element');
  starsElement = document.getElementById('stars-element');
  rocketELement = document.getElementById('rocket-element');
  flyAway = false;
}


/* runs 60 times per second */
function draw() {
  background(backgroundColor); /* color of background of canvas */

  hideAnimationsAfterStartup();

  /* start animation every frame if animation state is enabled */
  displayAnimation();

  /* show starting and current years at the bottom of the graph */
  displayAxesTitle();

  /* draw rectangles and their sizes */
  displayBoxDiagram();

  /* show one point per country per year and connect the points with a line */
  displayLaunches();

  /* show the special events markers in the right fraction of the year */
  displayEvents();

  /* show the value of the currently hovered ellipse */
  displayCountryValues();

  /* show rectangle to cover other elements */
  displayBlockingRect();
}

function hideAnimationsAfterStartup() {
  if (yearsDisplayed > 1) {
    starsElement.style.opacity = 0;
    if (!flyAway) {
      rocketELement.style.animationIterationCount = 1;
      rocketELement.style.animationName = "flyaway";
      rocketELement.style.animationTimingFunction = "cubic-bezier(.5,0,.81,.8)";
      rocketELement.style.animationDuration = "1.2s";
    }
    flyAway = true;
  }


}

function displayBoxDiagram() {

  /* reset array of sums */
  arrayOfSums = [];
  arrayOfSums = calculateArrayOfSums(arrayOfSums);
  sumOfSums = getSumOfAllSums(arrayOfSums);

  /* reset array of widths */
  arrayOfWidths = [];
  mapValuesWidth(arrayOfSums, sumOfSums, arrayOfWidths);
  drawRects(arrayOfWidths);
}

function drawRects() {
  if (yearsDisplayed <= 1) {
    return;
  }
  push();
  let positionX = 500;
  noStroke();
  calculateRects(positionX);
  pop();
  /* draw axes titles for boxes */
  displayAxesBoxes();

}

function calculateRects(positionX) {
  for (let countryIndex = 0; countryIndex < arrayOfCountries.length; countryIndex++) {
    push();
    arrayOfCountries[countryIndex].setColorAlpha(40);
    fill(arrayOfCountries[countryIndex]._color)
    strokeWeight(3);
    stroke(backgroundColor);
    let positionY = 90;
    let heightY = 100;
    let widthRect = arrayOfWidths[countryIndex]
    let middleX = positionX + widthRect / 2;
    /* if (!arrayOfCountries[0].isAnySelected() && mouseIsOverEachCountry(positionX, positionY, widthRect, heightY) || arrayOfCountries[0].isAnySelected() && arrayOfCountries[0].whichIsSelected().includes(countryIndex)) { */
    if (mouseIsOverEachCountry(positionX, positionY, widthRect, heightY)) {
      displayAxisTextEachCountry(middleX, positionY, heightY, countryIndex);
    }
    rect(positionX, positionY, arrayOfWidths[countryIndex], heightY, radiusRect);
    if (arrayOfWidths[countryIndex] > 3) {
      push();
      noFill();
      strokeWeight(2);
      arrayOfCountries[countryIndex].setColorAlpha("ff");
      stroke(arrayOfCountries[countryIndex]._color);
      rect(positionX + 2, positionY + 2, arrayOfWidths[countryIndex] - 4, heightY - 4, radiusRect-2);
      positionX += arrayOfWidths[countryIndex];
      pop();
    }
    pop();
  }
}


function displayAxisTextEachCountry(middleX, positionY, heightY, countryIndex) {
  push();
  stroke("#fff");
  strokeWeight(1);
  noFill();
  line(middleX, positionY + heightY + 5, middleX, positionY + heightY + 15);
  pop();
  push();
  fill(255);
  textAlign(CENTER, TOP);
  noStroke();
  let thisValue = nfc(arrayOfSums[countryIndex], 0).replaceAll(',', '.');
  text(arrayOfCountries[countryIndex]._name, middleX, positionY + heightY + 18);
  text(thisValue, middleX, positionY + heightY + 32);
  pop();
}

function mouseIsOverEachCountry(positionX, positionY, width, height) {
  let isOver = false;
  let strokeWidth = 2;
  let startX = positionX + strokeWidth;
  let startY = positionY + strokeWidth;
  let endX = positionX + width - strokeWidth;
  let endY = positionY + height - strokeWidth;
  if (mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
    isOver = true;
  }
  return isOver;
}

function mapValuesWidth(inputArray, sumOfInputArray, outputArray) {
  for (let countryIndex = 0; countryIndex < arrayOfCountries.length; countryIndex++) {
    let mappedValue = 0;
    mappedValue = map(inputArray[countryIndex], 0, sumOfInputArray, 0, 400);
    if (isNaN(mappedValue)) {
      mappedValue = 0;
    }
    outputArray.push(mappedValue);
  }
  return outputArray;
}

function calculateArrayOfSums(inputArray) {
  for (let countryIndex = 0; countryIndex < arrayOfCountries.length; countryIndex++) {
    let lastSum = 0;
    for (let dateIndex = 0; dateIndex < sumOfLaunchDataByCountry.rows.length; dateIndex++) {
      if (arrayOfCountries[countryIndex]._arrayOfSum[dateIndex].x <= yearsDisplayed + 1957) {
        lastSum = parseInt(arrayOfCountries[countryIndex]._arrayOfSum[dateIndex].y)
      }
    }
    inputArray.push(lastSum);
  }
  return inputArray;
}

function getSumOfAllSums(inputArr) {
  /* sum all elements inside array of sums and give that value to sumOfCountriesSums */
  return inputArr.reduce((a, b) => a + b, 0);
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
    if (autoScale) {
      highestValueY = Math.max(...arrayOfMaxes);
    } else {
      highestValueY = 108;
    }
  }
}

function calculateMaxPointCountry() {
  let arrayOfMaxes = [];
  for (let country = 0; country < arrayOfCountries.length; country++) {
    for (let year = 0; year < yearsDisplayed; year++) {
      arrayOfMaxes.push(arrayOfCountries[country]._arrayOfData[year].y);
    }

  }
  let maxxx = Math.max(arrayOfMaxes)
}


function displayLaunches() {
  for (let country = 0; country < arrayOfCountries.length; country++) {
    /* call draw function inside each object */
    arrayOfCountries[country].drawNumRocketLaunch();
  }
}

function displayCountryValues() {
  for (let country = 0; country < arrayOfCountries.length; country++) {
    /* call draw function inside each object */
    if (arrayOfCountries[country]._isSelected) {
      arrayOfCountries[country].is_overMe()
    }
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

  /* xaxis label text from first year to currently displayed last year  */
  push();
  fill(255);
  textSize(18);
  textAlign(CENTER, TOP);
  noStroke();
  text("1957", 75, xLine + 25)
  text(currentYear, width - 75, xLine + 25);
  pop();

  /* yaxis label from 0 rockets to maximum number of rockets */
  push();
  textSize(18);
  fill(255);
  textAlign(RIGHT, CENTER)
  text(highestValueY, 43, topY - 3);
  text("0", 43, xLine - 3);
  pop();

  /* multiple lines to set the bounds */
  push();

  /* slightly transparent white, last two digits define alpha channel of color */
  let legendColor = "#ffffff40";
  stroke(legendColor);
  strokeWeight(1);

  /* ----------------------- START BOUNDS LINES ----------------------- */
  /* xaxis lines */

  /* - left line */
  line(75, xLine + 10, 75, xLine + 20);

  /* - right line */
  line(width - 75, xLine + 10, width - 75, xLine + 20);

  /* yaxis lines */

  /* - top line */
  line(55, topY, 65, topY);

  /* - bottom line */
  line(55, xLine, 65, xLine);

  /* ----------------------- END BOUNDS LINES ----------------------- */

  /* ----------------------- START CONNECTIONS LINES ----------------------- */

  /* yaxis lines */

  /* - bottom line */
  line(60, xLine - 1, 60, topY + (xLine - topY) / 2 + 80);

  /* - top line */
  line(60, topY + 1, 60, topY + (xLine - topY) / 2 - 80);

  /* xaxis lines */

  /* - left line */
  line(75 + 1, xLine + 15, width / 2 - 33, xLine + 15);

  /* - right line */
  line(width / 2 + 33, xLine + 15, width - 76, xLine + 15);

  /* ----------------------- END CONNECTIONS LINES ----------------------- */
  pop();

  /* yaxis lengend on the right text for number of rockets */
  push();
  textSize(14);
  const angle = radians(270);
  textAlign(CENTER, CENTER);
  translate(57, topY + (xLine - topY) / 2);
  rotate(angle);
  fill(legendColor);
  text("number of rockets", 0, 0 /* topY + xLine / 2 */)
  pop();

  /* xaxis lengend on the bottom text for years */
  push();
  textSize(14);
  fill(legendColor);
  textAlign(CENTER, CENTER);
  text("years", width / 2, xLine + 12 /* topY + xLine / 2 */);
  pop();
}

function displayAxesBoxes() {
  const topY = 75;
  const heightY = 10;
  const widthX = 400;
  const middleX = width / 2; /* 700px */
  const leftX = middleX - widthX / 2;
  const rightX = middleX + widthX / 2;
  const distanceBetweenLines = 66;
  push();
  let legendColor = "#ffffff40";
  stroke(legendColor);
  noFill();
  strokeWeight(1);
  line(leftX, topY - heightY / 2, leftX, topY + heightY / 2);
  line(rightX, topY - heightY / 2, rightX, topY + heightY / 2);
  line(leftX + 1, topY, middleX - distanceBetweenLines / 2, topY);
  line(middleX + distanceBetweenLines / 2, topY, rightX - 1, topY);
  pop();
  push();
  fill(legendColor);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(nfc(sumOfSums, 0).replaceAll(',', '.'), middleX, topY - 3);
  pop();
}

function displayAnimation() {
  if (frameCount % 1 === 0 && animationState) {
    /* exponential growth */
    setYearsDisplayed((yearsDisplayed * 1.001) + 0.1)
  }
}

function mouseReleased() {
  for (let event = 0; event < arrayOfEvents.length; event++) {
    arrayOfEvents[event].clickOverMe();
  }

}

function toggleAutoScale() {
  autoScale = !autoScale;
  calculateAllPoints();
  if (autoScale) {
    autoScaleButton.changeActivity(true);
  } else {
    autoScaleButton.changeActivity(false);
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

function skipMarkerPrevious() {
  /* pass delta argument of -1 to decrement index of marker */
  setMarkerSelected(- 1);
}

function skipMarkerNext() {
  /* pass delta argument of +1 to increment index of marker */
  setMarkerSelected(+ 1);
}

function setMarkerSelected(delta) {

  /* if no marker is selected */
  if (!checkAnyEventSelected().boolAnySelected) {

    /* run through array of events */
    for (let i = 0; i < arrayOfEvents.length; i++) {

      /* set default index of marker */
      let firstMarkerIndex = 0;

      /* if next marker function was called, set first marker index whatever 'i' is */
      if (delta === 1) firstMarkerIndex = i;

      /* if marker object can be found */
      if (arrayOfEvents[firstMarkerIndex] != undefined) {

        /* if marker is within the time range */
        if (checkMarkerInTimeScope(i)) {

          /* call function to deselect all markers and only select specified marker */
          setOnlyThisMarkerSelected(arrayOfEvents[firstMarkerIndex]);
        }
      }
    }
  } else /* if there is already a marker selected */ {

    /* set index of next marker */
    let newMarkerIndex = checkAnyEventSelected().indexOfSelected + delta;

    /* get index of current selected element and increment by 1 */
    if (arrayOfEvents[newMarkerIndex] != undefined && checkMarkerInTimeScope(newMarkerIndex)) {

      /* call function to deselect all markers and only select specified marker */
      setOnlyThisMarkerSelected(arrayOfEvents[newMarkerIndex]);
    }
  }
  updateDisplayedInfo();
}

function updateDisplayedInfo() {
  for (let countryIndex = 0; countryIndex < arrayOfEvents.length; countryIndex++) {
    let thisObject = arrayOfEvents[countryIndex];
    if (thisObject.isAnySelected().bool && thisObject._index == thisObject.isAnySelected().index) {
      thisObject.showInfo();
    } else if (!thisObject.isAnySelected().bool) {
      thisObject.hideInfo();
    }
  }
}

function setOnlyThisMarkerSelected(marker) {

  /* set other markers as not selected */
  marker.setOthersSelectedFalse();

  /* set this marker as selected */
  marker._isSelected = true;
}

function checkMarkerInTimeScope(index) {
  return Math.floor(arrayOfEvents[index]._decimalYear) < yearsDisplayed + 1956;
}

function checkAnyEventSelected() {
  let anySelected = false;
  let indexOfSelectedEvent = 0;
  for (let i = 0; i < arrayOfEvents.length; i++) {
    if (arrayOfEvents[i]._isSelected === true) {
      anySelected = true;
      indexOfSelectedEvent = i;
    }
  }
  return {
    boolAnySelected: anySelected,
    indexOfSelected: indexOfSelectedEvent
  };
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
  /* didi user restart function */
  else if (years === 1) {
    pause();
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

    /* calculate the sum of the country data */
    arrayOfCountries[country].calculateSumVectors();
  }

  /* run through array of events */
  for (let i = 0; i < arrayOfEvents.length; i++) {

    /* calculate the x-position of each event marker */
    arrayOfEvents[i].calculatePositionX(xLine);
  }
}

/* is any key pressed */
function keyReleased() {

  switch (keyCode) {
    case 32: //spacebar
      toggle();
      break;
    case 33: //pgup
      skipBackward();
      break;
    case 34: // pgdn
      skipForward();
      break;
    case 37: // left arrow
      skipPrevious();
      break;
    case 39: // right arrow
      skipNext();
      break;
    case 77: // "m" key
      skipMarkerNext();
      break;
    case 78: // "n" key
      skipMarkerPrevious();
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
    currentEvent._crew = eventsData.rows[i].obj.Crew;
    currentEvent._vehicle = eventsData.rows[i].obj.Vehicle;
    currentEvent._pathToImg = eventsData.rows[i].obj.pathToImg;
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
  rect(width - 72, 200, 200, 623);
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
